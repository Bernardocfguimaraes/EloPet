"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Heart } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createPayment } from "../_actions/create-payment"
import { toast } from "sonner"
import { getStripeJs } from "@/lib/stripe-js"

const formSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  message: z.string().min(1, "A mensagem é obrigatória"),
  price: z.enum(["15", "25", "35"], {
    required_error: "O valor é obrigatório",
  })
})

type FormData = z.infer<typeof formSchema>

interface FormDonateProps{
  creatorId: string;
  slug: string;
}

export function FormDonate({creatorId, slug}: FormDonateProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
      price: "15",
    },
  })

  async function onSubmit(data: FormData) {
    
    const priceInCents = Number(data.price) * 100; //centavos

    const checkout = await createPayment({
      name: data.name,
      message: data.message,
      creatorId: creatorId,
      slug: slug,
      price: priceInCents,
    })

    await handlePaymentResponse(checkout)
  }

  async function handlePaymentResponse(checkout: {sessionId?: string, error?: string}) {

      if(checkout.error){
        toast.error(checkout.error)
        return;
    }

    if( !checkout.sessionId){
      toast.error("Falha ao criar o pagamento, tente mais tarde.")
      return;
    }

      const stripeClient = await getStripeJs();

      if(!stripeClient){
        toast.error("Falha ao criar o pagamento, tente mais tarde.")
        return;
      }

      await (stripeClient as any)?.redirectToCheckout({
        sessionId: checkout.sessionId
      })
    
  }

  return (
    <Card className="w-full max-w-md mx-auto border-slate-200 shadow-xl shadow-slate-200/50 rounded-2xl overflow-hidden bg-white">
      <CardHeader className="pt-6 pb-4 text-center px-6">
        <div className="mx-auto w-10 h-10 rounded-full flex items-center justify-center mb-3 bg-teal-50">
          <Heart className="w-5 h-5 text-teal-600 fill-teal-500" />
        </div>
        <CardTitle className="text-xl font-bold text-slate-900">
          Faça uma Doação
        </CardTitle>
        <CardDescription className="text-slate-500 text-sm mt-1">
          Sua ajuda faz toda a diferença para deixar o pet saudável!
        </CardDescription>
      </CardHeader>
      
      <CardContent className="px-6 pb-6 pt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4"> {/* Reduzi space-y-5 para space-y-4 */}
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1"> {/* Reduzi o espaço entre label e input */}
                  <FormLabel className="text-slate-700 text-sm font-medium">Seu Nome</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Como o pet deve te chamar?" 
                      className="h-10 rounded-lg bg-slate-50 border-slate-200 focus-visible:ring-teal-500 transition-all text-sm"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-slate-700 text-sm font-medium">Mensagem de Carinho</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Deixe sua mensagem para o mural..." 
                      className="resize-none rounded-lg bg-slate-50 border-slate-200 focus-visible:ring-teal-500 min-h-[70px] transition-all text-sm"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-slate-700 text-sm font-medium">Valor da Ajuda</FormLabel>
                  <FormControl>
                    <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row gap-2" 
                        >
                        {["15", "25", "35"].map((value) => {
                            const isSelected = field.value === value;

                            return (
                            <Label
                                key={value}
                                htmlFor={value}
                                className={`flex-1 flex flex-col items-center justify-center border rounded-lg py-2 cursor-pointer transition-all duration-200 ${
                                isSelected
                                    ? "bg-teal-50 border-teal-500 ring-1 ring-teal-500 text-teal-700"
                                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                                }`}
                            >
                                {/* Escondi a 'bolinha' nativa do rádio (sr-only) para o botão ficar mais limpo */}
                                <RadioGroupItem 
                                  value={value} 
                                  id={value} 
                                  className="sr-only" 
                                />
                                
                                <span className="font-semibold text-sm">
                                  R$ {value}
                                </span>
                            </Label>
                            );
                        })}
                        </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold h-11 text-base mt-2 shadow-sm transition-all"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Carregando..." : "Confirmar Doação 🐾"}
            </Button>
            
          </form>
        </Form>
      </CardContent>
    </Card>
    )
}
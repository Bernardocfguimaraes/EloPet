"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Heart, Lock } from "lucide-react"
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
    const priceInCents = Number(data.price) * 100;

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
    <Card className="w-full border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.03)] rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-xl">
      <CardHeader className="px-6 pt-6 pb-2 md:px-8 md:pt-8 md:pb-3 border-b border-slate-100">
        <CardTitle className="text-lg font-bold text-slate-900 flex items-center justify-between">
          Faça uma doação
          <Heart className="w-5 h-5 text-teal-500 fill-teal-500/20" />
        </CardTitle>
        <CardDescription className="text-slate-500 text-xs mt-1">
          Sua ajuda faz toda a diferença para o pet!
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 pb-6 pt-4 md:px-8 md:pb-8 md:pt-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Seu Nome
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Como deseja ser chamado?" 
                      className="h-11 rounded-xl bg-slate-50/50 border-slate-200/80 focus-visible:ring-2 focus-visible:ring-teal-500/20 focus-visible:border-teal-500 transition-all text-sm shadow-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] ml-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">
                    Mensagem de Carinho
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Deixe uma mensagem especial..." 
                      className="resize-none rounded-xl bg-slate-50/50 border-slate-200/80 focus-visible:ring-2 focus-visible:ring-teal-500/20 focus-visible:border-teal-500 min-h-[90px] transition-all text-sm shadow-none"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-[10px] ml-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="space-y-3 pt-2">
                  <FormControl>
                    <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-3 gap-3" 
                        >
                        {["15", "25", "35"].map((value) => {
                            const isSelected = field.value === value;

                            return (
                            <Label
                                key={value}
                                htmlFor={value}
                                className={`relative flex flex-col items-center justify-center rounded-2xl py-3.5 cursor-pointer transition-all duration-300 overflow-hidden ${
                                isSelected
                                    ? "bg-teal-500 text-white shadow-md shadow-teal-500/20 scale-[1.02]"
                                    : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
                                }`}
                            >
                                <RadioGroupItem 
                                  value={value} 
                                  id={value} 
                                  className="sr-only" 
                                />
                                <span className={`font-bold text-sm z-10 ${isSelected ? "text-white" : "text-slate-700"}`}>
                                  R$ {value}
                                </span>
                            </Label>
                            );
                        })}
                        </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-[10px] ml-1" />
                </FormItem>
              )}
            />

            <div className="pt-2">
                <Button 
                type="submit" 
                className="w-full rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold h-12 text-sm shadow-md transition-all relative overflow-hidden group"
                disabled={form.formState.isSubmitting}
                >
                <span className="relative z-10 flex items-center gap-2">
                    {form.formState.isSubmitting ? "Processando..." : "Confirmar Doação"}
                </span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                </Button>

                <div className="mt-4 flex items-center justify-center gap-1.5 text-slate-400">
                    <Lock className="w-3 h-3" />
                    <span className="text-[10px] font-medium uppercase tracking-wider">Pagamento seguro via Stripe</span>
                </div>
            </div>
            
          </form>
        </Form>
      </CardContent>
    </Card>
    )
}
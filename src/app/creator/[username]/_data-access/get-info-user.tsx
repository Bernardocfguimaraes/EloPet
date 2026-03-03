"use server"

import { prisma } from "@/lib/prisma"
import { z } from "zod"

const getInfoUserSchema=z.object({
    username:z.string({ message: "O nome é obrigatório" })
})

type getInfoUserSchema = z.infer<typeof getInfoUserSchema>

export async function getInfoUser(data: getInfoUserSchema) {

    const schema = getInfoUserSchema.safeParse(data)

    if (!schema.success){
        return null
    }

    try{

    const user = await prisma.user.findUnique({
        where: {
            username:data.username
        
        },
    })

        return user;

    }catch(err){
        return null
    }
}
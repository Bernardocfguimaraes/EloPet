"use server"
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfileImage(imageUrl: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Não autorizado" };
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: imageUrl,
      },
    });

    revalidatePath("/dashboard/me");
    revalidatePath(`/creator/${session.user.username}`);

    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar imagem:", error);
    return { error: "Falha ao salvar a imagem no banco de dados." };
  }
}
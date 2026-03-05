import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/lib/auth"; 

const f = createUploadthing();

export const ourFileRouter = {

  imageUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const session = await auth();
      
      if (!session?.user) throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload feito pelo usuário:", metadata.userId);
      console.log("URL da imagem:", file.url);

      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
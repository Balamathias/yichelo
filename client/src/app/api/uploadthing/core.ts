import { getUser } from "@/actions/auth.actions";
import { createUploadthing, type FileRouter as DefaultFileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const fileRouter = {
  "upload-images": f({ image: { maxFileSize: "4MB", minFileCount: 1, maxFileCount: 6 } })
    .middleware(async ({ req }) => {
      const user = await getUser()

      if (!user || !user?.roles?.includes('admin')) throw new UploadThingError("Unauthorized");

      return { userId: user._id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      return { uploadedBy: metadata.userId, url: file.url };
    }),
    "upload-thumbnail": f({ image: { maxFileSize: "4MB", minFileCount: 1, maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const user = await getUser()

      if (!user || !user?.roles?.includes('admin')) throw new UploadThingError("Unauthorized");

      return { userId: user._id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      return { uploadedBy: metadata.userId, url: file.url };
    })
} satisfies DefaultFileRouter;

export type FileRouter = typeof fileRouter;

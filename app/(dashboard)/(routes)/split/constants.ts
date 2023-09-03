import * as z from "zod"

export const formSchema = z.object({
    file: z.unknown().refine(value => value instanceof File, {
        message: "File is required"
    }),
    apiRoute: z.string(),
})
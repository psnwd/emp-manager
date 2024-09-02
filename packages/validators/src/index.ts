import { z } from "zod";

const isImageUrl = (url: string) => {
  const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"];
  return imageExtensions.some((ext) => url.endsWith(ext));
};

export const empFormSchema = z.object({
  first_name: z
    .string({ message: "First name should not be null or empty." })
    .regex(/^[A-Za-z]+$/, {
      message: "First name should only contain alphabets.",
    })
    .min(6, { message: "First name must be at least 6 characters long." })
    .max(10, { message: "First name must be at most 10 characters long." }),
  last_name: z
    .string({ message: "Last name should not be null or empty." })
    .regex(/^[A-Za-z]+$/, {
      message: "Last name should only contain alphabets.",
    })
    .min(6, { message: "Last name must be at least 6 characters long." })
    .max(10, { message: "Last name must be at most 10 characters long." }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  number: z
    .string()
    .min(12, {
      message: "Please enter a valid phone number.",
    })
    .regex(/^\+94\d{9}$/, {
      message:
        "Please enter a valid phone number starting with +94 followed by 9 digits.",
    }),
  gender: z.enum(["M", "F"], {
    required_error: "Please select a gender.",
  }),
  photo: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .refine((url) => isImageUrl(url), {
      message: "The URL must point to an image file.",
    }),
});

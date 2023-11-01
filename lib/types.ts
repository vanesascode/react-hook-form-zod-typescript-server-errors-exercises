import { z } from "zod"; //npm i zod

const isValidEmail = (email: string) => {
  return /\S+@\S+\.\S+/.test(email);
};

export const signUpSchema = z
  .object({
    email: z
      .string()
      .email()
      .refine((value) => {
        if (!isValidEmail(value)) {
          throw new z.ZodError([
            {
              code: "custom",
              message: "Please enter a valid email address",
              path: ["email"],
            },
          ]);
        }
        return true;
      }), // you can only refine the email field or the whole form (see below)
    password: z.string().min(10, "Password must be at least 10 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    // data is the whole form
    message: "Passwords must match",
    path: ["confirmPassword"], //adds an error message to the confirmPassword property of the data object
  });

// adding more safety to the form:

export type TSignUpSchema = z.infer<typeof signUpSchema>;

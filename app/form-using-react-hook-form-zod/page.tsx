"use client";

import { TSignUpSchema, signUpSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod"; //npm i @hookform/resolvers
import { useForm } from "react-hook-form"; //npm install react-hook-form

export default function FormWithReactHookFormAndZod() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema), // this is the way to connect Zod with React Hook Form
  });

  const onSubmit = async (data: TSignUpSchema) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      // body: JSON.stringify(data), // you can just say data or desglose it to make tests:
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    console.log(data);

    const responseData = await response.json();
    if (!response.ok) {
      // response status is not 2xx:
      alert("Submitting form failed!");
      return;
    }

    if (responseData.errors) {
      const errors = responseData.errors;

      if (errors.email) {
        setError("email", {
          // or, because it's a server error, you can just use console.log() instead of setError()
          type: "server error",
          message: errors.email,
        });
      } else if (errors.password) {
        setError("password", {
          type: "server error",
          message: errors.password,
        });
      } else if (errors.confirmPassword) {
        setError("confirmPassword", {
          type: "server error",
          message: errors.confirmPassword,
        });
      } else {
        alert("Something went wrong!");
      }
    }

    reset();
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <input
          {...register(
            "email"
            // , { required: "Email is required",}
          )}
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded text-black"
        />
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}

        <input
          {...register(
            "password" // this is reinforced by the typescript TSignUpSchema type. Try to change "password" to something else and it will give you an error.
            // , {
            //   required: "Password is required",
            //   minLength: {
            //     value: 10,
            //     message: "Password must be at least 10 characters",
            //   },
            // }
          )}
          type="password"
          placeholder="Password"
          className="px-4 py-2 rounded text-black"
        />
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}

        <input
          {...register(
            "confirmPassword"
            // {
            //   required: "Confirm password is required",
            //   validate: (value) =>
            //     value === getValues("password") || "Passwords must match",
            // }
          )}
          type="password"
          placeholder="Confirm password "
          className="px-4 py-2 rounded text-black"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
        )}

        <button
          disabled={isSubmitting}
          type="submit"
          className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </main>
  );
}

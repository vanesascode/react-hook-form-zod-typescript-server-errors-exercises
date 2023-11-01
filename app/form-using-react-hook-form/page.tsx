"use client";

import React from "react";
import { useForm, type FieldValues } from "react-hook-form"; //npm install react-hook-form

export default function FormWithReactHookForm() {
  const {
    register,
    handleSubmit, // it already has the "e.preventDefault()" in it
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    // Fake promise for demo purposes:
    await new Promise((resolve) => setTimeout(resolve, 1000));

    reset();
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <input
          {...register("email", {
            required: "Email is required",
          })}
          type="email"
          placeholder="Email"
          className="px-4 py-2 rounded text-black"
        />
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}

        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 10,
              message: "Password must be at least 10 characters",
            },
          })}
          type="password"
          placeholder="Password"
          className="px-4 py-2 rounded text-black"
        />
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}

        <input
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) =>
              value === getValues("password") || "Passwords must match",
          })}
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

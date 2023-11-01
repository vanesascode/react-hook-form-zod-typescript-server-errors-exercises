"use client";

import React, { useState } from "react";

export default function FormWithoutReactHookForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const isValidEmail = (email: string) => {
      return /\S+@\S+\.\S+/.test(email);
    };

    e.preventDefault();
    setIsSubmitting(true);

    const errors: string[] = [];

    if (password !== confirmPassword) {
      errors.push("Password and confirm password must match");
    }

    if (email === "") {
      errors.push("Email is required");
    }

    if (email && !isValidEmail(email)) {
      errors.push("Invalid email format");
    }

    if (errors.length > 0) {
      setErrors(errors);
      setIsSubmitting(false);
      return;
    }

    const submitPromise = new Promise((resolve, reject) => {
      // Perform the actual form submission to the server
      const formData = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      };

      fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            resolve("Form submitted successfully!");
          } else {
            reject("Error occurred while submitting the form.");
          }
        })
        .catch((error) => {
          reject(error);
        });
    });

    try {
      const result = await submitPromise;
      console.log(result);
    } catch (error) {
      console.error(error);
    }

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setIsSubmitting(false);

    setErrors([]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-2 ">
        {errors.length > 0 && (
          <ul>
            {errors.map((error) => (
              <li
                key={error}
                className="bg-red-100 text-red-500 px-4 py-2 rounded mt-2"
              >
                {error}
              </li>
            ))}
          </ul>
        )}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // type="email"
          // required
          type="text"
          placeholder="Email"
          className="px-4 py-2 rounded text-black"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // type="password"
          // required
          type="text"
          placeholder="Password"
          className="px-4 py-2 rounded text-black"
        />
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          // type="password"
          // required
          type="text"
          placeholder="Confirm password"
          className="px-4 py-2 rounded text-black"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </main>
  );
}

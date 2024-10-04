import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerResponse } from "./types/sharedTypes";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  pass: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  correo: z.string().email({
    message: "Invalid email address",
  }),
  peso: z.string().transform((val) => (val === "" ? "" : Number(val))),
  telefono: z.string().transform((val) => (val === "" ? "" : Number(val))),
});

export function Register() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      pass: "",
      correo: "",
      peso: "",
      telefono: "",
    },
  });
  const { setError } = form;

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const jsonData: registerResponse = await response.json(); // Parse the response body

      if (jsonData.success) console.log("Registration succesful");
      else if (jsonData.error === "Username already exists") {
        setError("username", { type: "server", message: jsonData.error });
      } else if (jsonData.error === "E-mail already in use") {
        setError("correo", { type: "server", message: jsonData.error });
      } else if (jsonData.error === "That phone number is already registered") {
        setError("telefono", { type: "server", message: jsonData.error });
      } else {
        console.error("Server error:", jsonData.error);
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message); // Safely access the message if it's an Error
      } else {
        console.error("An unknown error occurred");
      }
    }
  }
  // ...

  return (
    <ScrollArea className=" flex items-center bg-white h-[500px] w-[50%] m-0 relative top-8 translate-x-1/2 dark:bg-black ">
      <h1 className=" block sticky w-full text-center left-1/3 text-2xl font-bold dark:text-white">
        Register
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" space-y-4 ml-2 mr-3"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={`${
                    fieldState.error
                      ? "text-red-500"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Username"
                    className="dark:text-gray-200"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pass"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={`${
                    fieldState.error
                      ? "text-red-500"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    className="dark:text-gray-200"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter a secure password</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="correo"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={`${
                    fieldState.error
                      ? "text-red-500"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  E-mail
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="your@email.com"
                    className="dark:text-gray-200"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter your e-mail</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="peso"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={`${
                    fieldState.error
                      ? "text-red-500"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  Weight
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="70.4"
                    className="dark:text-gray-200"
                    type="number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter your weight for tracking
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="telefono"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={`${
                    fieldState.error
                      ? "text-red-500"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  Phone number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="555555555"
                    className="dark:text-gray-200"
                    type="number"
                    // Handle empty input as 0 or null
                    {...field}
                  />
                </FormControl>
                <FormDescription>Enter your phone number</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </ScrollArea>
  );
}

export default Register;

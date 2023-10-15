"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be 2 character long",
  }),
  email: z.string().email("Please enter a valid email address"),
  gender: z.enum(["male", "female"]),
  status: z.enum(["active", "inactive"]),
});

const UsersPage = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: "male",
      status: "active",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/users", {
        values,
      });

      toast({
        variant: "default",
        duration: 3000,
        description: "User successfully created",
      });
    } catch (err: any) {
      console.log(err);
      toast({
        variant: "destructive",
        duration: 3000,
        title: err?.message || "Something went wrong.",
      });
    }
  };

  return (
    <div className="p-6">
      <Link
        href="/"
        className="mb-10 block text-sm text-indigo-600 hover:underline"
      >
        {"<< All Users"}
      </Link>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-2xl space-y-4"
        >
          <div className="text-center">
            <h1 className="text-2xl font-medium">New User</h1>
            <p className="text-sm text-gray-600">
              Use the below form to create a new user
            </p>
          </div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Gender</FormLabel>
                <FormControl className="flex gap-x-8">
                  <RadioGroup
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row items-center space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem disabled={isLoading} value="male" />
                      </FormControl>
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem disabled={isLoading} value="female" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Gender</FormLabel>
                <FormControl className="flex gap-x-8">
                  <RadioGroup
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-row items-center space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem disabled={isLoading} value="active" />
                      </FormControl>
                      <FormLabel className="font-normal">Active</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem disabled={isLoading} value="inactive" />
                      </FormControl>
                      <FormLabel className="font-normal">Inactive</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="mt-10 block w-full bg-indigo-600 hover:bg-indigo-700"
            >
              Add User
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UsersPage;

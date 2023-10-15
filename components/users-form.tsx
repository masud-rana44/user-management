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
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be 2 character long",
  }),
  email: z.string().email("Please enter a valid email address"),
  gender: z.enum(["male", "female"]),
  status: z.enum(["active", "inactive"]),
});

interface UsersFormProps {
  title: string;
  description: string;
  data?: User;
}

export const UsersForm = ({ title, description, data }: UsersFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
      email: data?.email || "",
      gender: data?.gender || "male",
      status: data?.status || "active",
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (data) {
        await axios.put(`/api/users/${data.id}`, {
          values,
        });

        toast({
          duration: 3000,
          description: "User successfully updated",
        });
      } else {
        await axios.post("/api/users", {
          values,
        });

        toast({
          duration: 3000,
          description: "User successfully created",
        });
      }

      form.reset();
      router.refresh();
      router.push("/");
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-2xl space-y-4"
      >
        <div className="text-center">
          <h1 className="text-2xl font-medium">{title}</h1>
          <p className="text-sm text-gray-600">{description}</p>
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
            {data ? "Update User" : "Add User"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

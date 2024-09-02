"use client";

import type { UnknownAction } from "@reduxjs/toolkit";
import type { z } from "zod";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { update } from "@/lib/actions/employee";
import { fetchEmployees } from "@/lib/queries/employee";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { Button } from "@emp/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@emp/ui/form";
import { Input } from "@emp/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@emp/ui/select";
import { toast } from "@emp/ui/toast";
import { empFormSchema } from "@emp/validators";

interface EmpEditFormProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  number: string;
  gender: "F" | "M" | undefined;
  photo: string;
}

function EmpEditForm({
  id,
  first_name,
  last_name,
  email,
  gender,
  number,
  photo,
}: EmpEditFormProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof empFormSchema>>({
    resolver: zodResolver(empFormSchema),
    defaultValues: {
      first_name: first_name || "",
      last_name: last_name || "",
      email: email || "",
      number: number || "",
      gender,
      photo: photo || "",
    },
  });

  async function onSubmit(values: z.infer<typeof empFormSchema>) {
    try {
      setLoading(true);
      await update(id, values);
      dispatch(fetchEmployees() as unknown as UnknownAction);

      setLoading(false);
      toast.success("Employee updated successfully");
    } catch (error) {
      console.error("Failed to update employee", error);
    } finally {
      router.push("/employee/list");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormDescription>This is employee first name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormDescription>This is employee last name.</FormDescription>
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
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormDescription>This is employee email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="+94 00 000 0000" {...field} />
              </FormControl>
              <FormDescription>This is employee phone number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="M">Male</SelectItem>
                  <SelectItem value="F">Female</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>This is employee gender.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo</FormLabel>
              <FormControl>
                <Input placeholder="Employee Image URL" {...field} />
              </FormControl>
              <FormDescription>This is employee image.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-2">
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
          <Link href="/employee/list">
            <Button variant={"primary"}>Cancel</Button>
          </Link>
        </div>
      </form>
    </Form>
  );
}

export default EmpEditForm;

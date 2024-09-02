"use server";

import type { z } from "zod";
import { env } from "@/env";

import type { empFormSchema } from "@emp/validators";

export async function add(
  values: z.infer<typeof empFormSchema>,
): Promise<{ status: number; message: string }> {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_BASE_API_URL}/employee`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      return {
        status: res.status,
        message: "Failed to add employee",
      };
    }

    return {
      status: res.status,
      message: "Employee added successfully",
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to add employee";
    return { status: 500, message };
  }
}

export async function update(
  id: number,
  values: z.infer<typeof empFormSchema>,
): Promise<{ status: number; message: string }> {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_BASE_API_URL}/employee/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!res.ok) {
      return {
        status: res.status,
        message: "Failed to update employee",
      };
    }

    return {
      status: res.status,
      message: "Employee updated successfully",
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to update employee";
    return { status: 500, message };
  }
}

export async function remove(
  id: number,
): Promise<{ status: number; message: string }> {
  try {
    const res = await fetch(`${env.NEXT_PUBLIC_BASE_API_URL}/employee/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      return {
        status: res.status,
        message: "Failed to remove employee",
      };
    }

    return {
      status: res.status,
      message: "Employee removed successfully",
    };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to remove employee";
    return { status: 500, message };
  }
}

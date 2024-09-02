"use client";

import type { UnknownAction } from "@reduxjs/toolkit";
import Image from "next/image";
import Link from "next/link";
import { deleteEmployee } from "@/lib/queries/employee";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";

import { Button } from "@emp/ui/button";
import { Card, CardContent, CardFooter } from "@emp/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@emp/ui/dialog";
import { toast } from "@emp/ui/toast";

interface EmployeeCardProps {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  number: string;
  gender: string;
  photo: string;
}

function EmployeeCard({
  id,
  first_name,
  last_name,
  email,
  number,
  gender,
  photo,
}: EmployeeCardProps) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    try {
      dispatch(deleteEmployee(Number(id)) as unknown as UnknownAction);

      toast.success("Employee deleted successfully");
    } catch {
      toast.error("Failed to delete employee");
    }
  };

  return (
    <Card className="relative flex w-full max-w-xs flex-col">
      <CardContent className="relative p-0">
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <Image
            src={photo}
            alt={`${first_name} ${last_name}`}
            width={500}
            height={500}
            style={{ objectFit: "cover" }}
            className="absolute inset-0"
          />
        </div>
        <div className="flex flex-col gap-1 p-4">
          <div className="text-lg font-semibold">{`${first_name} ${last_name}`}</div>
          <div className="text-sm text-gray-600">{email}</div>
          <div className="text-sm text-gray-600">{number}</div>
          <div className="text-sm text-gray-600">
            {gender === "M" ? "Male" : gender === "F" ? "Female" : "Unknown"}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 p-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="primary"
              className="bg-[#e32312]/80 hover:bg-[#e32312]/70"
            >
              <MdDelete className="text-2xl text-white/90" />
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete{" "}
                {first_name} {last_name}.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="primary" onClick={handleDelete}>
                  Delete
                </Button>
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Link href={`/employee/edit/${id}`}>
          <Button
            variant="primary"
            className="bg-[#1be885]/80 hover:bg-[#1be885]/70"
          >
            <FaUserEdit className="text-2xl text-white/90" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default EmployeeCard;

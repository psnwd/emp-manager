"use client";

import type { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { deleteEmployee } from "@/lib/queries/employee";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";

import { Button } from "@emp/ui/button";
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@emp/ui/dropdown-menu";
import { Input } from "@emp/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@emp/ui/table";
import { toast } from "@emp/ui/toast";

export interface Employee {
  id: string;
  employeeId: number;
  first_name: string;
  last_name: string;
  email: string;
  number: string;
  gender: "F" | "M";
  photo: string;
}

export const createColumns = (dispatch: Dispatch): ColumnDef<Employee>[] => [
  {
    accessorKey: "photo",
    header: () => <div className="text-center">Image</div>,
    cell: ({ row }) => (
      <div className="flex w-full justify-center">
        <Image
          src={row.getValue("photo")}
          alt={`${String(row.getValue("first_name"))} ${String(row.getValue("last_name"))}`}
          width={50}
          height={50}
          className="rounded-full"
        />
      </div>
    ),
  },
  {
    accessorKey: "first_name",
    header: () => <div className="text-center">First Name</div>,
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.getValue("first_name")}</div>
    ),
  },
  {
    accessorKey: "last_name",
    header: () => <div className="text-center">Last Name</div>,
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.getValue("last_name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center lowercase">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "number",
    header: () => <div className="text-center">Phone</div>,
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.getValue("number")}</div>
    ),
  },
  {
    accessorKey: "gender",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Gender
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const gender =
        row.getValue("gender") === "M"
          ? "Male"
          : row.getValue("gender") === "F"
            ? "Female"
            : "Unknown";

      return <div className="text-center font-medium">{gender}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      const emp = row.original;

      const handleDelete = () => {
        try {
          dispatch(
            deleteEmployee(Number(emp.employeeId)) as unknown as UnknownAction,
          );

          toast.success("Employee deleted successfully");
        } catch {
          toast.error("Failed to delete employee");
        }
      };

      return (
        <div className="flex items-center justify-center gap-1 px-3">
          <Link href={`/employee/edit/${emp.employeeId}`}>
            <Button variant="ghost" size="sm">
              Edit
            </Button>
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="">
                <Trash2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete{" "}
                  {emp.first_name} {emp.last_name}.
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
        </div>
      );
    },
  },
];

export function EmpDataTable(data: { data: Employee[] }) {
  const dispatch = useDispatch();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = React.useMemo(() => createColumns(dispatch), [dispatch]);

  const table = useReactTable({
    data: data.data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={table.getColumn("email")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="select-none">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

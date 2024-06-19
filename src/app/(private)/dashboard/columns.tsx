"use client";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import moment from 'moment';
import { Checkbox } from "@/components/ui/checkbox"
export type LeaveDetails = {
  userId: number;
  totalWorkingDays: number;
  totalLeave: number;
  availableLeave: number;
  usedLeave: number;
  user_name: string;
  user_email: string;
};

export const columns: ColumnDef<LeaveDetails>[] = [
  {
    accessorKey: "userId",
    header: "userId",
  },
  {
    accessorKey: "user.name",
    header: "User Name",
  },
  {
    accessorKey: "user.email",
    header: "User Email",
  },
  {
    accessorKey: "usedLeave",
    header: "Used Leave",
  },
  {
    accessorKey: "availableLeave",
    header: "Available Leave",
  },
  {
    accessorKey: "totalLeave",
    header: "Total Leave",
  },
  {
    accessorKey: "totalWorkingDays",
    header: "Total WorkingDays",
  },
];

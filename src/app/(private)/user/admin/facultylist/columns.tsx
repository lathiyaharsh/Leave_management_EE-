import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getApiCall } from "@/Utils/apiCall";
import { toast } from "react-toastify";
import FieldGroup from "@/Components/ui/form/useInputGroup";
import Image from "next/image";

export const getColumns = (setViewModel, setEditUserData,formik) => [
  {
    accessorKey: "id",
    header: "User Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "email",
  },
  {
    accessorKey: "gender",
    header: "gender",
  },
  {
    header: "image",
    cell: ({ row }) => {
      const image = row.original.image;
      return (
        <>
          <Image
            src={image}
            alt="User Avatar"
            className="rounded "
            width={50}
            height={50}
          />
        </>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "phone",
  },
  {
    accessorKey: "createdAt",
    header: "Create Date",
    cell: ({ row }) => {
      const timestamp = row.getValue("createdAt");
      const date = moment(timestamp);
      const formatted = date.format("YYYY-MM-DD");
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    header: "Action",
    id: "actions",
    cell: ({ row }) => {
      const userData = row.original;
      // const updateLeaveData = async (url: string) => {
      //   try {
      //     toast.success("Processing...");
      //     const result = await getApiCall(url);
      //     if (result?.status == 200) {
      //       toast.success(result.data.message);
      //       setReloadData((prev) => !prev); // Trigger a data refresh
      //     }else {
      //       toast.error(result.message);
      //     }
      //   } catch (error) {
      //     console.error("Error:", error);
      //     toast.error("An error occurred. Please try again.");
      //   }
      // };
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <>
                <DropdownMenuItem
                  onClick={async () => {
                    setEditUserData(userData);
                    formik.setValues(userData);
                    setViewModel(true);
                  }}
                >
                  Edit
                </DropdownMenuItem>
              </>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
  {
    accessorKey: "address",
    header: "address",
  },
  {
    accessorKey: "grNumber",
    header: "grNumber",
  },
  {
    accessorKey: "department",
    header: "department",
  },
  {
    accessorKey: "div",
    header: "div",
  },
];

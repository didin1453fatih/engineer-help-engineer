"use client";
import * as React from "react";

import {
  ColumnDef,
  flexRender,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { formatDistanceToNow } from "date-fns";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Archive,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Cog,
  Delete,
  Dot,
  Edit,
  ExternalLink,
  Globe,
  Heart,
  Link,
  Link2,
  MapPin,
  MoreHorizontal,
  Trash,
  X,
} from "lucide-react";
import { OpportunityForm } from "./opportunity-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/toaster";

interface DataTableProps<MyOpportunity> {
  data: MyOpportunity[];
}

export interface MyOpportunity {
  id: number;
  title: string;
  company_name: string;
  source: string;
  status: string;
  note: string;
  skills: string[];
  locations: string[];
  salary_min: number;
  salary_max: number;
  currency: string;
  salary_cycle: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  tags: string[];
  description: string;
  submitted_at: string;
}

export function DataTable({ data }: DataTableProps<MyOpportunity>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [drawerAction, setDrawerAction] = React.useState<"update" | "new">(
    "new"
  );
  const [selectedMyOpportunity, setSelectedMyOpportunity] =
    React.useState<MyOpportunity | null>(null);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [columns, setColumns] = React.useState<ColumnDef<MyOpportunity>[]>([
    {
      accessorKey: "title",
      header: "Title",
      size: 710,
      cell: ({ row }) => {
        const my_opportunity = row.original;
        return (
          <React.Fragment>
            <div
              className="mb-3 w-full flex flex-col items-start gap-0 rounded-lg pl-2 pr-2 pb-3 pl-0 text-left text-sm transition-all "
              onClick={() => {}}
            >
              <div className="ml-auto text-xs text-muted-foreground w-full text-right pt-2">
                {my_opportunity.published_at
                  ? formatDistanceToNow(new Date(my_opportunity.published_at), {
                      addSuffix: true,
                    })
                  : formatDistanceToNow(new Date(my_opportunity.created_at), {
                      addSuffix: true,
                    })}
              </div>
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-top">
                  <div className="items-center gap-2">
                    <div className="flex">
                      <div className="font-semibold leading-tight">
                        {my_opportunity.title}
                      </div>
                    </div>
                    <div className="pt-1">
                      <div className="text-xs font-medium">
                        {my_opportunity.company_name}{" "}
                      </div>
                    </div>
                    <div className="line-clamp-2 text-xs text-muted-foreground pt-1">
                      Description :
                      {my_opportunity.description
                        ? my_opportunity.description
                        : " No description"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                {my_opportunity.locations.length > 0 ? (
                  my_opportunity.locations.map((location, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    >
                      <MapPin height={13} />
                      {location}
                    </div>
                  ))
                ) : (
                  <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    <MapPin height={13} />
                    No location
                  </div>
                )}
                <Dot className="m-0" />
                {my_opportunity.salary_min && my_opportunity.salary_max ? (
                  <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    {my_opportunity.salary_min} - {my_opportunity.salary_max}{" "}
                    {my_opportunity.currency}
                  </div>
                ) : (
                  <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    No salary range
                  </div>
                )}
                <Dot className="m-0" />
                {my_opportunity.skills.length > 0 ? (
                  my_opportunity.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    >
                      {skill}
                    </div>
                  ))
                ) : (
                  <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    No skills
                  </div>
                )}
              </div>
              <div className="flex items-center mt-2">
                <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  <Link2 height={13} />
                  <a
                    href={my_opportunity.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {my_opportunity.source}
                  </a>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      },
    },
    {
      accessorKey: "status",
      size: 130,
      header: "Status & Tags",
      cell: ({ row }) => {
        return (
          <>
            <Badge
              variant={"default"}
              className={`font-medium rounded-md ${
                row.original.status === "interested"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : row.original.status === "preparing"
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                    : row.original.status === "applied"
                      ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
                      : row.original.status === "interview"
                        ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                        : row.original.status === "waiting_result"
                          ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100" // rejected
              }`}
            >
              {row.original.status === "interested" && (
                <>
                  Interested
                  <span className="pl-2">🌱</span>
                </>
              )}
              {row.original.status === "preparing" && (
                <>
                  Preparing
                  <span className="pl-2">📚</span>
                </>
              )}
              {row.original.status === "applied" && (
                <>
                  Applied
                  <span className="pl-2">📨</span>
                </>
              )}
              {row.original.status === "interview" && (
                <>
                  Interview
                  <span className="pl-2">💼</span>
                </>
              )}
              {row.original.status === "waiting_result" && (
                <>
                  Waiting Result
                  <span className="pl-2">⏳</span>
                </>
              )}
              {row.original.status === "rejected" && (
                <>
                  Rejected
                  <span className="pl-2">❌</span>
                </>
              )}
            </Badge>
            <div className="flex items-center gap-1 mt-2">
              {row.original.tags.map((tag, index) => (
                <div
                  key={index}
                  className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2  bg-secondary text-secondary-foreground hover:bg-secondary/80"
                >
                  {tag}
                </div>
              ))}
            </div>
          </>
        );
      },
      meta: {
        textAlign: "text-center",
      },
    },
    {
      accessorKey: "note",
      header: "Note",
      size: 200,
      cell: ({ row }) => {
        return (
          <div className="line-clamp-2 px-2 text-xs text-muted-foreground">
            {row.original.note}
          </div>
        );
      },
    },
    {
      accessorKey: "submitted_at",
      header: "Submited At",
      size: 130,
      cell: ({ row }) => {
        return (
          <div className="text-xs text-muted-foreground">
            {row.original.submitted_at
              ? formatDistanceToNow(new Date(row.original.submitted_at), {
                  addSuffix: true,
                })
              : "Not submitted yet"}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "",
      size: 60,
      cell: ({ row }) => {
        const my_opportunity = row.original;
        return (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal height={20} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    setTimeout(() => {
                      setIsDrawerOpen(true);
                      setDrawerAction("update");
                      setSelectedMyOpportunity(my_opportunity);
                      console.log(my_opportunity);
                    }, 10);
                  }}
                >
                  <Edit height={15} className="pr-1" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Globe height={15} className="pr-1" />
                  Pubish
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Archive height={15} className="pr-1" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trash height={15} className="pr-1" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      },
    },
  ]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between md:pb-0 pb-2">
        {/* <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:items-center py-4 space-y-4 md:space-y-0">       */}

        <div className="flex h-[60px] items-center ">
          <Input
            placeholder="Filter title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="w-full md:w-[300px] mr-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="inline-flex items-center justify-center  py-2"
            onClick={() => {
              setIsDrawerOpen(true);
              setDrawerAction("new");
              setSelectedMyOpportunity(null);
            }}
          >
            <span>🚀</span>
            <span className="ml-2">New Opportunity</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="inline-flex items-center justify-center w-10 p-0"
              >
                <Cog />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
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
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border w-full">
        <Table className="w-full table-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{
                        ...(columns[index].size && {
                          width: `${header.getSize()}px`,
                        }),
                      }}
                      //   style={{ width: `${header.getSize()}px` }}
                      className={`px-1 border-r ${index == 0 ? "pl-6" : ""} ${[1, 2, 3, 4].indexOf(index) >= 0 ? "text-center" : ""}`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={`py-0 px-1 border-r ${index == 0 ? "pl-6" : ""} ${[1, 3, 4].indexOf(index) >= 0 ? "text-center" : ""}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
      <div className="flex items-center justify-between px-2 pt-3 pb-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm ">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex w-[100px] items-center justify-center text-sm ">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
      <OpportunityForm
        action={drawerAction}
        opportunity={selectedMyOpportunity}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
      <Toaster />
    </div>
  );
}

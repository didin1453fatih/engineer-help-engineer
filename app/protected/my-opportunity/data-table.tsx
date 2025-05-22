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
import { StatusBadge } from "./status-badge";

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
              className="mb-3 w-full flex flex-col items-start gap-0 rounded-lg  pr-2 pb-3 pl-0 text-left text-sm transition-all "
              onClick={() => {}}
            >
              <div className="flex w-full justify-between items-start md:pb-0 pb-2">
                <StatusBadge
                  status={row.original.status}
                  className="md:hidden"
                />
                <div className="ml-auto text-xs text-muted-foreground w-full text-right sm:pt-2">
                  {my_opportunity.published_at
                    ? formatDistanceToNow(
                        new Date(my_opportunity.published_at),
                        {
                          addSuffix: true,
                        }
                      )
                    : formatDistanceToNow(new Date(my_opportunity.created_at), {
                        addSuffix: true,
                      })}
                </div>
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
                      {my_opportunity.description
                        ? my_opportunity.description
                        : " No description"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-y-2 gap-x-1 mt-2">
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
                {/* <Dot className="m-0" /> */}
                <span className="text-xl font-black pl-1 pr-1">·</span>
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
                {/* <Dot className="m-0" /> */}
                <span className="text-xl font-black pl-1 pr-1">·</span>
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
                    {my_opportunity.source.length > 30
                      ? my_opportunity.source.substring(0, 30) + "..."
                      : my_opportunity.source}
                  </a>
                </div>
              </div>
              <div className="w-full pr-20 pt-5 md:hidden">
                <div className="border-b"></div>
              </div>
              <div className="flex flex-wrap mt-2 items-center md:hidden mt-5">
                <span className="text-xs items-center text-muted-foreground">
                  Private Tag :
                </span>
                <div className="flex items-center gap-2 pl-2">
                  {my_opportunity.tags.length > 0 ? (
                    my_opportunity.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2  bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      >
                        {tag}
                      </div>
                    ))
                  ) : (
                    <div className="text-xs items-center text-muted-foreground">
                      No tags
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap mt-2 items-center md:hidden mt-2">
                <span className="text-xs items-center text-muted-foreground">
                  Submitted At :
                </span>
                <div className="text-xs items-center text-muted-foreground ml-2">
                  {my_opportunity.submitted_at
                    ? formatDistanceToNow(
                        new Date(my_opportunity.submitted_at),
                        {
                          addSuffix: true,
                        }
                      )
                    : " No submission"}
                </div>
              </div>
              <div className="flex mt-2 items-center md:hidden mt-2 ">
                <span className="text-xs items-center text-muted-foreground">
                  Note :
                </span>
                <div className="text-xs items-center text-muted-foreground ml-2">
                  {my_opportunity.note ? my_opportunity.note : ""}
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
            <StatusBadge status={row.original.status} />
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
              : "No submission"}
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between md:pb-0 pb-2 mt-2 sm:mt-0">
        <div className="flex h-[60px] items-center order-2 sm:order-none">
          <Input
            placeholder="Filter title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="w-full md:w-[300px]"
          />
        </div>

        <div className="flex items-center gap-2 order-1 sm:order-none">
          <Button
            variant="outline"
            className="inline-flex items-center justify-center  py-2 w-full sm:w-auto"
            onClick={() => {
              setIsDrawerOpen(true);
              setDrawerAction("new");
              setSelectedMyOpportunity(null);
            }}
            style={{
                borderColor: "oklch(93.2% 0.032 255.585)",
                borderWidth: 1.5,
            }}
          >
            <span>🚀</span>
            <span className="ml-2">New Opportunity</span>
          </Button>

          <div className="hidden md:block">
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
      </div>
      <div className="rounded-md border w-full">
        <Table className="w-full table-auto hidden md:block">
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

        <div className="md:hidden">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const mainColumn = row.getVisibleCells()[0];
              return (
                <div key={row.id} className="border-b p-4 space-y-2">
                  <div className="font-medium">
                    {flexRender(
                      mainColumn.column.columnDef.cell,
                      mainColumn.getContext()
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="h-24 flex items-center justify-center text-muted-foreground">
              No results.
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 pb-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm hidden sm:block mr-2">Rows per page</p>
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

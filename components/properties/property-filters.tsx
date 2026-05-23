"use client";

import { useTranslation } from "react-i18next";
import { Search, Filter, LayoutGrid, List, Map } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { z } from "zod";
import { UseFormReturn } from 'react-hook-form';
import { useRouter, usePathname } from "next/navigation";
import MainFilters from './main-filter';
import { listingsIndexRequestSchema } from "./utils"
import {
  useCities,
} from "@/hooks/use-details";
import { useWidget } from "@/components/providers/widget-provider";



export type PropertyFiltersValues = z.infer<typeof listingsIndexRequestSchema>;


type FiltersProps = {
  form: UseFormReturn<PropertyFiltersValues, any,PropertyFiltersValues >;
  onSubmit: (data: PropertyFiltersValues) => void;
  loading: boolean;
  resetFilters : () => void
}

const PropertyFilters = ({ form, onSubmit, loading = false, resetFilters }: FiltersProps) => {
  const { t } = useTranslation("filters");
  const [openSheet, setOpenSheet] = useState(false);
  const { view, setView } = useWidget();

  const handleCloseSheet = () => {setOpenSheet(false);}

  

  const selectedWilaya = form.watch("wilayaId");
  const { data: cities } = useCities(selectedWilaya);

  // Watch for changes and submit automatically for some fields or provide a button
  // For a better UX, we can debounce search or use a " Apply Filters" button.
  // Given the complexity, a "Apply" button is safer.

  const handleSubmit = (data: PropertyFiltersValues) => {
    handleCloseSheet();
    onSubmit(data);
  };

  

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit, console.error)} className="space-y-4">
          <div className="border-b bg-white">
            <div className="mx-auto max-w-7xl px-4 py-3">
              <div className="flex items-center justify-between gap-4">
                {/* Sort By */}
                <FormField
                  control={form.control}
                  name="sortBy"
                  render={({ field }) => (
                    <FormItem className="min-w-[140px]">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-lg border-zinc-200">
                            <SelectValue placeholder={t("sort_by") || "Sort by"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="price">{t("price") || "Price"}</SelectItem>
                          <SelectItem value="created_at">{t("date") || "Date"}</SelectItem>
                          <SelectItem value="surface">{t("area") || "Area"}</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/* View Toggle Icons */}
                <div className="flex items-center gap-1 rounded-lg border border-zinc-200 p-1">
                  <Button
                    type="button"
                    variant={view === "cards" ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setView("cards")}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant={view === "row-card" ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setView("row-card")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant={view === "map" ? "default" : "ghost"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setView("map")}
                  >
                    <Map className="h-4 w-4" />
                  </Button>
                </div>

                {/* Mobile Filters Sheet Trigger */}
                <Sheet open={openSheet} onOpenChange={setOpenSheet}>
                  <SheetTrigger asChild>
                    <Button className="lg:hidden" variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>{t("all_filters") || "All Filters"}</SheetTitle>
                      <SheetDescription>
                        {t("refine_search") || "Refine your search results"}
                      </SheetDescription>
                    </SheetHeader>
                   <MainFilters 
                    form={form}
                    onSubmit={onSubmit}
                    resetFilters={resetFilters}
                   />
                  </SheetContent>
                </Sheet>
                
                <Button disabled={loading} type="submit" className="hidden lg:inline-flex">
                  {t("search") || "Search"}
                </Button>

              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PropertyFilters;

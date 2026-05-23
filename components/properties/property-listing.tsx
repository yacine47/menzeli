"use client";

/**
 * RealEstateFilterPage.tsx  (updated)
 *
 * Changes from original:
 * 1. Added viewMode state ("list" | "map")
 * 2. Bounding box params pushed to URL when map moves
 * 3. MapSearchView replaces the raw property list
 * 4. listingsIndexRequestSchema should include: swLat, swLng, neLat, neLng
 */

import { Suspense, useCallback } from "react";
import { useListings } from "@/hooks/use-listings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import PropertyFilters, { PropertyFiltersValues } from "./property-filters";
import {
  extractFiltersFromSearchParams,
  appendFiltersToSearchParams,
  listingsIndexRequestSchema,
} from "./utils";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useForm } from "react-hook-form";
import { Form } from "../ui/form";
import MainFilters from "./main-filter";
import Pagination from "../shared/pagination";
import PropertyRowCard from "./property-row-card";
import MapSearchView, { BoundsFilter } from "../map-search";
import PropertyCard from "./property-card";
import ListingWidget from "../shared/listing-widget";
import { FlatList } from "../ui/flat-list";
import { AlertCircle, Home, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCategories } from "@/hooks/use-details";
import { WidgetProvider } from "@/components/providers/widget-provider";
import { Button } from "@/components/ui/button";

function RealEstateFilterPageContent(props: any) {
  useTranslation("filters");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams<{ locale: string }>();
  const locale = (
    Array.isArray(params?.locale) ? params.locale[0] : params?.locale || "en"
  ) as "ar" | "en" | "fr";

  console.log({ listingsProps: props });
  const parsedParams = listingsIndexRequestSchema.parse({
    ...props,
    page: props.page ? Number(props.page) : 1,
    perPage: props.perPage || 8,
    // Pass bounding box from URL if present
    swLat: props.swLat ? Number(props.swLat) : undefined,
    swLng: props.swLng ? Number(props.swLng) : undefined,
    neLat: props.neLat ? Number(props.neLat) : undefined,
    neLng: props.neLng ? Number(props.neLng) : undefined,
  });

  const { data, isLoading, isError } = useListings(parsedParams);

  const form = useForm<PropertyFiltersValues, any, PropertyFiltersValues>({
    // @ts-ignore
    resolver: zodResolver(listingsIndexRequestSchema),
    defaultValues: extractFiltersFromSearchParams(searchParams),
  });

  const onSubmitFilters = (data: PropertyFiltersValues) => {
    const params = new URLSearchParams();
    appendFiltersToSearchParams(data, params);
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => {
    form.reset({
      perPage: 8,
      page: 1,
      isReady: false,
      isNegotiable: false,
      search: "",
      cityId: 0,
      wilayaId: 0,
    });
    router.push(pathname);
  };

  // Called when the user moves/zooms the map
  const handleBoundsChange = useCallback(
    (bounds: BoundsFilter) => {
      const current = new URLSearchParams(searchParams.toString());
      current.set("swLat", bounds.swLat.toString());
      current.set("swLng", bounds.swLng.toString());
      current.set("neLat", bounds.neLat.toString());
      current.set("neLng", bounds.neLng.toString());
      current.set("page", "1"); // reset pagination on new area
      // Use router.replace so it doesn't stack history on every pan
      router.replace(`${pathname}?${current.toString()}`);
    },
    [router, pathname, searchParams],
  );

  const pagination = data?.data?.pagination;
  const listings = data?.data?.listing || [];
  
  // Get categories for pills
  const { data: categories } = useCategories({ locale });
  const selectedCategoryId = form.watch("categoryId");
  const selectedCategoryName = categories?.find(cat => cat.id === selectedCategoryId)?.name || "Listings";

  return (
    <WidgetProvider defaultView="row-card">
      {/* Breadcrumb and Title Section */}
      <div className="mb-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href={`/${locale}`} className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground font-medium">{selectedCategoryName}</span>
        </nav>
        
        {/* Title Row with Count and Toolbar */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-zinc-900">
              {pagination?.total ?? listings.length} Items
            </h1>
            <PropertyFilters
              resetFilters={resetFilters}
              form={form}
              onSubmit={onSubmitFilters}
              loading={isLoading}
            />
          </div>
          
          {/* Category Pills */}
          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={!selectedCategoryId ? "default" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => {
                  form.setValue("categoryId", undefined);
                  form.handleSubmit(onSubmitFilters)();
                }}
              >
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  type="button"
                  variant={selectedCategoryId === category.id ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => {
                    form.setValue("categoryId", category.id);
                    form.handleSubmit(onSubmitFilters)();
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Listing Widget */}
      <ListingWidget
        className="mx-auto w-full max-w-7xl pt-4"
          cardsView={
            <div className="flex gap-8 xl:gap-10">
              <aside className="hidden flex-1 max-w-[350px] lg:block">
                <Form {...form}>
                  <div className="sticky top-24 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                    <MainFilters
                      form={form}
                      onSubmit={onSubmitFilters}
                      resetFilters={resetFilters}
                    />
                  </div>
                </Form>
              </aside>
              <main className="min-w-0 flex-1">
                <FlatList
                  data={listings}
                  listClassName="grid gap-6 sm:grid-cols-2 [1560px]:grid-cols-3"
                  isLoading={isLoading}
                  isError={isError}
                  ErrorComponent={
                    <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-red-100 bg-red-50/50">
                      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                      <h3 className="text-lg font-semibold text-red-900">Failed to load properties</h3>
                      <p className="text-sm text-red-600 max-w-sm mt-1">
                        An error occurred while fetching the properties. Please try again later.
                      </p>
                      <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors text-sm font-medium">
                        Retry
                      </button>
                    </div>
                  }
                  LoadingComponent={<div className="py-10 text-center text-muted-foreground">Loading...</div>}
                  ListEmptyComponent={
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <Home className="h-12 w-12 text-muted-foreground/50 mb-4" />
                      <h3 className="text-lg font-semibold text-zinc-900">No properties found</h3>
                      <p className="text-sm text-zinc-500 max-w-sm mt-1">
                        We couldn't find any properties matching your current filters. Try adjusting your search criteria.
                      </p>
                    </div>
                  }
                  renderItem={(property) => (
                    <PropertyCard
                      key={property.id}
                      listing={(property as any).original ?? property}
                      locale={locale}
                    />
                  )}
                />
              </main>
            </div>
          }
          rowCardsView={
            <div className="grid gap-8 lg:grid-cols-[350px_minmax(0,1fr)] xl:gap-10">
              <aside className="hidden lg:block">
                <Form {...form}>
                  <div className="sticky top-24 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                    <MainFilters
                      form={form}
                      onSubmit={onSubmitFilters}
                      resetFilters={resetFilters}
                    />
                  </div>
                </Form>
              </aside>
              <main className="min-w-0 space-y-4">
                <FlatList
                  data={listings}
                  listClassName="space-y-4"
                  isLoading={isLoading}
                  isError={isError}
                  ErrorComponent={
                    <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-red-100 bg-red-50/50">
                      <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                      <h3 className="text-lg font-semibold text-red-900">Failed to load properties</h3>
                      <p className="text-sm text-red-600 max-w-sm mt-1">
                        An error occurred while fetching the properties. Please try again later.
                      </p>
                      <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors text-sm font-medium">
                        Retry
                      </button>
                    </div>
                  }
                  LoadingComponent={<div className="py-10 text-center text-muted-foreground">Loading...</div>}
                  ListEmptyComponent={
                    <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-zinc-200">
                      <Home className="h-12 w-12 text-muted-foreground/50 mb-4" />
                      <h3 className="text-lg font-semibold text-zinc-900">No properties found</h3>
                      <p className="text-sm text-zinc-500 max-w-sm mt-1">
                        We couldn't find any properties matching your current filters. Try adjusting your search criteria.
                      </p>
                    </div>
                  }
                  renderItem={(property) => (
                    <PropertyRowCard
                      key={property.id}
                      property={(property as any).original ?? property}
                    />
                  )}
                />
              </main>
            </div>
          }
          mapView={
            <MapSearchView
              locale={locale}
              properties={listings}
              isLoading={isLoading}
              onBoundsChange={handleBoundsChange}
            />
          }
        />
        {pagination && (
          // @ts-ignore
          <div className="flex justify-center">
            <Pagination {...pagination} />
          </div>
        )}
    </WidgetProvider>
  );
}

export default function RealEstateFilterPage(props: any) {
  return (
    <Suspense fallback={null}>
      <RealEstateFilterPageContent {...props} />
    </Suspense>
  );
}

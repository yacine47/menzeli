import { ListingResource, ListingResourceFromJSON } from "@/api/models";
import { API_URL } from "@/lib/api-config";

export interface SearchListingsParams {
  perPage?: number;
  page?: number;
  search?: string;
  typeId?: number;
  wilayaId?: number;
  cityId?: number;
  maxPrice?: number;
  minPrice?: number;
  isReady?: boolean;
}

export interface SearchListingsResult {
  listings: ListingResource[];
  total: number;
}

/**
 * Calls GET /api/listings/search — returns listings ranked by boost score.
 * Boosted listings float to the top via server-side scoring.
 */
export async function searchListings(
  params: SearchListingsParams = {}
): Promise<SearchListingsResult> {
  const query = new URLSearchParams();

  if (params.perPage) query.set("per_page", String(params.perPage));
  if (params.page) query.set("page", String(params.page));
  if (params.search) query.set("search", params.search);
  if (params.typeId) query.set("type_id", String(params.typeId));
  if (params.wilayaId) query.set("wilaya_id", String(params.wilayaId));
  if (params.cityId) query.set("city_id", String(params.cityId));
  if (params.maxPrice) query.set("max_price", String(params.maxPrice));
  if (params.minPrice) query.set("min_price", String(params.minPrice));
  if (params.isReady !== undefined) query.set("is_ready", String(params.isReady));

  const res = await fetch(
    `${API_URL}/api/listings/search?${query.toString()}`,
    { next: { revalidate: 60 } } // ISR — fresh every 60s
  );

  if (!res.ok) {
    throw new Error(`/listings/search failed: ${res.status}`);
  }

  const json = await res.json();
  const listings: ListingResource[] = (
    (json?.data?.listing ?? []) as unknown[]
  ).map(ListingResourceFromJSON);

  return {
    listings,
    total: json?.data?.total ?? listings.length,
  };
}

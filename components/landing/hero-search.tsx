"use client";

import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { MapPin, Home, DollarSign, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useWilayas, usePropertyTypes } from "@/hooks/use-details";

type Locale = "ar" | "en" | "fr";
type ListingType = "rent" | "buy" | "exchange";

const TABS: { value: ListingType; labelKey: string }[] = [
  { value: "rent", labelKey: "hero.search.tab_rent" },
  { value: "buy", labelKey: "hero.search.tab_buy" },
  { value: "exchange", labelKey: "hero.search.tab_exchange" },
];

type Props = {
  locale: Locale;
};

export const HeroSearch = ({ locale }: Props) => {
  const { t: tRaw } = useTranslation("common");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = tRaw as (key: string) => string;
  const { data: wilayas, isLoading: isLoadingWilayas } = useWilayas({ locale });
  const { data: propertyTypes, isLoading: isLoadingPropertyTypes } =
    usePropertyTypes({ locale });

  const [listingType, setListingType] = useState<ListingType>("rent");
  const [selectedWilayaId, setSelectedWilayaId] = useState("");
  const [selectedPropertyTypeId, setSelectedPropertyTypeId] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const router = useRouter();

  const wilayaOptions = useMemo(() => wilayas?.wilayas ?? [], [wilayas]);
  const propertyTypeOptions = useMemo(
    () => propertyTypes ?? [],
    [propertyTypes]
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("listingType", listingType);
    if (selectedWilayaId) params.set("wilayaId", selectedWilayaId);
    if (selectedPropertyTypeId) params.set("propertyTypeId", selectedPropertyTypeId);
    if (minPrice) params.set("minPrice", minPrice.replace(/\D/g, ""));
    if (maxPrice) params.set("maxPrice", maxPrice.replace(/\D/g, ""));
    router.push(`/${locale}/listings?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-5xl"
    >
      {/* Listing-type tabs */}
      <div className="mb-3 flex gap-1.5 rtl:flex-row-reverse">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setListingType(tab.value)}
            className={`rounded-xl px-5 py-2 text-sm font-semibold transition-all duration-200 ${
              listingType === tab.value
                ? "bg-[#0078FD] text-white shadow-lg shadow-[#0078FD]/40"
                : "bg-black/30 text-white/70 backdrop-blur-sm hover:bg-black/40 hover:text-white"
            }`}
          >
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      {/* Search form */}
      <form
        onSubmit={onSubmit}
        className="overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-2xl shadow-black/30 backdrop-blur-2xl"
      >
        <div className="flex flex-col divide-y divide-white/10 md:flex-row md:divide-x md:divide-y-0 rtl:md:flex-row-reverse rtl:md:divide-x-reverse">

          {/* Wilaya */}
          <div className="flex flex-1 items-center gap-3 px-5 py-4">
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-white/10">
              <MapPin className="h-4 w-4 text-white/80" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-widest text-white/50">
                {t("hero.search.wilaya")}
              </span>
              <Select
                value={selectedWilayaId}
                onValueChange={setSelectedWilayaId}
                disabled={isLoadingWilayas || wilayaOptions.length === 0}
              >
                <SelectTrigger className="h-auto w-full border-0 bg-transparent p-0 text-start text-sm font-medium text-white shadow-none ring-0 hover:bg-transparent focus:ring-0 focus:ring-offset-0 data-[placeholder]:text-white/50 [&>span]:truncate [&>svg]:ms-auto [&>svg]:text-white/40">
                  <SelectValue
                    placeholder={
                      isLoadingWilayas ? "…" : t("hero.search.wilaya_placeholder")
                    }
                  />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {wilayaOptions.map((wilaya) => (
                    <SelectItem key={wilaya.id} value={wilaya.id.toString()}>
                      {wilaya.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Property Type */}
          <div className="flex flex-1 items-center gap-3 px-5 py-4">
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-white/10">
              <Home className="h-4 w-4 text-white/80" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-widest text-white/50">
                {t("hero.search.type")}
              </span>
              <Select
                value={selectedPropertyTypeId}
                onValueChange={setSelectedPropertyTypeId}
                disabled={
                  isLoadingPropertyTypes || propertyTypeOptions.length === 0
                }
              >
                <SelectTrigger className="h-auto w-full border-0 bg-transparent p-0 text-start text-sm font-medium text-white shadow-none ring-0 hover:bg-transparent focus:ring-0 focus:ring-offset-0 data-[placeholder]:text-white/50 [&>span]:truncate [&>svg]:ms-auto [&>svg]:text-white/40">
                  <SelectValue
                    placeholder={
                      isLoadingPropertyTypes
                        ? "…"
                        : t("hero.search.type_placeholder")
                    }
                  />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  {propertyTypeOptions.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Min Price */}
          <div className="flex flex-1 items-center gap-3 px-5 py-4">
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-white/10">
              <DollarSign className="h-4 w-4 text-white/80" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-widest text-white/50">
                {t("hero.search.min_price")}
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={minPrice}
                onChange={(e) =>
                  setMinPrice(e.target.value.replace(/[^0-9]/g, ""))
                }
                placeholder={t("hero.search.min_placeholder")}
                className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/35"
              />
            </div>
          </div>

          {/* Max Price */}
          <div className="flex flex-1 items-center gap-3 px-5 py-4">
            <div className="flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-white/10">
              <DollarSign className="h-4 w-4 text-white/80" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-widest text-white/50">
                {t("hero.search.price")}
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(e.target.value.replace(/[^0-9]/g, ""))
                }
                placeholder={t("hero.search.max_placeholder")}
                className="w-full bg-transparent text-sm font-medium text-white outline-none placeholder:text-white/35"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center p-2">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0078FD] px-7 py-4 text-sm font-bold text-white shadow-[0_8px_32px_-6px_rgba(0,120,253,0.7)] transition-colors hover:bg-[#0065d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0078FD] md:w-auto"
            >
              <Search className="h-4 w-4" />
              {t("hero.search.button")}
            </motion.button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default HeroSearch;

"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Search, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { PropertyFiltersValues } from "./property-filters";
import {
  useCategories,
  usePropertyTypes,
  useWilayas,
  useCities as useCitiesHook,
} from "@/hooks/use-details";

type Props = {
  form: UseFormReturn<PropertyFiltersValues>;
  onSubmit: (data: PropertyFiltersValues) => void;
  resetFilters: () => void;
};

const MainFilters = ({ form, onSubmit, resetFilters }: Props) => {
  const { t, i18n } = useTranslation("filters");
  
  const { data: categories } = useCategories({ locale: i18n.language as "en" });
  const { data: propertyTypes } = usePropertyTypes({ locale: i18n.language as "en" });
  const { data: wilayasData } = useWilayas({ locale: i18n.language as "en" });
  const selectedWilaya = form.watch("wilayaId");
  const { data: citiesData } = useCitiesHook(selectedWilaya, i18n.language as "en");

  return (
    <div className="grid gap-4 py-4 px-4">
      {/* Property Type Section */}
      <div>
        <h3 className="text-sm font-semibold mb-3">{t("property_type")}</h3>
        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {propertyTypes?.map((type) => (
            <FormField
              key={type.id}
              control={form.control}
              name="typeId"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value === type.id}
                      onCheckedChange={(checked) => {
                        field.onChange(checked ? type.id : undefined);
                      }}
                    />
                  </FormControl>
                  <label className="text-sm cursor-pointer flex-1" onClick={() => field.onChange(type.id)}>
                    {type.name}
                  </label>
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>

      {/* Rooms Section - Chip Buttons */}
      <div>
        <h3 className="text-sm font-semibold mt-6 mb-3">{t("rooms")}</h3>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              type="button"
              variant={form.watch("numberRooms") === num ? "default" : "outline"}
              size="sm"
              className="rounded-full"
              onClick={() => form.setValue("numberRooms", num)}
            >
              {num}
            </Button>
          ))}
          <Button
            type="button"
            variant={form.watch("numberRooms") === 6 ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => form.setValue("numberRooms", 6)}
          >
            5+
          </Button>
        </div>
      </div>

      {/* Price Range Section */}
      <div>
        <h3 className="text-sm font-semibold mt-6 mb-3">{t("price_range")}</h3>
        <div className="space-y-4">
          {/* Interactive histogram bars */}
          <div className="relative flex items-end gap-1 h-16 px-1">
            {[
              { value: 100000, height: 40 },
              { value: 500000, height: 65 },
              { value: 1000000, height: 85 },
              { value: 2000000, height: 100 },
              { value: 3000000, height: 75 },
              { value: 5000000, height: 50 },
              { value: 10000000, height: 30 },
            ].map((bar, idx) => {
              const isSelected = 
                (!form.watch("minPrice") || form.watch("minPrice")! <= bar.value) &&
                (!form.watch("maxPrice") || form.watch("maxPrice")! >= bar.value);
              
              return (
                <button
                  key={idx}
                  type="button"
                  className={`flex-1 rounded-t transition-all duration-200 cursor-pointer hover:opacity-80 ${
                    isSelected 
                      ? "bg-primary hover:bg-primary/90" 
                      : "bg-primary/20 hover:bg-primary/30"
                  }`}
                  style={{ height: `${bar.height}%` }}
                  onClick={() => {
                    const currentMin = form.watch("minPrice");
                    const currentMax = form.watch("maxPrice");
                    
                    if (!currentMin && !currentMax) {
                      // First click - set max
                      form.setValue("maxPrice", bar.value);
                    } else if (currentMin && !currentMax) {
                      // Has min, set max
                      if (bar.value >= currentMin) {
                        form.setValue("maxPrice", bar.value);
                      } else {
                        form.setValue("minPrice", bar.value);
                      }
                    } else if (!currentMin && currentMax) {
                      // Has max, set min
                      if (bar.value <= currentMax) {
                        form.setValue("minPrice", bar.value);
                      } else {
                        form.setValue("maxPrice", bar.value);
                      }
                    } else {
                      // Has both, reset and start over
                      form.setValue("minPrice", undefined);
                      form.setValue("maxPrice", bar.value);
                    }
                  }}
                />
              );
            })}
          </div>
          
          {/* Min/Max inputs */}
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="minPrice"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={t("min") || "Min"}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? undefined : Number(value));
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <span className="text-zinc-400 font-medium">-</span>
            <FormField
              control={form.control}
              name="maxPrice"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder={t("max") || "Max"}
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? undefined : Number(value));
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          {/* Quick price presets */}
          <div className="flex flex-wrap gap-2">
            {[
              { label: "100K", value: 100000 },
              { label: "500K", value: 500000 },
              { label: "1M", value: 1000000 },
              { label: "2M", value: 2000000 },
              { label: "5M", value: 5000000 },
            ].map((preset) => (
              <Button
                key={preset.value}
                type="button"
                variant="outline"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => {
                  const currentMin = form.watch("minPrice");
                  if (!currentMin) {
                    form.setValue("minPrice", preset.value);
                  } else {
                    form.setValue("maxPrice", preset.value);
                  }
                }}
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Location - Wilaya Section */}
      <div>
        <h3 className="text-sm font-semibold mt-6 mb-3">{t("wilaya")}</h3>
        <div className="space-y-2 max-h-[150px] overflow-y-auto">
          {wilayasData?.wilayas?.map((wilaya) => (
            <FormField
              key={wilaya.id}
              control={form.control}
              name="wilayaId"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value === wilaya.id}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange(wilaya.id);
                          form.setValue("cityId", undefined);
                        } else {
                          field.onChange(undefined);
                        }
                      }}
                    />
                  </FormControl>
                  <label className="text-sm cursor-pointer flex-1" onClick={() => {
                    field.onChange(wilaya.id);
                    form.setValue("cityId", undefined);
                  }}>
                    {wilaya.name}
                  </label>
                </FormItem>
              )}
            />
          ))}
        </div>
      </div>

      {/* Location - City Section */}
      {selectedWilaya && citiesData && (
        <div>
          <h3 className="text-sm font-semibold mt-6 mb-3">{t("city")}</h3>
          <div className="space-y-2 max-h-[150px] overflow-y-auto">
            {citiesData.cities?.map((city) => (
              <FormField
                key={city.id}
                control={form.control}
                name="cityId"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value === city.id}
                        onCheckedChange={(checked) => {
                          field.onChange(checked ? city.id : undefined);
                        }}
                      />
                    </FormControl>
                    <label className="text-sm cursor-pointer flex-1" onClick={() => field.onChange(city.id)}>
                      {city.name}
                    </label>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
      )}

      {/* Quick Toggles - Preferences */}
      <div>
        <h3 className="text-sm font-semibold mt-6 mb-3">Preferences</h3>
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="isReady"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <label className="text-sm cursor-pointer">{t("ready_to_move") || "Ready to Move"}</label>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isNegotiable"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <label className="text-sm cursor-pointer">{t("negotiable") || "Negotiable"}</label>
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex gap-2 pt-4 mt-6 border-t">
        <Button type="button" variant="outline" className="flex-1" onClick={resetFilters}>
          {t("reset")}
        </Button>
        <Button onClick={() => form.handleSubmit(onSubmit)()} type="submit" className="flex-1">
          {t("apply_filters")}
        </Button>
      </div>
    </div>
  );
};

export default MainFilters;
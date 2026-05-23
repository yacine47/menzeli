"use client";

import { Card } from "@/components/ui/card";

const PropertyCardSkeleton = () => {
  return (
    <Card className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      {/* Image Skeleton */}
      <div className="relative h-52 w-full bg-zinc-200 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-200 animate-shimmer" />
      </div>

      {/* Content Skeleton */}
      <div className="p-5 space-y-4">
        {/* Title and Price */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 space-y-2">
            <div className="h-5 bg-zinc-200 rounded-lg w-3/4 animate-pulse" />
            <div className="h-4 bg-zinc-100 rounded-lg w-1/2 animate-pulse" />
          </div>
          <div className="h-6 bg-zinc-200 rounded-lg w-24 animate-pulse" />
        </div>

        {/* Location */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-zinc-200 rounded animate-pulse" />
          <div className="h-4 bg-zinc-100 rounded-lg w-2/3 animate-pulse" />
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 pt-3 border-t border-zinc-100">
          <div className="h-4 bg-zinc-200 rounded-lg w-16 animate-pulse" />
          <div className="h-4 bg-zinc-200 rounded-lg w-16 animate-pulse" />
          <div className="h-4 bg-zinc-200 rounded-lg w-16 animate-pulse" />
        </div>
      </div>
    </Card>
  );
};

export default PropertyCardSkeleton;

"use client";

import { ListingResource } from "@/api/models";
import { loadImage } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import {
  BedDouble,
  Maximize2,
  MapPin,
  Star,
  Eye,
  Layers,
  Tag,
  Clock,
  Users,
  Zap,
  Heart,
  Share2,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFavoritesStore } from "@/stores/useFavoritesStore";

type Props = {
  listing: ListingResource;
  locale: "ar" | "en" | "fr";
};

function timeAgo(date: Date | null, locale: string): string {
  if (!date) return "";
  const diff = Date.now() - new Date(date).getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days === 0) return locale === "fr" ? "Aujourd'hui" : locale === "ar" ? "اليوم" : "Today";
  if (days === 1) return locale === "fr" ? "Hier" : locale === "ar" ? "أمس" : "Yesterday";
  if (days < 30) return locale === "fr" ? `Il y a ${days}j` : locale === "ar" ? `منذ ${days} يوم` : `${days}d ago`;
  const months = Math.floor(days / 30);
  return locale === "fr" ? `Il y a ${months}mois` : locale === "ar" ? `منذ ${months} شهر` : `${months}mo ago`;
}

const PropertyCard = ({ listing, locale }: Props) => {
  const { t } = useTranslation("common");
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const [isHovered, setIsHovered] = useState(false);

  const imageSrc = listing.image
    ? loadImage(listing.image)
    : listing.images?.[0]?.image
    ? loadImage(listing.images[0].image)
    : null;

  const hasRating = listing.ratingAvg > 0;
  const postedAgo = timeAgo(listing.timePost, locale);

  return (
    <Link
      href={`/${locale}/listings/${listing.id}`}
      className="group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0078FD] focus-visible:ring-offset-2 rounded-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200/60 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">

        {/* ── Image Section ── */}
        <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-200">
          {imageSrc ? (
            <>
              <img
                src={imageSrc}
                alt={listing.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
              <span className="text-5xl font-black tracking-tight text-primary/30">
                M
              </span>
            </div>
          )}

          {/* Top Action Buttons - Show on hover */}
          <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-full bg-white/95 backdrop-blur-sm shadow-md hover:bg-white transition-all hover:scale-110"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(listing);
              }}
            >
              <Heart
                className={`h-4 w-4 transition-colors ${
                  isFavorite(listing.id) ? "fill-red-500 text-red-500" : "text-zinc-600"
                }`}
              />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-full bg-white/95 backdrop-blur-sm shadow-md hover:bg-white transition-all hover:scale-110"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // TODO: Implement share functionality
              }}
            >
              <Share2 className="h-4 w-4 text-zinc-600" />
            </Button>
          </div>

          {/* Badges Container */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {/* Boosted Badge */}
            {listing.isBoosted && listing.isBoosted !== "0" && (
              <Badge className="bg-primary/95 text-white border-0 shadow-lg backdrop-blur-sm px-2.5 py-1 text-xs font-semibold gap-1.5">
                <Zap className="h-3.5 w-3.5 fill-white" />
                {locale === "fr" ? "Sponsorisé" : locale === "ar" ? "مميز" : "Boosted"}
              </Badge>
            )}

            {/* Type Badge */}
            {listing.type && (
              <Badge variant="secondary" className="bg-white/95 backdrop-blur-sm shadow-md text-xs font-medium px-2.5 py-1 gap-1.5">
                {listing.type.iconPath && (
                  <img
                    src={loadImage(listing.type.iconPath)}
                    alt=""
                    className="h-3.5 w-3.5 object-contain"
                  />
                )}
                {listing.type.name}
              </Badge>
            )}
          </div>

          {/* Bottom Badges */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            {/* Negotiable Badge */}
            {listing.isNegotiable && (
              <Badge className="bg-amber-500/95 text-white border-0 shadow-lg backdrop-blur-sm px-2.5 py-1 text-xs font-bold uppercase tracking-wide gap-1.5">
                <Tag className="h-3.5 w-3.5" />
                {locale === "fr" ? "Négociable" : locale === "ar" ? "قابل للتفاوض" : "Negotiable"}
              </Badge>
            )}

            {/* Rating Badge */}
            {hasRating && (
              <Badge className="bg-black/60 text-white border-0 shadow-lg backdrop-blur-sm px-2.5 py-1 text-xs font-semibold gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                {listing.ratingAvg.toFixed(1)}
                {listing.reviewsCount > 0 && (
                  <span className="text-white/70">({listing.reviewsCount})</span>
                )}
              </Badge>
            )}
          </div>
        </div>

        {/* ── Content Section ── */}
        <div className="flex flex-1 flex-col px-5 py-4 space-y-3">

          {/* Title + Price Row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold leading-snug text-zinc-900 line-clamp-1 group-hover:text-primary transition-colors duration-200">
                {listing.title}
              </h3>
              {listing.location && (
                <div className="mt-1.5 flex items-center gap-1.5 text-sm text-zinc-500">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/70" />
                  <span className="line-clamp-1">
                    {`${listing.location.city}, ${listing.location.wilaya}`}
                  </span>
                </div>
              )}
            </div>
            <div className="shrink-0 text-right rtl:text-left">
              <p className="text-lg font-bold text-primary whitespace-nowrap">
                {formatPrice(listing.price, locale)}
              </p>
              {listing.rentDuration && (
                <p className="text-[11px] text-zinc-500 mt-0.5">
                  / {listing.rentDuration.name}
                </p>
              )}
            </div>
          </div>

          {/* Metadata Row */}
          {(listing.views > 0 || postedAgo) && (
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              {listing.views > 0 && (
                <span className="flex items-center gap-1.5">
                  <Eye className="h-3.5 w-3.5" />
                  {listing.views.toLocaleString()}
                </span>
              )}
              {postedAgo && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {postedAgo}
                </span>
              )}
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-zinc-100">
            {listing.numberRooms != null && (
              <div className="flex items-center gap-2 rounded-lg bg-zinc-50 px-2.5 py-2 transition-colors group-hover:bg-primary/5">
                <BedDouble className="h-4 w-4 text-primary/70" />
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{listing.numberRooms}</p>
                  <p className="text-[10px] text-zinc-500">{t("featured.beds")}</p>
                </div>
              </div>
            )}
            {listing.surface != null && (
              <div className="flex items-center gap-2 rounded-lg bg-zinc-50 px-2.5 py-2 transition-colors group-hover:bg-primary/5">
                <Maximize2 className="h-4 w-4 text-primary/70" />
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{listing.surface}</p>
                  <p className="text-[10px] text-zinc-500">m²</p>
                </div>
              </div>
            )}
            {listing.floor != null && listing.floor > 0 ? (
              <div className="flex items-center gap-2 rounded-lg bg-zinc-50 px-2.5 py-2 transition-colors group-hover:bg-primary/5">
                <Layers className="h-4 w-4 text-primary/70" />
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{listing.floor}</p>
                  <p className="text-[10px] text-zinc-500">
                    {locale === "fr" ? "ét." : locale === "ar" ? "ط." : "fl."}
                  </p>
                </div>
              </div>
            ) : listing.numberPersons != null ? (
              <div className="flex items-center gap-2 rounded-lg bg-zinc-50 px-2.5 py-2 transition-colors group-hover:bg-primary/5">
                <Users className="h-4 w-4 text-primary/70" />
                <div>
                  <p className="text-sm font-semibold text-zinc-900">{listing.numberPersons}</p>
                  <p className="text-[10px] text-zinc-500">
                    {locale === "fr" ? "pers." : locale === "ar" ? "شخص" : "pers."}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PropertyCard;

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Share2,
  MapPin,
  BedDouble,
  Maximize2,
  Layers,
  Users,
  Eye,
  Star,
  Clock,
  Zap,
  Tag,
  ArrowRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useFavoritesStore } from "@/stores/useFavoritesStore";
import { ApplicationModal } from "@/components/shared/application-modal";
import Link from "next/link";
import { ListingResource } from "@/api";
import { loadImage, formatPrice } from "@/lib/utils";

type Props = {
  property: ListingResource;
};

const PropertyRowCard = ({ property }: Props) => {
  const { t, i18n } = useTranslation(["common", "filters"]);
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const [isHovered, setIsHovered] = useState(false);
  const locale = i18n.language as "ar" | "en" | "fr";

  const imageSrc = property.image ? loadImage(property.image) : null;

  return (
    <Card
      className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <Link href={`/${locale}/listings/${property.id}`} className="relative block w-full sm:w-72 md:w-80 flex-shrink-0 overflow-hidden">
          <div className="aspect-[4/3] sm:aspect-auto sm:h-full min-h-[200px] bg-gradient-to-br from-zinc-100 to-zinc-200">
            {imageSrc ? (
              <>
                <img
                  src={imageSrc}
                  alt={property.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-4xl font-black text-primary/20">M</span>
              </div>
            )}
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {property.isBoosted && property.isBoosted !== "0" && (
              <Badge className="bg-primary text-white border-0 shadow-md px-2 py-0.5 text-[10px] font-bold gap-1">
                <Zap className="h-3 w-3 fill-white" />
                Boosted
              </Badge>
            )}
            {property.type && (
              <Badge variant="secondary" className="bg-white/95 backdrop-blur-sm shadow-sm text-[10px] font-medium px-2 py-0.5">
                {property.type.name}
              </Badge>
            )}
          </div>

          {/* Favorite Button */}
          <button
            className={`absolute top-3 right-3 h-8 w-8 rounded-full bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(property);
            }}
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isFavorite(property.id) ? "fill-red-500 text-red-500" : "text-zinc-600"
              }`}
            />
          </button>
        </Link>

        {/* Content Section */}
        <div className="flex-1 p-5">
          <div className="flex flex-col h-full">
            {/* Header: Title + Price */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 min-w-0">
                <Link href={`/${locale}/listings/${property.id}`}>
                  <h3 className="text-lg font-semibold text-zinc-900 line-clamp-1 group-hover:text-primary transition-colors">
                    {property.title}
                  </h3>
                </Link>
                {property.location && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-sm text-zinc-500">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-primary/60" />
                    <span className="line-clamp-1">
                      {property.location.city}, {property.location.wilaya}
                    </span>
                  </div>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-xl font-bold text-primary">
                  {formatPrice(property.price, locale)}
                </p>
                {property.rentDuration && (
                  <p className="text-xs text-zinc-500 mt-0.5">
                    / {property.rentDuration.name}
                  </p>
                )}
              </div>
            </div>

            {/* Property Features Grid */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {property.numberRooms != null && (
                <div className="flex items-center gap-2 rounded-lg bg-zinc-50 px-3 py-2">
                  <BedDouble className="h-4 w-4 text-primary/70" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{property.numberRooms}</p>
                    <p className="text-[10px] text-zinc-500">Beds</p>
                  </div>
                </div>
              )}
              {property.surface != null && (
                <div className="flex items-center gap-2 rounded-lg bg-zinc-50 px-3 py-2">
                  <Maximize2 className="h-4 w-4 text-primary/70" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{property.surface}</p>
                    <p className="text-[10px] text-zinc-500">m²</p>
                  </div>
                </div>
              )}
              {property.floor != null && property.floor > 0 ? (
                <div className="flex items-center gap-2 rounded-lg bg-zinc-50 px-3 py-2">
                  <Layers className="h-4 w-4 text-primary/70" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{property.floor}</p>
                    <p className="text-[10px] text-zinc-500">Floor</p>
                  </div>
                </div>
              ) : property.numberPersons != null ? (
                <div className="flex items-center gap-2 rounded-lg bg-zinc-50 px-3 py-2">
                  <Users className="h-4 w-4 text-primary/70" />
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">{property.numberPersons}</p>
                    <p className="text-[10px] text-zinc-500">Persons</p>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Features Tags */}
            {property.features && property.features.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {property.features.slice(0, 3).map((feature) => (
                  <Badge
                    key={feature.id}
                    variant="secondary"
                    className="text-xs font-medium px-2 py-0.5"
                  >
                    {feature.iconPath && (
                      <img
                        src={loadImage(feature.iconPath)}
                        alt=""
                        className="w-3 h-3 mr-1 object-contain inline"
                      />
                    )}
                    {feature.name}
                  </Badge>
                ))}
                {property.features.length > 3 && (
                  <Badge variant="outline" className="text-xs font-medium">
                    +{property.features.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* Footer: Metadata + Actions */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-100">
              <div className="flex items-center gap-3 text-xs text-zinc-400">
                {property.views > 0 && (
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {property.views.toLocaleString()}
                  </span>
                )}
                {property.ratingAvg > 0 && (
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {property.ratingAvg.toFixed(1)}
                  </span>
                )}
                {property.timePost && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {new Date(property.timePost).toLocaleDateString()}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <ApplicationModal>
                  <Button size="sm" className="gap-2">
                    Contact Owner
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </ApplicationModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PropertyRowCard;

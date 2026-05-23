"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Star,
  Bed,
  Maximize,
  Users,
  CalendarDays,
  Layers,
  Timer,
  Tag,
  Navigation,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  Share2,
  Heart,
  Phone,
  Mail,
  MessageCircle,
  Flag,
  AlertTriangle,
} from "lucide-react";
import { useListing } from "@/hooks/use-listings";
import { API_URL } from "@/lib/api-config";
import { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RelatedProperties } from "./related-properties";
import { formatDate, formatPrice, loadImage } from "@/lib/utils";
import { ReportModal } from "@/components/shared/report-modal";
import MemberCard from "../members/member-card";
import LocationPlace from '../map/location-place';
import { ReviewsSection } from './reviews-section';

interface Props {
  id: number;
}

export default function PropertyDetails({ id }: Props) {
  const { data, isLoading, error } = useListing(id);
  const {
    t,
    i18n: { language: locale },
  } = useTranslation("property-details");
  const { t: tCommon } = useTranslation("common");

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);

  // Collect all images from the listing
  const allImages = useMemo(() => {
    const images: string[] = [];
    if (data?.data?.image) images.push(data.data.image);
    if (data?.data?.images && Array.isArray(data.data.images)) {
      data.data.images.forEach((img: any) => {
        if (img.image && !images.includes(img.image)) {
          images.push(img.image);
        }
      });
    }
    return images;
  }, [data?.data]);

  const agent = useMemo(() => {
    if (data?.data.member) return data?.data.member;
    return null;
  }, [data?.data]);

  const reviews = useMemo(() => {
    if (!data?.data) return [];
    const value = (data?.data as any).reviews;
    return Array.isArray(value) ? value : [];
  }, [data?.data]);

  const averageRating = useMemo(() => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  }, [reviews]);

  const totalReviews = useMemo(() => {
    return reviews?.length || 0;
  }, [reviews]);

  // Handle keyboard navigation for image gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showAllImages) return;
      
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex(prev => prev > 0 ? prev - 1 : allImages.length - 1);
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex(prev => prev < allImages.length - 1 ? prev + 1 : 0);
      } else if (e.key === 'Escape') {
        setShowAllImages(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showAllImages, allImages.length]);

  // if (isLoading) {
  //   return (
  //     <div className="flex h-[50vh] items-center justify-center">
  //       <Loader2 className="h-8 w-8 animate-spin text-primary" />
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-red-500">
        {t("state.error_loading")}
      </div>
    );
  }

  

  const ImagePlaceholder = ({ label }: { label: string }) => (
    <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 flex flex-col items-center justify-center gap-3 text-zinc-400">
      <div className="p-4 rounded-full bg-white/50 backdrop-blur-sm">
        <ImageIcon className="w-10 h-10 opacity-50" />
      </div>
      <span className="text-sm font-medium opacity-70">{label}</span>
    </div>
  );

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="mx-auto max-w-8xl px-4 py-4 lg:py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* ── Main Content ── */}
        <div className="space-y-6 lg:col-span-2">
          {/* Image Gallery - Premium Hero Section */}
          <div className="relative mb-8 group/gallery">
            {/* Main Image Container */}
            <div className="relative aspect-[16/9] md:aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-100 shadow-2xl">
              {/* Image Slider with Fade Transition */}
              <div className="relative w-full h-full">
                {allImages.length > 0 ? (
                  <>
                    {/* Current Image */}
                    <div className="absolute inset-0 transition-opacity duration-500 ease-in-out">
                      <img
                        src={loadImage(allImages[currentImageIndex])}
                        alt={`${data?.data.title} - Image ${currentImageIndex + 1}`}
                        className="object-cover w-full h-full"
                        loading="eager"
                      />
                    </div>

                    {/* Next Image (for crossfade effect) */}
                    {allImages.length > 1 && (
                      <div 
                        key={currentImageIndex}
                        className="absolute inset-0 transition-opacity duration-500 ease-in-out opacity-0 animate-fade-in"
                      >
                        <img
                          src={loadImage(allImages[currentImageIndex])}
                          alt=""
                          className="object-cover w-full h-full"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <ImagePlaceholder label={t("gallery.no_image")} />
                )}
              </div>
              
              {/* Dark Overlay Gradient - Always visible for better contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
              
              {/* Top Bar - Type Badge & Actions */}
              <div className="absolute top-0 left-0 right-0 p-4 flex items-start justify-between">
                {/* Type Badge */}
                {data?.data.type && (
                  <div className="flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-full px-4 py-2 text-sm font-semibold shadow-xl border border-white/30 hover:scale-105 transition-transform duration-300">
                    {data?.data.type.iconPath && (
                      <img
                        src={loadImage(data?.data.type.iconPath)}
                        alt=""
                        className="w-5 h-5"
                      />
                    )}
                    {data?.data.type.name}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }}
                    className="group/fav p-3 rounded-full bg-white/95 backdrop-blur-md shadow-xl transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart className={`w-5 h-5 transition-all duration-300 ${
                      isFavorite 
                        ? 'fill-red-500 text-red-500 scale-110' 
                        : 'text-zinc-700 group-hover/fav:text-red-500'
                    }`} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); /* TODO: Implement share */ }}
                    className="p-3 rounded-full bg-white/95 backdrop-blur-md shadow-xl transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95"
                    aria-label="Share property"
                  >
                    <Share2 className="w-5 h-5 text-zinc-700" />
                  </button>
                </div>
              </div>

              {/* Navigation Arrows - Enhanced */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/95 backdrop-blur-md shadow-xl opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95 hover:shadow-2xl focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6 text-zinc-800" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/95 backdrop-blur-md shadow-xl opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110 active:scale-95 hover:shadow-2xl focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-6 h-6 text-zinc-800" />
                  </button>
                </>
              )}

              {/* Bottom Bar - Counter & Indicators */}
              {allImages.length > 1 && (
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center justify-between">
                    {/* Image Counter Badge */}
                    <div className="px-4 py-2 rounded-full bg-black/60 backdrop-blur-md text-white text-sm font-semibold shadow-lg border border-white/10">
                      <span className="tabular-nums">{currentImageIndex + 1}</span>
                      <span className="mx-1 opacity-60">/</span>
                      <span className="tabular-nums opacity-80">{allImages.length}</span>
                    </div>

                    {/* Progress Dots */}
                    <div className="flex gap-1.5">
                      {allImages.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                          className={`transition-all duration-300 rounded-full ${
                            currentImageIndex === idx
                              ? 'w-8 h-2 bg-white shadow-lg'
                              : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                          }`}
                          aria-label={`Go to image ${idx + 1}`}
                          aria-current={currentImageIndex === idx ? 'true' : 'false'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnail Strip - Desktop */}
            {allImages.length > 1 && (
              <div className="hidden md:flex gap-3 mt-3 px-2 py-3 overflow-x-auto scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent">
                {allImages.map((img, idx) => (
                  <div key={idx} className="flex-shrink-0">
                    <button
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        currentImageIndex === idx
                          ? 'border-primary ring-2 ring-primary/30 scale-110 shadow-xl'
                          : 'border-zinc-200 opacity-60 hover:opacity-100 hover:scale-105 grayscale hover:grayscale-0 hover:border-zinc-300 hover:shadow-md'
                      }`}
                    >
                      <img
                        src={loadImage(img)}
                        alt={`Thumbnail ${idx + 1}`}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                      {currentImageIndex === idx && (
                        <div className="absolute inset-0 bg-primary/20" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Mobile Thumbnail Dots */}
            {allImages.length > 1 && (
              <div className="flex md:hidden justify-center gap-2 mt-4">
                {allImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`transition-all duration-300 rounded-full ${
                      currentImageIndex === idx 
                        ? 'w-8 h-2 bg-primary shadow-md' 
                        : 'w-2 h-2 bg-zinc-300 hover:bg-zinc-400'
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Title / Price / Location - Enhanced Header */}
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="space-y-3 flex-1">
                {/* Categories */}
                {data?.data.categories && data?.data.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {data?.data.categories.map((cat: any) => (
                      <Badge
                        key={cat.id}
                        variant="secondary"
                        className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                      >
                        {cat.iconPath && (
                          <img
                            src={loadImage(cat.iconPath)}
                            alt=""
                            className="w-4 h-4"
                          />
                        )}
                        {cat.name}
                      </Badge>
                    ))}
                  </div>
                )}
                <h1 className="text-zinc-900 font-heading text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight tracking-tight">
                  {data?.data.title}
                </h1>
              </div>
              <div className="lg:text-right shrink-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
                <div className="text-primary text-3xl lg:text-4xl font-bold whitespace-nowrap">
                  {formatPrice(data?.data?.price || 0, locale as "en")}
                </div>
                {data?.data.rentDuration && (
                  <div className="text-zinc-600 text-sm flex items-center lg:justify-end gap-1.5 mt-1">
                    <Timer className="w-4 h-4" />
                    {t("price.per_duration", {
                      duration: data?.data.rentDuration.name,
                    })}
                  </div>
                )}
                {data?.data.isNegotiable && (
                  <Badge
                    variant="outline"
                    className="mt-2 text-xs font-semibold text-emerald-600 border-emerald-300 bg-emerald-50 px-3 py-1"
                  >
                    {t("badges.negotiable")}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-600">
              {data?.data.location && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-medium">
                    {data?.data.location.city}, {data?.data.location.wilaya},{" "}
                    {data?.data.location.country}
                  </span>
                </div>
              )}
              {data?.data.location?.zipCode && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100">
                  <Tag className="w-4 h-4 text-zinc-500" />
                  <span className="font-medium">{data?.data.location.zipCode}</span>
                </div>
              )}
              {data?.data.timePost && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100">
                  <CalendarDays className="w-4 h-4 text-zinc-500" />
                  <span className="font-medium">
                    {t("meta.posted", {
                      date: formatDate(
                        data?.data.timePost.toLocaleString().split("T")[0],
                      ),
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats - Enhanced Cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {data?.data.surface != null && (
              <div className="group bg-gradient-to-br from-white to-zinc-50 rounded-2xl p-4 flex flex-col gap-2 border border-zinc-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Maximize className="w-5 h-5 text-primary" />
                </div>
                <span className="text-2xl font-bold text-zinc-900">
                  {data?.data.surface} m²
                </span>
                <span className="text-xs text-zinc-500 font-medium uppercase tracking-wide">
                  {t("stats.surface")}
                </span>
              </div>
            )}
            {data?.data.numberRooms != null && (
              <div className="group bg-gradient-to-br from-white to-zinc-50 rounded-2xl p-4 flex flex-col gap-2 border border-zinc-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Bed className="w-5 h-5 text-primary" />
                </div>
                <span className="text-2xl font-bold text-zinc-900">
                  {data?.data.numberRooms}
                </span>
                <span className="text-xs text-zinc-500 font-medium uppercase tracking-wide">
                  {t(
                    data?.data.numberRooms === 1 ? "stats.room" : "stats.rooms",
                  )}
                </span>
              </div>
            )}
            {data?.data.numberPersons != null && (
              <div className="group bg-gradient-to-br from-white to-zinc-50 rounded-2xl p-4 flex flex-col gap-2 border border-zinc-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <span className="text-2xl font-bold text-zinc-900">
                  {data?.data.numberPersons}
                </span>
                <span className="text-xs text-zinc-500 font-medium uppercase tracking-wide">
                  {t("stats.max_persons")}
                </span>
              </div>
            )}
            {data?.data.floor != null && (
              <div className="group bg-gradient-to-br from-white to-zinc-50 rounded-2xl p-4 flex flex-col gap-2 border border-zinc-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                <span className="text-2xl font-bold text-zinc-900">{data?.data.floor}</span>
                <span className="text-xs text-zinc-500 font-medium uppercase tracking-wide">
                  {t("stats.floor")}
                </span>
              </div>
            )}
          </div>

          {/* Description - Enhanced */}
          {data?.data.description && (
            <div className="space-y-3 bg-gradient-to-br from-white to-zinc-50 rounded-2xl p-6 border border-zinc-200">
              <h2 className="text-zinc-900 font-bold text-xl flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                {t("sections.description")}
              </h2>
              <p className="text-zinc-600 leading-relaxed text-base">
                {data?.data.description}
              </p>
            </div>
          )}

          {/* Features / Amenities - Enhanced Grid */}
          {data?.data.features && data?.data.features.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-zinc-900 font-bold text-xl flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                {t("sections.amenities")}
              </h2>
              <Card className="shadow-none border-zinc-200 bg-gradient-to-br from-white to-zinc-50">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                    {data?.data?.features.map((feature: any) => (
                      <div
                        key={feature.id}
                        className="group flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-zinc-200 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-0.5"
                      >
                        {feature?.iconPath ? (
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <img
                              src={loadImage(feature.iconPath)}
                              alt=""
                              className="w-5 h-5 object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                            <Star className="w-5 h-5 text-amber-500" />
                          </div>
                        )}
                        <span className="font-medium text-sm text-zinc-700 group-hover:text-zinc-900">{feature.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Near Places - Enhanced */}
          {data?.data.nearPlaces && data?.data.nearPlaces.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-zinc-900 font-bold text-xl flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full"></div>
                {t("sections.nearby_places")}
              </h2>
              <Card className="shadow-none border-zinc-200 bg-gradient-to-br from-white to-zinc-50">
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                    {data?.data.nearPlaces.map((place: any) => (
                      <div
                        key={place.id}
                        className="group flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-zinc-200 hover:border-blue-500/50 hover:shadow-md hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-0.5"
                      >
                        {place.iconPath ? (
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <img
                              src={loadImage(place.iconPath)}
                              alt=""
                              className="w-5 h-5 object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                            <Navigation className="w-5 h-5 text-blue-600" />
                          </div>
                        )}
                        <span className="font-medium text-sm text-zinc-700 group-hover:text-zinc-900">{place.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Property Details - Enhanced Table */}
          <div className="space-y-4">
            <h2 className="text-zinc-900 font-bold text-xl flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              {t("sections.property_details")}
            </h2>
            <Card className="shadow-none border-zinc-200 bg-gradient-to-br from-white to-zinc-50">
              <CardContent className="pt-6">
                <div className="divide-y divide-zinc-200">
                  <div className="flex items-center justify-between py-3.5 hover:bg-zinc-50 rounded-lg px-3 -mx-3 transition-colors">
                    <span className="text-zinc-500 font-medium">
                      {t("details.status")}
                    </span>
                    <Badge
                      variant={data?.data.isReady ? "default" : "secondary"}
                      className="text-xs font-semibold px-3 py-1"
                    >
                      {data?.data.isReady
                        ? t("status.ready_to_move")
                        : t("status.under_construction")}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between py-3.5 hover:bg-zinc-50 rounded-lg px-3 -mx-3 transition-colors">
                    <span className="text-zinc-500 font-medium">
                      {t("details.moderation")}
                    </span>
                    <Badge
                      variant={
                        data?.data.moderationStatus === "approved"
                          ? "default"
                          : "outline"
                      }
                      className="capitalize text-xs font-semibold px-3 py-1"
                    >
                      {data?.data.moderationStatus}
                    </Badge>
                  </div>
                  {data?.data.location && (
                    <div className="flex items-center justify-between py-3.5 hover:bg-zinc-50 rounded-lg px-3 -mx-3 transition-colors">
                      <span className="text-zinc-500 font-medium">
                        {t("details.location")}
                      </span>
                      <span className="font-semibold text-zinc-900 text-right">
                        {data?.data.location.city}, {data?.data.location.wilaya}
                      </span>
                    </div>
                  )}

                  {data?.data.surface != null && (
                    <div className="flex items-center justify-between py-3.5 hover:bg-zinc-50 rounded-lg px-3 -mx-3 transition-colors">
                      <span className="text-zinc-500 font-medium">
                        {t("details.living_space")}
                      </span>
                      <span className="font-semibold text-zinc-900">{data?.data.surface} m²</span>
                    </div>
                  )}
                  {data?.data.floor != null && (
                    <div className="flex items-center justify-between py-3.5 hover:bg-zinc-50 rounded-lg px-3 -mx-3 transition-colors">
                      <span className="text-zinc-500 font-medium">
                        {t("details.floor")}
                      </span>
                      <span className="font-semibold text-zinc-900">{data?.data.floor}</span>
                    </div>
                  )}
                  {data?.data.numberRooms != null && (
                    <div className="flex items-center justify-between py-3.5 hover:bg-zinc-50 rounded-lg px-3 -mx-3 transition-colors">
                      <span className="text-zinc-500 font-medium">
                        {t("details.rooms")}
                      </span>
                      <span className="font-semibold text-zinc-900">
                        {data?.data.numberRooms}
                      </span>
                    </div>
                  )}
                  {data?.data.numberPersons != null && (
                    <div className="flex items-center justify-between py-3.5 hover:bg-zinc-50 rounded-lg px-3 -mx-3 transition-colors">
                      <span className="text-zinc-500 font-medium">
                        {t("details.max_persons")}
                      </span>
                      <span className="font-semibold text-zinc-900">
                        {data?.data.numberPersons}
                      </span>
                    </div>
                  )}
                  {data?.data.minDuration != null && (
                    <div className="flex items-center justify-between py-3.5 hover:bg-zinc-50 rounded-lg px-3 -mx-3 transition-colors">
                      <span className="text-zinc-500 font-medium">
                        {t("details.min_duration")}
                      </span>
                      <span className="font-semibold text-zinc-900">
                        {data?.data.minDuration}{" "}
                        {data?.data.rentDuration?.name ??
                          t(
                            data?.data.minDuration > 1
                              ? "labels.days"
                              : "labels.day",
                          )}
                      </span>
                    </div>
                  )}
                  {data?.data.rentDuration && (
                    <div className="flex items-center justify-between py-3.5 hover:bg-zinc-50 rounded-lg px-3 -mx-3 transition-colors">
                      <span className="text-zinc-500 font-medium">
                        {t("details.rent_duration")}
                      </span>
                      <span className="font-semibold text-zinc-900">
                        {data?.data.rentDuration.name}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between py-3.5 hover:bg-zinc-50 rounded-lg px-3 -mx-3 transition-colors">
                    <span className="text-zinc-500 font-medium">
                      {t("details.negotiable")}
                    </span>
                    <span className="font-semibold text-zinc-900">
                      {data?.data.isNegotiable ? t("labels.yes") : t("labels.no")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map - Enhanced Container */}
          <div className="space-y-4">
            <h2 className="text-zinc-900 font-bold text-xl flex items-center gap-2">
              <div className="w-1 h-6 bg-primary rounded-full"></div>
              {t("sections.location") || "Location"}
            </h2>
            <LocationPlace isLoading={isLoading} location={data?.data.location} className="shadow-lg border-zinc-200" />
          </div>

          {/* Reviews Section */}
          <ReviewsSection 
            reviews={reviews} 
            averageRating={averageRating} 
            totalReviews={totalReviews}
            listingId={data?.data.id || 0}
          />
        </div>

        {/* ── Sidebar - Sticky */}
        <div className="space-y-4 lg:sticky lg:top-4 lg:self-start">
          {/* Agent Card */}
          <MemberCard member={agent} isLoading={isLoading} />

          {/* Quick Actions */}
          <Card className="bg-gradient-to-br from-white to-zinc-50 shadow-none border-zinc-200">
            <CardContent className="pt-6 space-y-3">
              <h3 className="font-bold text-zinc-900 text-lg mb-4">{t("quick_actions.title")}</h3>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5" size="lg">
                <Phone className="w-5 h-5 mr-2" />
                {t("quick_actions.call_agent")}
              </Button>
              <Button variant="outline" className="w-full border-2 border-zinc-300 hover:border-primary hover:bg-primary/5 font-semibold py-6 rounded-xl transition-all duration-300" size="lg">
                <Mail className="w-5 h-5 mr-2" />
                {t("quick_actions.send_email")}
              </Button>
              <Button variant="outline" className="w-full border-2 border-zinc-300 hover:border-green-500 hover:bg-green-50 font-semibold py-6 rounded-xl transition-all duration-300" size="lg">
                <MessageCircle className="w-5 h-5 mr-2" />
                {t("quick_actions.whatsapp")}
              </Button>
            </CardContent>
          </Card>

          {/* Report Section - Enhanced Clarity */}
          <Card className="bg-gradient-to-br from-red-50/50 to-orange-50/50 border-red-200/50 shadow-none">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 rounded-lg bg-red-100">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-zinc-900 text-sm">{tCommon("report_modal.trigger")}</h3>
                  <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                    {tCommon("report_modal.description_short")}
                  </p>
                </div>
              </div>
              <ReportModal listingId={data?.data.id}>
                <Button variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-100 hover:border-red-400 hover:text-red-800 font-medium py-3 rounded-xl transition-all duration-300 group">
                  <Flag className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  {tCommon("report_modal.trigger")}
                </Button>
              </ReportModal>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Related Properties Section */}
      <RelatedProperties
        currentPropertyId={data?.data.id}
        wilayaId={Number(data?.data.location?.wilayaCode)}
      />
    </div>
  );
}

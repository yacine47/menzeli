"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, StarHalf, MessageSquare, ThumbsUp, Flag, ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { formatDate, loadImage, getProfileImageUrl } from "@/lib/utils";
import { ReviewResource } from "@/hooks/use-listings";
import { motion, AnimatePresence } from "framer-motion";

interface ReviewsSectionProps {
  reviews: ReviewResource[];
  averageRating: number;
  totalReviews: number;
  listingId: number;
}

export function ReviewsSection({ reviews, averageRating, totalReviews, listingId }: ReviewsSectionProps) {
  const { t } = useTranslation("property-details");
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Display only first 3 reviews initially, with "Show More" option
  const displayedReviews = useMemo(() => {
    if (showAllReviews) return reviews;
    return reviews.slice(0, 3);
  }, [reviews, showAllReviews]);

  const toggleReview = (reviewId: number) => {
    setExpandedReviews(prev => {
      const next = new Set(prev);
      if (next.has(reviewId)) {
        next.delete(reviewId);
      } else {
        next.add(reviewId);
      }
      return next;
    });
  };

  if (totalReviews === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          <h2 className="text-zinc-900 font-bold text-xl">{t("sections.reviews")}</h2>
        </div>
        <Card className="bg-gradient-to-br from-zinc-50 to-white border-zinc-200">
          <CardContent className="py-12">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <div className="p-4 rounded-full bg-primary/10">
                <MessageSquare className="w-8 h-8 text-primary opacity-60" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 text-lg">{t("reviews.no_reviews_title")}</h3>
                <p className="text-zinc-500 text-sm mt-1">{t("reviews.no_reviews_description")}</p>
              </div>
              <Button variant="outline" className="mt-2">
                {t("reviews.be_first")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-2">
        <div className="w-1 h-6 bg-primary rounded-full"></div>
        <h2 className="text-zinc-900 font-bold text-xl">{t("sections.reviews")}</h2>
        <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary">
          {totalReviews} {totalReviews === 1 ? t("reviews.review") : t("reviews.reviews")}
        </Badge>
      </div>

      {/* Rating Summary Card */}
      <Card className="bg-gradient-to-br from-primary/5 via-white to-primary/5 border-primary/20 shadow-lg shadow-primary/5">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Average Rating */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-zinc-900 mb-2">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex items-center justify-center gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(averageRating)
                          ? "fill-amber-400 text-amber-400"
                          : i < Math.ceil(averageRating) && averageRating % 1 >= 0.5
                          ? "fill-amber-400/50 text-amber-400"
                          : "text-zinc-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-zinc-500">
                  {totalReviews} {totalReviews === 1 ? t("reviews.review") : t("reviews.reviews")}
                </div>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter(r => r.rating === star).length;
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                
                return (
                  <div key={star} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12">
                      <span className="text-sm font-medium text-zinc-700">{star}</span>
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    </div>
                    <div className="flex-1 h-2 bg-zinc-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                      />
                    </div>
                    <span className="text-sm text-zinc-500 w-8 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {displayedReviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="bg-white border-zinc-200 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  {/* Review Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarImage 
                        src={getProfileImageUrl({ profileImage: review.profile_image }) || undefined} 
                        alt={review.username} 
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {review.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-zinc-900">{review.username}</h4>
                            {review.is_verified && (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5">
                                {t("reviews.verified")}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < review.rating
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-zinc-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-zinc-500">•</span>
                            <span className="text-xs text-zinc-500">
                              {formatDate(review.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  {review.review && (
                    <div className="pl-16">
                      <p className={`text-zinc-700 leading-relaxed ${
                        !expandedReviews.has(review.id) && review.review.length > 150
                          ? "line-clamp-3"
                          : ""
                      }`}>
                        {review.review}
                      </p>
                      {review.review.length > 150 && (
                        <button
                          onClick={() => toggleReview(review.id)}
                          className="inline-flex items-center gap-1 mt-2 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                        >
                          {expandedReviews.has(review.id) ? (
                            <>
                              {t("reviews.show_less")}
                              <ChevronUp className="w-4 h-4" />
                            </>
                          ) : (
                            <>
                              {t("reviews.show_more")}
                              <ChevronDown className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}

                  {/* Review Actions */}
                  <div className="flex items-center gap-4 mt-4 pl-16">
                    <button className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-primary transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      {t("reviews.helpful")}
                    </button>
                    <button className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-red-600 transition-colors">
                      <Flag className="w-4 h-4" />
                      {t("reviews.report")}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Show More Button */}
        {reviews.length > 3 && !showAllReviews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center pt-4"
          >
            <Button
              variant="outline"
              onClick={() => setShowAllReviews(true)}
              className="border-2 border-primary/30 text-primary hover:bg-primary hover:text-white font-semibold py-6 px-8 rounded-xl transition-all duration-300"
            >
              {t("reviews.show_all", { count: reviews.length - 3 })}
            </Button>
          </motion.div>
        )}

        {/* Show Less Button */}
        {showAllReviews && reviews.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center pt-4"
          >
            <Button
              variant="outline"
              onClick={() => setShowAllReviews(false)}
              className="border-2 border-zinc-300 hover:border-primary font-semibold py-6 px-8 rounded-xl transition-all duration-300"
            >
              {t("reviews.show_less_all")}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

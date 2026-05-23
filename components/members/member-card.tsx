import { API_URL } from "@/lib/api-config";
import { CheckCircle2, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MemberResource, TypeResource } from "@/api";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeletor";
import { Button } from "../ui/button";
import {useEffect} from 'react';
import { getProfileImageUrl, loadImage } from "@/lib/utils";

type Props = {
  member?: MemberResource | null;
  isLoading?: boolean;
  listingId?: number;
  listingType?: TypeResource | null;
};

const MemberCard = ({ member, isLoading, listingId, listingType }: Props) => {
  const {
    t,
  } = useTranslation("property-details");

  useEffect(() => {
    console.log({member})
  },[member])

  const fallbackText =
    member?.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  if (isLoading) {
    return (
      <Card className="bg-muted/50 shadow-none">
        <CardContent className="space-y-5 pt-5">
          <div className="flex items-start gap-4">
            <Skeleton className="h-14 w-14 rounded-full" />
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Separator />
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
          <Skeleton className="h-9 w-full rounded-md" />
        </CardContent>
      </Card>
    );
  }

  if (!member) {
    return (
      <Card className="bg-muted/50 shadow-none">
        <CardContent className="pt-4 space-y-3 text-sm">
          <h3 className="font-semibold">{t("agent.listing_info")}</h3>
          {listingId && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("agent.id")}</span>
              <span className="font-medium">#{listingId}</span>
            </div>
          )}
          {listingType && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">{t("agent.type")}</span>
              <div className="flex items-center gap-1.5">
                {listingType.iconPath && (
                  <img src={loadImage(listingType.iconPath)} alt="" className="w-4 h-4" />
                )}
                <span className="font-medium">{listingType.name}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-white to-zinc-50 shadow-lg border-zinc-200 overflow-hidden">
      <CardContent className="space-y-5 pt-6">
        <div className="flex items-start gap-4">
          <Avatar size="lg" className="size-16 border-2 border-primary/20 shadow-md">
            <AvatarImage
              src={getProfileImageUrl({ profileImage: member?.profileImage }) || undefined}
              alt={member?.name ?? t("agent.fallback_name")}
            />
            <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">{fallbackText}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold leading-tight text-zinc-900">{member?.name}</h3>
            {member?.memberVerified && (
              <div className="flex items-center gap-1.5 text-emerald-600 text-xs mt-1 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                {t("agent.verified")}
              </div>
            )}
            {member?.phone && (
              <div className="mt-2 text-sm text-zinc-600 font-medium">
                {member?.phone}
              </div>
            )}
          </div>
        </div>
        <Separator className="bg-zinc-200" />
        <div className="space-y-3 text-sm">
          {member?.email && (
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-zinc-500 mt-0.5 shrink-0" />
              <span className="text-zinc-600 break-all">{member?.email}</span>
            </div>
          )}
        </div>
        <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5">
          {t("agent.contact_owner")}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MemberCard;

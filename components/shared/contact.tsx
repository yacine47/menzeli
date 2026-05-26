"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "react-i18next";
import { MapPin, Phone, Mail, Clock, Loader2, Send } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().trim().min(1).max(20),
  lastName: z.string().trim().min(1).max(20),
  email: z.string().email(),
  subject: z.string().trim().min(1),
  message: z.string().trim().min(2).max(255),
});

const easing = [0.22, 1, 0.36, 1] as const;

const slideIn = (direction: "left" | "right", delay = 0) => ({
  initial: { opacity: 0, x: direction === "left" ? -28 : 28 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.55, ease: easing, delay },
});

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: easing, delay },
});

export default function ContactSection() {
  const { t } = useTranslation("contact");
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
    const { firstName, lastName, email, subject, message } = values;
    window.location.href = `mailto:${t("info.email_address")}?subject=${subject}&body=Hello I am ${firstName} ${lastName}, my Email is ${email}. %0D%0A${message}`;
  }

  const contactItems = [
    {
      icon: MapPin,
      label: t("info.location_label"),
      value: t("info.address"),
    },
    {
      icon: Phone,
      label: t("info.phone_label"),
      value: t("info.phone_number"),
    },
    {
      icon: Mail,
      label: t("info.email_label"),
      value: t("info.email_address"),
    },
    {
      icon: Clock,
      label: t("info.hours_label"),
      value: t("info.hours"),
    },
  ] as const;

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* Section header */}
        <motion.div {...fadeUp(0)} className="mb-12 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            {t("subtitle")}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {t("title")}
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          {/* Left: Info panel */}
          <motion.div
            {...slideIn("left", 0.1)}
            className="relative overflow-hidden rounded-3xl bg-foreground p-8 text-background lg:col-span-2"
          >
            {/* Dot-grid decoration */}
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
            >
              <defs>
                <pattern
                  id="contact-dots"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1.5" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#contact-dots)" />
            </svg>

            {/* Top accent bar */}
            <div className="absolute start-0 top-0 h-1 w-20 rounded-br-full bg-primary" />

            <div className="relative flex h-full flex-col justify-between gap-10">
              <div>
                <p className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-background/60">
                  {t("info.office")}
                </p>

                <ul className="space-y-7" role="list">
                  {contactItems.map(({ icon: Icon, label, value }, i) => (
                    <motion.li
                      key={label}
                      {...fadeUp(0.15 + i * 0.08)}
                      className="flex items-start gap-4"
                    >
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-background/10">
                        <Icon className="h-4 w-4 text-background/80" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="mb-0.5 text-[11px] font-bold uppercase tracking-widest text-background/65">
                          {label}
                        </p>
                        <p className="text-sm leading-relaxed text-background">{value}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Bottom accent */}
              <div className="border-t border-background/10 pt-6">
                <div className="h-0.5 w-8 rounded-full bg-primary" />
              </div>
            </div>
          </motion.div>

          {/* Right: Form panel */}
          <motion.div
            {...slideIn("right", 0.15)}
            className="rounded-3xl border border-border bg-card p-8 lg:col-span-3"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">
                          {t("form.first_name")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-11 rounded-xl border-transparent bg-muted/60 transition-colors focus:border-primary focus:bg-background"
                            placeholder={t("form.placeholders.first_name")}
                            autoComplete="given-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold">
                          {t("form.last_name")}
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="h-11 rounded-xl border-transparent bg-muted/60 transition-colors focus:border-primary focus:bg-background"
                            placeholder={t("form.placeholders.last_name")}
                            autoComplete="family-name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        {t("form.email")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          className="h-11 rounded-xl border-transparent bg-muted/60 transition-colors focus:border-primary focus:bg-background"
                          placeholder={t("form.placeholders.email")}
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        {t("form.subject")}
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-11 w-full rounded-xl border-transparent bg-muted/60">
                            <SelectValue placeholder={t("form.placeholders.subject")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="General Inquiry">
                            {t("form.subjects.general")}
                          </SelectItem>
                          <SelectItem value="Support">
                            {t("form.subjects.support")}
                          </SelectItem>
                          <SelectItem value="Sales">
                            {t("form.subjects.sales")}
                          </SelectItem>
                          <SelectItem value="Partnership">
                            {t("form.subjects.partnership")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        {t("form.message")}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          placeholder={t("form.placeholders.message")}
                          className="resize-none rounded-xl border-transparent bg-muted/60 transition-colors focus:border-primary focus:bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="h-12 w-full gap-2 rounded-xl text-base font-semibold"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      {t("form.submitting")}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" aria-hidden="true" />
                      {t("form.submit")}
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

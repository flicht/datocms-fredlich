/**
 * Read-only view of the tables the editor at tools.fredlich.com writes.
 * The editor (flicht/fredlich-tools, src/db/schema.ts) owns the shape and
 * creates the tables; keep this file in step with it.
 */
import { boolean, integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export type Image = {
  url: string;
  width: number;
  height: number;
  alt: string;
  /** Tiny base64 JPEG for the loading placeholder. */
  blur: string;
};

export type SocialType = "instagram" | "twitter" | "facebook" | "email";
export type SocialProfile = { type: SocialType; url: string };

export const works = pgTable("works", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  creationDate: text("creation_date").notNull().default(""),
  description: text("description").notNull().default(""),
  coverImage: jsonb("cover_image").$type<Image | null>(),
  gallery: jsonb("gallery").$type<Image[]>().notNull().default([]),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Work = typeof works.$inferSelect;

export const site = pgTable("site", {
  id: integer("id").primaryKey(),
  siteName: text("site_name").notNull().default("FRED LICH"),
  introText: text("intro_text").notNull().default(""),
  seoTitle: text("seo_title").notNull().default(""),
  seoDescription: text("seo_description").notNull().default(""),
  aboutTitle: text("about_title").notNull().default("About"),
  aboutSubtitle: text("about_subtitle").notNull().default(""),
  aboutPhoto: jsonb("about_photo").$type<Image | null>(),
  aboutBio: text("about_bio").notNull().default(""),
  social: jsonb("social").$type<SocialProfile[]>().notNull().default([]),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Site = typeof site.$inferSelect;

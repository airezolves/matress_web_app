-- 0001_init.sql
-- Initial schema for the Restolex showroom catalogue.
-- Design notes:
--   * Scalar, queryable/filterable fields are stored as dedicated columns.
--   * Semi-structured fields (arrays / nested objects) are stored as JSON text.
--   * SQLite (D1) is the single source of truth for products, categories and inquiries.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS products (
  id                TEXT PRIMARY KEY,
  slug              TEXT NOT NULL UNIQUE,
  name              TEXT NOT NULL,
  brand             TEXT NOT NULL,
  category          TEXT NOT NULL,
  subcategory       TEXT NOT NULL,
  short_description TEXT,
  description       TEXT NOT NULL,
  material          TEXT,
  comfort           TEXT,
  firmness          TEXT,
  thickness         TEXT NOT NULL,
  warranty          TEXT NOT NULL,
  images            TEXT NOT NULL DEFAULT '[]',   -- JSON string[]
  features          TEXT NOT NULL DEFAULT '[]',   -- JSON string[]
  specifications    TEXT NOT NULL DEFAULT '[]',   -- JSON {label,value}[]
  sizes             TEXT NOT NULL DEFAULT '[]',   -- JSON string[]
  tags              TEXT NOT NULL DEFAULT '[]',   -- JSON string[]
  faqs              TEXT NOT NULL DEFAULT '[]',   -- JSON {question,answer}[]
  feature_tiles     TEXT,                          -- JSON object | null
  commercial        TEXT,                          -- JSON object | null
  testimonials      TEXT NOT NULL DEFAULT '[]',   -- JSON {title,quote,author,rating}[]
  sort_order        INTEGER NOT NULL DEFAULT 0,
  is_active         INTEGER NOT NULL DEFAULT 1,
  created_at        TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at        TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);
CREATE INDEX IF NOT EXISTS idx_products_subcategory ON products (subcategory);
CREATE INDEX IF NOT EXISTS idx_products_sort ON products (sort_order);

CREATE TABLE IF NOT EXISTS categories (
  id            TEXT PRIMARY KEY,
  name          TEXT NOT NULL,
  slug          TEXT NOT NULL UNIQUE,
  description   TEXT NOT NULL,
  image         TEXT NOT NULL,
  product_count INTEGER NOT NULL DEFAULT 0,
  sort_order    INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_categories_sort ON categories (sort_order);

CREATE TABLE IF NOT EXISTS inquiries (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL,
  phone           TEXT NOT NULL,
  whatsapp_number TEXT NOT NULL,
  email           TEXT NOT NULL,
  city            TEXT NOT NULL,
  address         TEXT NOT NULL,
  message         TEXT NOT NULL,
  product_ids     TEXT NOT NULL DEFAULT '[]',   -- JSON string[]
  product_names   TEXT NOT NULL DEFAULT '[]',   -- JSON string[] (snapshot at submit time)
  status          TEXT NOT NULL DEFAULT 'new',   -- new | contacted | closed
  created_at      TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries (status);

/**
 * CMS API client for SmartCompany site.
 * Fetches dynamic content from the SmartCompany CMS backend.
 *
 * The CMS_API_URL is read from the VITE_CMS_API_URL env variable.
 * If not set, falls back to a relative path (works when site and CMS are on same domain).
 */

const CMS_API_URL = (import.meta.env.VITE_CMS_API_URL as string) || "";

export interface CmsPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  imageUrl: string | null;
  readTime: string;
  publishedAt: string;
  createdAt: string;
  body?: string;
}

export interface CmsPostFull extends CmsPost {
  body: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface CmsSection {
  id: number;
  sectionKey: string;
  title: string | null;
  content: string | null;
  imageUrl: string | null;
  imagePosition: string | null;
  orderIndex: number;
}

export interface CmsSeo {
  metaTitle: string | null;
  metaDescription: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImageUrl: string | null;
  canonicalUrl: string | null;
}

export interface CmsContact {
  key: string;
  value: string;
}

// ── Posts ──────────────────────────────────────────────────────────────────────

export async function fetchPosts(params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<{
  posts: CmsPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  const qs = new URLSearchParams();
  if (params?.category) qs.set("category", params.category);
  if (params?.search) qs.set("search", params.search);
  if (params?.page) qs.set("page", String(params.page));
  if (params?.limit) qs.set("limit", String(params.limit));

  const url = `${CMS_API_URL}/api/public/posts${qs.toString() ? `?${qs}` : ""}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`CMS API error: ${res.status}`);
  return res.json();
}

export async function fetchPostBySlug(slug: string): Promise<CmsPostFull | null> {
  const url = `${CMS_API_URL}/api/public/posts/${encodeURIComponent(slug)}`;
  const res = await fetch(url);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`CMS API error: ${res.status}`);
  const data = await res.json();
  return data.post ?? null;
}

export async function fetchCategories(): Promise<string[]> {
  const url = `${CMS_API_URL}/api/public/posts/categories`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return data.categories ?? [];
}

// ── Sections ───────────────────────────────────────────────────────────────────

export async function fetchSections(pageSlug: string): Promise<CmsSection[]> {
  const url = `${CMS_API_URL}/api/public/sections/${encodeURIComponent(pageSlug)}`;
  const res = await fetch(url);
  if (!res.ok) return [];
  const data = await res.json();
  return data.sections ?? [];
}

// ── SEO ────────────────────────────────────────────────────────────────────────

export async function fetchSeo(pageSlug: string): Promise<CmsSeo | null> {
  const url = `${CMS_API_URL}/api/public/seo/${encodeURIComponent(pageSlug)}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return data.seo ?? null;
}

// ── Contacts ───────────────────────────────────────────────────────────────────

export async function fetchContacts(): Promise<Record<string, string>> {
  const url = `${CMS_API_URL}/api/public/contacts`;
  const res = await fetch(url);
  if (!res.ok) return {};
  const data = await res.json();
  return data.map ?? {};
}

export type Language = 'en' | 'ar';

export interface Category {
  id: number;
  slug: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  image: string;
}

export interface Product {
  id: number | string;
  slug: string;
  name_en: string;
  name_ar: string;
  latin_name?: string;
  category?: {
    id: number | string;
    slug: string;
    name_en: string;
    name_ar: string;
  };
  short_description_en?: string;
  short_description_ar?: string;
  description_en?: string;
  description_ar?: string;
  form?: string;
  purity?: string;
  moisture?: string;
  origin?: string;
  color?: string;
  packaging?: string;
  shelf_life?: string;
  export_availability?: string;
  certifications?: string[];
  is_featured?: boolean;
  image: string;
  images?: string[];
}

export interface Certificate {
  id: string;
  title_en: string;
  title_ar: string;
  badge: string;
  issuer_en: string;
  issuer_ar: string;
  scope_en: string;
  scope_ar: string;
  validity: string;
  description_en: string;
  description_ar: string;
  accent?: string;
  gold?: string;
  image: string;
  icon?: string;
}

export interface Country {
  _id: string;
  name_en: string;
  name_ar: string;
  code: string;
  region: string;
  flag: string;
  cover?: string;
  display_order?: number;
}

export interface CatalogItem {
  id: string;
  title_en: string;
  title_ar: string;
  version: string;
  pages: string;
  size: string;
  image: string;
  description_en: string;
  description_ar: string;
  file: string;
  highlights?: string[];
}

export interface TeamMember {
  id: number;
  name_en: string;
  name_ar: string;
  position_en: string;
  position_ar: string;
  bio_en: string;
  bio_ar: string;
  image: string;
  email: string;
  phone: string;
  specialty?: string;
}


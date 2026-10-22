export type Spec = { label: string; value: string };

export type StockStatus = "in_stock" | "out_of_stock" | "on_order";

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categoryId: string;
  mrp: number | null;
  price: number | null;
  showPrice: boolean;
  stockStatus: StockStatus;
  shortDesc: string;
  description: string;
  specs: Spec[];
  images: string[];
  isActive: boolean;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  sortOrder: number;
};

export type Tray = {
  title: string;
  isVisible: boolean;
  products: string[];
};

export type Tile = { label: string; categoryId: string; icon: string };

export type Slide = { id: string; eyebrow: string; title: string; text: string; cta: string; href: string };

export type Testimonial = { name: string; text: string; rating: number };

export type Settings = {
  businessName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  serviceArea: string;
  showPrices: boolean;
  stats: { label: string; value: string }[];
  demoNotice: boolean;
};

export type Store = {
  settings: Settings;
  categories: Category[];
  products: Product[];
  trays: Tray[];
  tiles: Tile[];
  slides: Slide[];
  testimonials: Testimonial[];
};

export interface MetaData {
  href: string;
  type: string;
}

export interface NomenclatureItem {
  meta: any;
  id: string;
  accountId: string;
  owner: any;
  shared: boolean;
  group: any;
  updated: Date;
  name: string;
  code: string;
  externalCode: string;
  archived: boolean;
  pathName: string;
  productFolder: { meta: MetaData }; // из этого поля можно получить данные о товаре / категории
  effectiveVat: number;
  effectiveVatEnabled: boolean;
  useParentVat: boolean;
  uom: any; // единицы измерения
  images: { meta: { href: string; size: number } };
  minPrice: { value: number };
  salePrices: { value: number }[];
  buyPrice: { value: number };
  paymentItemType: string;
  discountProhibited: boolean;
  article: string;
  weight: number;
  volume: number;
  variantsCount: number;
  isSerialTrackable: boolean;
  trackingType: string;
  files: any;
  stock: number; // остаток
  reserve: number; // резерв
  inTransit: number; // ожидание
  quantity: number; // доступно
  description?: string;
}

export interface MoyskladFolder {
  meta: MetaData;
  id: string;
  accountId: string;
  owner: any;
  shared: boolean;
  group: any;
  updated: Date;
  name: string;
  externalCode: string;
  archived: boolean;
  pathName: string;
  productFolder?: { meta: MetaData };
  effectiveVat: number;
  effectiveVatEnabled: boolean;
  useParentVat: boolean;
}

export interface MoyskladImage {
  meta: { downloadHref: string; href: string };
  title: string;
  filename: string;
  size: number;
  updated: string;
}

export interface MoyskladResponse {
  context: any;
  meta: any;
  rows: NomenclatureItem[];
}

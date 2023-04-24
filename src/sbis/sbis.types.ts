export interface Attributes {
  [key: string]: string;
}

export interface NomenclatureItem {
  article: string | null;
  attributes: Attributes | null;
  cost: number | null;
  description: string | null;
  externalId: string | null;
  hierarchicalId: number;
  hierarchicalParent: number | null;
  id: number | null;
  images: string | null;
  indexNumber: number;
  isKit: boolean;
  isParent: boolean | null;
  modifiers: any[];
  name: string;
  nomNumber: string | null;
  published: boolean;
  short_code: number | null;
  unit: string | null;
}

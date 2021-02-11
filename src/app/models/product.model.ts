export interface RangeInfo {
  id: string;
  hikeID: string;
  name: string;
}

export interface DesignInfo {
  id: string;
  hikeID: string;
  name: string;
  range: string;
}

export interface StockInfo {
  onHand: number;
  committed: number;
  available: number;
}

export interface PriceInfo {
  inclVAT: number;
  exclVAT: number;
}

export interface CategoryInfo {
  id: string;
  hikeID?: string;
  name: string;
  parentID?: string;
  alias?: string;
}

export interface Product {
  id: string;
  hikeID: string;
  name: string;
  description: string;
  range: RangeInfo;
  design: DesignInfo;
  type: CategoryInfo;
  categories: CategoryInfo[];
  hasVariants: boolean;
  active: boolean;
  stockLevels: {
    HO: StockInfo;
    MR?: StockInfo;
    WS?: StockInfo;
  };
  priceInfo: {
    retail: PriceInfo;
    wholesale?: PriceInfo;
    sale?: PriceInfo;
  };
  rating?: number;
}

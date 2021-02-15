import { Product } from './product.model';

export enum PriceType {
  RETAIL,
  WHOLESALE_EXCL_VAT,
  WHOLESALE_INCL_VAT,
  SALE,
}

export interface IFilter {
  check: (product: Product) => boolean;
}

export class CategoryFilter implements IFilter {
  constructor(public categoryIDs: string[]) {}

  check(product: Product): boolean {
    if (this.categoryIDs.length == 0) {
      return true;
    } else {
      const idsToCheck = product.categories.map((m) => m.id);

      for (const id of idsToCheck) {
        if (this.categoryIDs.indexOf(id) >= 0) {
          return true;
        }
      }
      return false;
    }
  }
}

export class RangeFilter implements IFilter {
  constructor(public rangeIDs: string[]) {}

  check(product: Product): boolean {
    if (this.rangeIDs.length == 0) {
      return true;
    } else {
      return this.rangeIDs.indexOf(product.range.id) >= 0;
    }
  }
}

export class DesignFilter implements IFilter {
  constructor(public designIDs: string[]) {}

  check(product: Product): boolean {
    if (this.designIDs.length == 0) {
      return true;
    } else {
      return this.designIDs.indexOf(product.design.id) >= 0;
    }
  }
}

export class PriceFilter implements IFilter {
  constructor(
    public min?: number,
    public max?: number,
    public priceType: PriceType = PriceType.RETAIL
  ) {}

  check(product: Product): boolean {
    let price: number | undefined;

    switch (this.priceType) {
      case PriceType.SALE:
        price = product.priceInfo.sale?.inclVAT;
        break;
      case PriceType.WHOLESALE_INCL_VAT:
        price = product.priceInfo.wholesale?.inclVAT;
        break;
      case PriceType.WHOLESALE_EXCL_VAT:
        price = product.priceInfo.wholesale?.exclVAT;
        break;
      default:
        price = product.priceInfo.retail.inclVAT;
        break;
    }

    if (!price) {
      return false;
    } else {
      if (this.min && this.max) {
        return price >= this.min && price <= this.max;
      } else if (this.min) {
        return price >= this.min;
      } else if (this.max) {
        return price <= this.max;
      } else {
        return true;
      }
    }
  }
}

export class SaleFilter implements IFilter {
  constructor(public onSale: boolean = false) {}

  check(product: Product): boolean {
    const hasSalePrice = !!product.priceInfo.sale;
    if (this.onSale) {
      return hasSalePrice;
    } else {
      return true;
    }
  }
}

export class WholesaleFilter implements IFilter {
  constructor(public on: boolean = false) {}

  check(product: Product): boolean {
    if (this.on) {
      return !!product.priceInfo.wholesale;
    } else {
      return true;
    }
  }
}

type filterObject = {
  categoryFilter: CategoryFilter;
  rangeFilter: RangeFilter;
  designFilter: DesignFilter;
  priceFilter: PriceFilter;
  saleFilter: SaleFilter;
  wholesaleFilter: WholesaleFilter;
};

export class ProductFilter {
  get hasFilters() {
    return (
      this.categoryFilter.categoryIDs.length > 0 ||
      this.rangeFilter.rangeIDs.length > 0 ||
      this.designFilter.designIDs.length > 0 ||
      this.priceFilter.max != undefined ||
      this.priceFilter.min != undefined ||
      this.saleFilter.onSale ||
      this.wholesaleFilter.on
    );
  }

  get hasClearableFilter() {
    return (
      this.categoryFilter.categoryIDs.length > 0 ||
      this.rangeFilter.rangeIDs.length > 0 ||
      this.designFilter.designIDs.length > 0 ||
      this.priceFilter.max != undefined ||
      this.priceFilter.min != undefined ||
      this.saleFilter.onSale
    );
  }

  constructor(
    public categoryFilter: CategoryFilter,
    public rangeFilter: RangeFilter,
    public designFilter: DesignFilter,
    public priceFilter: PriceFilter,
    public saleFilter: SaleFilter,
    public wholesaleFilter: WholesaleFilter
  ) {}

  static fromObject(obj: filterObject): ProductFilter {
    return new ProductFilter(
      obj.categoryFilter,
      obj.rangeFilter,
      obj.designFilter,
      obj.priceFilter,
      obj.saleFilter,
      obj.wholesaleFilter
    );
  }

  static noFilter(): ProductFilter {
    return new ProductFilter(
      new CategoryFilter([]),
      new RangeFilter([]),
      new DesignFilter([]),
      new PriceFilter(),
      new SaleFilter(),
      new WholesaleFilter()
    );
  }

  check(product: Product): boolean {
    return (
      this.categoryFilter.check(product) &&
      this.rangeFilter.check(product) &&
      this.designFilter.check(product) &&
      this.priceFilter.check(product) &&
      this.saleFilter.check(product) &&
      this.wholesaleFilter.check(product)
    );
  }
}

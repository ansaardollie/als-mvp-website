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
    const idsToCheck = product.categories.map(m => m.id);

    for (const id of idsToCheck){
      if (this.categoryIDs.indexOf(id) >= 0){
        return true;
      }
    }
    return false;
  }

}

export class RangeFilter implements IFilter {

  constructor(public rangeIDs: string[]) {}

  check(product: Product): boolean {
    return this.rangeIDs.indexOf(product.range.id) >= 0;
  }

}

export class DesignFilter implements IFilter {

  constructor(public designIDs: string[]) {}

  check(product: Product): boolean {
    return this.designIDs.indexOf(product.design.id) >= 0;
  }
}

export class PriceFilter implements IFilter {

  constructor(public min?: number, public max?: number, public priceType: PriceType = PriceType.RETAIL){}

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
        return false;
      }
    }
  }
}

export class SaleFilter implements IFilter {

  check(product: Product): boolean {
    return !!product.priceInfo.sale;
  }

}

export class ProductFilter {

  get hasFilters() {
    return this.filters.length > 0;
  }

  get categoryFilter() {
    const filter = this.filters.find((f) => f instanceof CategoryFilter);
    if (filter) {
      return filter as CategoryFilter;
    } else {
      return null;
    }
  }

  get designFilter() {
    const filter = this.filters.find((f) => f instanceof DesignFilter);
    if (filter) {
      return filter as DesignFilter;
    } else {
      return null;
    }
  }

  get rangeFilter() {
    const filter = this.filters.find((f) => f instanceof RangeFilter);
    if (filter) {
      return filter as RangeFilter;
    } else {
      return null;
    }
  }

  get PriceFilter() {
    const filter = this.filters.find((f) => f instanceof PriceFilter);
    if (filter) {
      return filter as PriceFilter;
    } else {
      return null;
    }
  }

  get SaleFilter() {
    const filter = this.filters.find((f) => f instanceof SaleFilter);
    if (filter) {
      return filter as SaleFilter;
    } else {
      return null;
    }
  }


  constructor(public filters: IFilter[]){}

  check(product: Product): boolean {
    for (const filter of this.filters){
      if (!filter.check(product)) {
        return false;
      }
    }
    return true;
  }

}

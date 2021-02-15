import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { NguiInviewModule } from '@ngui/common';
import * as Cloudinary from 'cloudinary-core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';

import { ButtonDirective } from './button.directive';
import {
  ProductCatalogueInfobarComponent,
} from './components/product-catalogue-infobar/product-catalogue-infobar.component';
import { ProductFilterInfoComponent } from './components/product-filter-info/product-filter-info.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { MyCurrencyPipe } from './my-currency.pipe';

// import { LazyLoadDirective } from './lazy-load.directive';

const sharedItems: any[] = [
  MenubarModule,
  ReactiveFormsModule,
  DialogModule,
  LayoutModule,
  InputTextModule,
  NguiInviewModule,
  ButtonModule,
  CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'als-trial-webstore' }),
  CarouselModule,
  PanelMenuModule,
  SidebarModule,
  SkeletonModule,
  PanelModule,
  MultiSelectModule,
  FormsModule,
  ScrollTopModule,
  CheckboxModule,
  ChipModule,
  HttpClientModule,
  InputNumberModule,
  SelectButtonModule,
];

@NgModule({
  declarations: [
    // LazyLoadDirective,
    ProductCatalogueInfobarComponent,
    ProductFilterInfoComponent,
    ButtonDirective,
    MyCurrencyPipe,
    ProductFilterComponent,
  ],
  imports: [...sharedItems],
  exports: [
    ...sharedItems,
    ProductFilterInfoComponent,
    ButtonDirective,
    MyCurrencyPipe,
    ProductFilterComponent,
    ProductCatalogueInfobarComponent,
    // LazyLoadDirective
  ],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'shop',
    loadChildren: () => {
      //prettier-ignore
      return import('./shop/shop.module').then(m => m.ShopModule);
    },
  },
  {
    path: 'user',
    loadChildren: () => {
      //prettier-ignore
      return import('./user/user.module').then(m => m.UserModule);
    },
  },
  {
    path: 'wholesale',
    loadChildren: () => {
      //prettier-ignore
      return import('./wholesale/wholesale.module').then(
        m => m.WholesaleModule
      );
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

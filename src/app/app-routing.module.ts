import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'shop',
    loadChildren: () => {
      return import('./shop/shop.module').then((m) => m.ShopModule);
    },
  },
  {
    path: 'user',
    loadChildren: () => {
      return import('./user/user.module').then((m) => m.UserModule);
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

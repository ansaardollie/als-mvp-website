// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  cloudinary: {
    productCardImageUrl:
      'https://res.cloudinary.com/als-trial-webstore/image/upload/t_product-card/products',
    categoryCardImageUrl:
      'https://res.cloudinary.com/als-trial-webstore/image/upload/t_category_card/categories',
    designCardImageUrl:
      'https://res.cloudinary.com/als-trial-webstore/image/upload/t_designV1/designs',
    productGalleryImageUrl:
      'https://res.cloudinary.com/als-trial-webstore/image/upload/t_gallery-image',
    lifestyleImagesUrl:
      'https://res.cloudinary.com/als-trial-webstore/image/list',
    galleryThumbnailImageUrl:
      'https://res.cloudinary.com/als-trial-webstore/image/upload/t_gallery-thumbnail',
    loginPageImageUrl:
      'https://res.cloudinary.com/als-trial-webstore/image/upload/s--ofx-iBVq--/c_fit,h_1000,w_1160/v1613003991/lifestyle/LSP-000243.jpg',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">als-website documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-4474b834d4d9fb07e830434a1d064b21"' : 'data-target="#xs-components-links-module-AppModule-4474b834d4d9fb07e830434a1d064b21"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-4474b834d4d9fb07e830434a1d064b21"' :
                                            'id="xs-components-links-module-AppModule-4474b834d4d9fb07e830434a1d064b21"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CartOverlayComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CartOverlayComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link">HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-aa688bacbf6761f425272e043e9cec4b"' : 'data-target="#xs-components-links-module-HomeModule-aa688bacbf6761f425272e043e9cec4b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-aa688bacbf6761f425272e043e9cec4b"' :
                                            'id="xs-components-links-module-HomeModule-aa688bacbf6761f425272e043e9cec4b"' }>
                                            <li class="link">
                                                <a href="components/CommunityComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CommunityComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LandingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LandingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RangesShowcaseComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RangesShowcaseComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StoryComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">StoryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SubscribeComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SubscribeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link">SharedModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-SharedModule-6e29484a17afe1eb23b8cbfecec6101e"' : 'data-target="#xs-directives-links-module-SharedModule-6e29484a17afe1eb23b8cbfecec6101e"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-SharedModule-6e29484a17afe1eb23b8cbfecec6101e"' :
                                        'id="xs-directives-links-module-SharedModule-6e29484a17afe1eb23b8cbfecec6101e"' }>
                                        <li class="link">
                                            <a href="directives/ButtonDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">ButtonDirective</a>
                                        </li>
                                    </ul>
                                </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-SharedModule-6e29484a17afe1eb23b8cbfecec6101e"' : 'data-target="#xs-pipes-links-module-SharedModule-6e29484a17afe1eb23b8cbfecec6101e"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-6e29484a17afe1eb23b8cbfecec6101e"' :
                                            'id="xs-pipes-links-module-SharedModule-6e29484a17afe1eb23b8cbfecec6101e"' }>
                                            <li class="link">
                                                <a href="pipes/MyCurrencyPipe.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyCurrencyPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ShopModule.html" data-type="entity-link">ShopModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ShopModule-1d260a405af17e37c188cd749861ac36"' : 'data-target="#xs-components-links-module-ShopModule-1d260a405af17e37c188cd749861ac36"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ShopModule-1d260a405af17e37c188cd749861ac36"' :
                                            'id="xs-components-links-module-ShopModule-1d260a405af17e37c188cd749861ac36"' }>
                                            <li class="link">
                                                <a href="components/CategoryCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoryCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CategoryCatalogueComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CategoryCatalogueComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DesignCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DesignCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductBreadcrumbsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductBreadcrumbsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductCardComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductCatalogueComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductCatalogueComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductSkeletonComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProductSkeletonComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RangeCatalogueComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RangeCatalogueComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RangeDesignCatalogueComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RangeDesignCatalogueComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ShopComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ShopComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ShopRoutingModule.html" data-type="entity-link">ShopRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link">UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UserModule-8a7e92a11b272d217d2c423dc8b0c642"' : 'data-target="#xs-components-links-module-UserModule-8a7e92a11b272d217d2c423dc8b0c642"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UserModule-8a7e92a11b272d217d2c423dc8b0c642"' :
                                            'id="xs-components-links-module-UserModule-8a7e92a11b272d217d2c423dc8b0c642"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserRoutingModule.html" data-type="entity-link">UserRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/WholesaleModule.html" data-type="entity-link">WholesaleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-WholesaleModule-e5f08019fc23efc9a69d914e25bb44a8"' : 'data-target="#xs-components-links-module-WholesaleModule-e5f08019fc23efc9a69d914e25bb44a8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-WholesaleModule-e5f08019fc23efc9a69d914e25bb44a8"' :
                                            'id="xs-components-links-module-WholesaleModule-e5f08019fc23efc9a69d914e25bb44a8"' }>
                                            <li class="link">
                                                <a href="components/OrderFormComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderFormComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderFormPageComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderFormPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/OrderFormProductComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">OrderFormProductComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/WholesaleLandingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">WholesaleLandingComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/WholesaleRoutingModule.html" data-type="entity-link">WholesaleRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/ProductCatalogueInfobarComponent.html" data-type="entity-link">ProductCatalogueInfobarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductCatalogueInfobarComponent-1.html" data-type="entity-link">ProductCatalogueInfobarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductFilterComponent.html" data-type="entity-link">ProductFilterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductFilterComponent-1.html" data-type="entity-link">ProductFilterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductFilterInfoComponent.html" data-type="entity-link">ProductFilterInfoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductFilterInfoComponent-1.html" data-type="entity-link">ProductFilterInfoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductImageGalleryComponent.html" data-type="entity-link">ProductImageGalleryComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ProductImageGalleryComponent-1.html" data-type="entity-link">ProductImageGalleryComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/CategoryFilter.html" data-type="entity-link">CategoryFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/DesignFilter.html" data-type="entity-link">DesignFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/PriceFilter.html" data-type="entity-link">PriceFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProductFilter.html" data-type="entity-link">ProductFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/RangeFilter.html" data-type="entity-link">RangeFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/SaleFilter.html" data-type="entity-link">SaleFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/WholesaleFilter.html" data-type="entity-link">WholesaleFilter</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CategoryService.html" data-type="entity-link">CategoryService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DesignService.html" data-type="entity-link">DesignService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilterService.html" data-type="entity-link">FilterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LayoutService.html" data-type="entity-link">LayoutService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProductService.html" data-type="entity-link">ProductService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RangeService.html" data-type="entity-link">RangeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/CategoryResolverService.html" data-type="entity-link">CategoryResolverService</a>
                            </li>
                            <li class="link">
                                <a href="guards/DesignResolverService.html" data-type="entity-link">DesignResolverService</a>
                            </li>
                            <li class="link">
                                <a href="guards/RangeResolverService.html" data-type="entity-link">RangeResolverService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AssetList.html" data-type="entity-link">AssetList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Cart.html" data-type="entity-link">Cart</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategoryInfo.html" data-type="entity-link">CategoryInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CategorySortedProductList.html" data-type="entity-link">CategorySortedProductList</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CatInfo.html" data-type="entity-link">CatInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CatInfo-1.html" data-type="entity-link">CatInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CloudinaryResource.html" data-type="entity-link">CloudinaryResource</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Database.html" data-type="entity-link">Database</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DesignInfo.html" data-type="entity-link">DesignInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFilter.html" data-type="entity-link">IFilter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PriceInfo.html" data-type="entity-link">PriceInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PriceType.html" data-type="entity-link">PriceType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PriceType-1.html" data-type="entity-link">PriceType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Product.html" data-type="entity-link">Product</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RangeInfo.html" data-type="entity-link">RangeInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RangePanelInfo.html" data-type="entity-link">RangePanelInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ScreenSize.html" data-type="entity-link">ScreenSize</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StockInfo.html" data-type="entity-link">StockInfo</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserInfo.html" data-type="entity-link">UserInfo</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
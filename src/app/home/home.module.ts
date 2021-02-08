import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { CommunityComponent } from './community/community.component';
import { HomeComponent } from './home.component';
import { LandingComponent } from './landing/landing.component';
import { RangesShowcaseComponent } from './ranges-showcase/ranges-showcase.component';
import { StoryComponent } from './story/story.component';
import { SubscribeComponent } from './subscribe/subscribe.component';


const routes = [
  {
    path: 'home',
    component: HomeComponent
  }
];


@NgModule({
  declarations: [
    LandingComponent,
    StoryComponent,
    RangesShowcaseComponent,
    HomeComponent,
    CommunityComponent,
    SubscribeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    HomeComponent,
    RouterModule,
  ]
})
export class HomeModule { }

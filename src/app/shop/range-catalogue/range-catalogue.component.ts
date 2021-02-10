import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-range-catalogue',
  templateUrl: './range-catalogue.component.html',
  styleUrls: ['./range-catalogue.component.scss'],
})
export class RangeCatalogueComponent implements OnInit {
  rangesWithPhotos: string[] = [];
  designsWithPhotos: string[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      console.log(data);
      this.rangesWithPhotos = data.ranges;
      this.designsWithPhotos = data.designs;
    });
  }

  designsFromRange(id: string) {
    return this.designsWithPhotos.filter((designID) => {
      const rangeID = designID.split('-')[0];
      return rangeID == id;
    });
  }
}

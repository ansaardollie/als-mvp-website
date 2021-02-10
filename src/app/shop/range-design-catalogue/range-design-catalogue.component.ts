import { Component, Input, OnInit } from '@angular/core';
import { DesignService } from 'src/app/services/design.service';

import { RangeService } from './../../services/range.service';

@Component({
  selector: 'app-range-design-catalogue',
  templateUrl: './range-design-catalogue.component.html',
  styleUrls: ['./range-design-catalogue.component.scss'],
})
export class RangeDesignCatalogueComponent implements OnInit {
  @Input() rangeID!: string;
  @Input() designIDs!: string[];

  constructor(private rs: RangeService, private ds: DesignService) {}

  ngOnInit(): void {}

  get rangeName() {
    return this.rs.getNameByID(this.rangeID);
  }

  getDesignName(id: string) {
    let name = this.ds.getNameByID(id);
    if (name.indexOf('(') >= 0) {
      const newName = name.replace(' (', '\n(');
      return newName;
    } else {
      return name;
    }
  }
}

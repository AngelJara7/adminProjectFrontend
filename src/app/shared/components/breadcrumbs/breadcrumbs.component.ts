import { Component, Input } from '@angular/core';
import { Breadcrumbs } from '../../interfaces';

@Component({
  selector: 'shared-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class SharedBreadcrumbsComponent {

  @Input() crumbs: Breadcrumbs[] = [];

}

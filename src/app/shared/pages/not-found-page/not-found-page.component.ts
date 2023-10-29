import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'auth-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent implements OnInit {

  public activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    console.log('ERROR: ', this.activatedRoute.snapshot.params['error']);
  }

}

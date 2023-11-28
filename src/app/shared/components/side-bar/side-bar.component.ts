import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Project } from 'src/app/dashboard/models/project.model';
import { ProjectService } from 'src/app/shared/services/project.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shared-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnDestroy {

  private projectService = inject(ProjectService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public subscription$: Subscription;
  public project: Project | undefined;
  public nombre: string = '';

  constructor() {

    this.subscription$ = this.activatedRoute.parent!.params.subscribe(
      params => {
        this.nombre = params['nombre'];

        this.projectService.getProject(this.nombre)
          .subscribe({
            next: res => {
              console.log({res});
              this.project = res;
            },
            error: () => {
              this,this.router.navigateByUrl('/dashboard/projects');
            }
          });
      }
    );
  }

  ngOnDestroy(): void {
      this.subscription$.unsubscribe();
  }

}

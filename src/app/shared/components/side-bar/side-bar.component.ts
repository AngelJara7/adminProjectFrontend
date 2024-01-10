import { Component, inject } from '@angular/core';

import { ProjectService } from 'src/app/shared/services/project.service';
import { Project } from '../../models';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'shared-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SharedSideBarComponent {

  private activatedRoute = inject(ActivatedRoute);
  private projectService = inject(ProjectService);

  public subscription$: Subscription | undefined;
  public project: Project | undefined;

  constructor() {
    this.subscription$ = this.activatedRoute.parent!.params.subscribe(
      params => this.loadProject(params['id'])
    );

  }

  loadProject(id: string) {
    if (!id) return;

    this.projectService.getProject(id)
      .subscribe({
        next: res => this.project = res,
      });
  }

}

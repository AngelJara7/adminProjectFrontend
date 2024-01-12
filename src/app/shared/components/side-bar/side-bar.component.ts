import { Component, inject } from '@angular/core';

import { ProjectService } from 'src/app/shared/services/project.service';
import { Project } from '../../models';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'shared-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SharedSideBarComponent {

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private socketService = inject(SocketService);

  public subscription$: Subscription | undefined;
  public project: Project | undefined;
  public id: string = '';

  constructor() {
    this.subscription$ = this.activatedRoute.parent!.params.subscribe(
      params => {
        this.id = params['id'];
        this.loadProject();
      }
    );

    this.socketService.io.on('edited contributors', () => {
      this.loadProject();
    });

  }

  loadProject() {
    if (!this.id) return;

    this.projectService.getProject(this.id)
      .subscribe({
        next: res => this.project = res,
        error: () => this.router.navigateByUrl('/dashboard/projects'),
      });
  }

}

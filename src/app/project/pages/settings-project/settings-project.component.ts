import { Component, OnDestroy, Output, inject } from '@angular/core';
import { ProjectService } from '../../../shared/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/shared/models';

@Component({
  selector: 'app-settings-project',
  templateUrl: './settings-project.component.html',
  styleUrls: ['./settings-project.component.css']
})
export class SettingsProjectComponent implements OnDestroy {

  private activatedRoute = inject(ActivatedRoute);
  private projectService = inject(ProjectService);

  public subcription$: Subscription;
  public project: Project | undefined;
  public nombre: string = '';


  constructor() {
    this.subcription$ = this.activatedRoute.parent!.params.subscribe(
      params => {
        this.nombre = params['nombre'];
        this.loadProject();
      }
    );
  }

  loadProject() {

    this.projectService.getProject(this.nombre)
      .subscribe({
        next: res => this.project = res,
      });
  }

  ngOnDestroy(): void {
    this.subcription$.unsubscribe();
  }
}

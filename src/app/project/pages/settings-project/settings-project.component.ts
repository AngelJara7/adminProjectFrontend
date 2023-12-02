import { Component, OnDestroy, Output, inject } from '@angular/core';
import { ProjectService } from '../../../shared/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../../shared/models/project.model';
import { Subscription } from 'rxjs';

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

        this.projectService.getProject(this.nombre)
          .subscribe({
            next: res => {
              console.log({res});
              this.project = res;
            },
            error: error => {
              console.log({error});
            }
          });
      }
    );
  }

  ngOnDestroy(): void {
    this.subcription$.unsubscribe();
  }
}

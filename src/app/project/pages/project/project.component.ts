import { Component, OnDestroy, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectService } from '../../../shared/services/project.service';
import { Project } from 'src/app/dashboard/models/project.model';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/interfaces';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnDestroy {

  private activatedRoute = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private userService = inject(AuthService);

  public subcription$: Subscription;
  public project: Project | undefined;
  public nombre: string = '';
  public user = signal<User|null>(null);
  public imgUser: string = '';

  constructor() {

    this.user.set(this.userService.currentUser());

    !this.user()?.foto
    ? this.imgUser = '../../../../assets/img/user_circle.svg'
    : this.imgUser = `http://localhost:4000/${this.user()?.foto}`;

    this.subcription$ = this.activatedRoute.parent!.params.subscribe(
      params => {
        this.nombre = params['nombre'];

        this.projectService.getProject(this.nombre)
          .subscribe({
            next: res => {
              this.project = res;
              console.log('PROJECT',this.project);
            },
            error: error => {
              // console.log({error});
            }
          });
      }
    );

  }

  ngOnDestroy(): void {
    this.subcription$.unsubscribe();
  }

  setProjectBySearch(task: string) {
    console.log(task);
  }

}

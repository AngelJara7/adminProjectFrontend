import { Component, OnDestroy, Output, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProjectService } from '../../../shared/services/project.service';
import { Project } from 'src/app/shared/models/project.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/auth/interfaces';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SocketService } from '../../../shared/services/socket.service';
import { Breadcrumbs } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnDestroy {

  private activatedRoute = inject(ActivatedRoute);
  private modalService = inject(ModalService);
  private socketService = inject(SocketService);
  private projectService = inject(ProjectService);
  private userService = inject(AuthService);

  public subscription$: Subscription;
  public project: Project | undefined;
  public nombre: string = '';
  public user = signal<User|null>(null);
  public imgUser: string = '';

  public initialValue: string = '';

  @Output() breadcrumbs: Breadcrumbs[] = [];

  constructor() {

    this.user.set(this.userService.currentUser());

    !this.user()?.foto
    ? this.imgUser = '../../../../assets/img/user_circle.svg'
    : this.imgUser = `http://localhost:4000/${this.user()?.foto}`;

    this.subscription$ = this.activatedRoute.parent!.params.subscribe(
      params => {
        this.nombre = params['nombre'];

        this.loadProject();
      }
    );

    this.socketService.io.on('edited contributors', () => {
      this.loadProject();
    });

  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
    this.modalService.modalAddCollaboratorStatus = false;
    this.modalService.modalAlertStatus = false;
  }

  loadProject() {
    this.projectService.getProject(this.nombre)
      .subscribe({
        next: res => {
          this.project = res;

          this.breadcrumbs = [
            { link: '../../projects', title: 'Proyectos' },
            { link: '../board', title: this.project!.nombre }
          ];
        }
      });
  }

  searchTask(task: string) {
    console.log(task);
  }

  setProfileCollaborator(photo?: string): string {
    return photo ? `http://localhost:4000/${photo}` : '../../../../assets/img/user_circle.svg';
  }

  viewModalAddCollaborator() {
    this.modalService.modalAddCollaboratorStatus = true;
  }

}

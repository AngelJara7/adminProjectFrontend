import { Component, OnDestroy, OnInit, Output, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription, debounceTime } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { ProjectService } from '../../../shared/services/project.service';
import { ModalService } from '../../../shared/services/modal.service';
import { SocketService } from '../../../shared/services/socket.service';
import { Project } from '../../models/project.model';
import { ModalAlert, ModalAlertType } from '../../interfaces';

@Component({
  selector: 'dashboard-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {

  private projectService = inject(ProjectService);
  private socket = inject(SocketService);
  private userService = inject(AuthService);
  private router = inject(Router);

  public modalService = inject(ModalService);

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription: Subscription;

  public projects: Project[] = [];
  public viewModal: boolean = false;
  public loadingProjects: boolean = false;
  public currentUser = computed(() => this.userService.currentUser());

  @Output() modalAlert: ModalAlert | undefined;

  constructor() {
    this.getProjects('');

    if (this.currentUser()?._id) this.socket.loadProjects(this.currentUser()!._id);

    this.socket.io.on('edited project', () => this.getProjects(''));

    this.debouncerSuscription = this.debouncer
      .pipe( debounceTime(500) )
      .subscribe( value => this.searchProject(value) );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.debouncerSuscription.unsubscribe();
  }

  getProjects(project: string) {
    this.loadingProjects = true;

    this.projectService.getProjects(project)
      .subscribe({
        next: resp => this.projects = resp,
        error: () => this.loadingProjects = false,
        complete: () => this.loadingProjects = false
      });
  }

  setProjectBySearch(inputValue: string) {
    this.debouncer.next(inputValue);
  }

  searchProject(project: string) {
    this.getProjects(project);
  }

  setAlert(project: string) {
    this.modalAlert = {
      type: ModalAlertType.project,
      title: 'Eliminar Proyecto',
      message: `Todas la tareas vinculadas a este proyecto serán eliminadas junto con el mismo de forma permanente. ¿Desea eliminar el proyecto '${project}'?`
    };
  }

  viewModalProjectForm() {
    this.modalService.modalProjectFormStatus = true;
  }

  viewModalAlert(project: Project) {
    this.setAlert(project.nombre);
    this.modalService.id.emit(project._id);
    this.modalService.modalAlertStatus = true;
  }

  navigateProject(project: Project) {
    this.router.navigateByUrl(`/dashboard/project/${project.nombre}/tablero`);
  }

  navigateUserProfile(id: string) {
    this.router.navigateByUrl(`/dashboard/user/${id}`);
  }

}

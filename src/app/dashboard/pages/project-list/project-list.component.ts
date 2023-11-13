import { Component, OnInit, computed, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { ModalService } from '../../services/modal.service';
import { SocketService } from '../../services/socket.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent {

  private projectService = inject(ProjectService);
  private modalService = inject(ModalService);
  private socket = inject(SocketService);
  private userService = inject(AuthService);
  private router = inject(Router);

  public projects: Project[] = [];
  public viewModal: boolean = false;
  public loadingProjects: boolean = false;
  public currentUser = computed(() => this.userService.currentUser());

  constructor() {
    this.getProjects();
    this.loadingProjects = true;

    this.socket.io.on('project created', () => {
      this.getProjects();
    });

    if (this.currentUser()?._id) {
      this.socket.loadProjects(this.currentUser()!._id);
    }
  }

  getProjects() {
    this.projectService.getProjects()
      .subscribe({
        next: resp => {
          this.projects = resp;
          this.loadingProjects = false;
        },
        error: (error) => {
          console.log('Algo salio mal', error);
          this.loadingProjects = false;
        },
      });
  }

  viewModalProjectForm() {
    this.modalService.modalProjectFormStatus = true;
  }

  navigateUserProfile(id: string) {
    this.router.navigateByUrl(`/dashboard/user/${id}`);
  }

}

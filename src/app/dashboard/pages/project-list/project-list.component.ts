import { Component, OnInit, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'dashboard-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  private projectService = inject(ProjectService);
  private modalService = inject(ModalService);

  public projects: Project[] = [];
  public viewModal: boolean = false;

  ngOnInit(): void {
    this.projectService.getProjects()
      .subscribe({
        next: resp => this.projects = resp,
        error: (error) => {
          console.log('Algo salio mal', error);
        }
      });
  }

  viewModalProjectForm() {
    // console.log('VALOR INCIAL', this.modalService.modalStatus);
    this.modalService.viewModal();
    // console.log('CAMBIADO', this.modalService.modalStatus);
  }

}

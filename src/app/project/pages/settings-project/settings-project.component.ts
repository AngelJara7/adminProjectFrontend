import { AfterViewInit, Component, OnDestroy, Output, inject } from '@angular/core';
import { ProjectService } from '../../../shared/services/project.service';

import { AlertStatus, Breadcrumbs } from 'src/app/shared/interfaces';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/shared/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/services/validators.service';
import { ModalService } from 'src/app/shared/services/modal.service';
import { SocketService } from 'src/app/shared/services/socket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings-project',
  templateUrl: './settings-project.component.html',
  styleUrls: ['./settings-project.component.css']
})
export class SettingsProjectComponent implements OnDestroy {

  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private socketService = inject(SocketService);
  private activatedRoute = inject(ActivatedRoute);
  private modalService = inject(ModalService);

  public projectService = inject(ProjectService);

  public subscription$: Subscription;
  public project: Project | undefined;
  public nombre: string = '';
  public isLoading: boolean = false;

  public projectForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    clave: ['', [Validators.required], [this.validatorsService]],
    creacion: ['', Validators.required],
    usuario: ['', Validators.required],
  });

  @Output() breadcrumbs: Breadcrumbs[] = [];
  // TODO: colocar formulario en contenedor para centrar y agregar scroll
  constructor() {
    this.subscription$ = this.activatedRoute.parent!.params.subscribe(
      params => {
        this.nombre = params['id']
        this.loadProject();
      }
    );

    this.activatedRoute.paramMap.subscribe()

    this.projectForm.get('creacion')?.disable();

    this.socketService.io.on('edited contributors', () => {
      this.loadProject();
    });
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  loadProject() {
    this.projectService.getProject(this.nombre)
      .subscribe({
        next: res => {
          this.project = res;
          this.project.creacion = this.formatDate(res.creacion);
          this.projectForm.reset(this.project);

          this.breadcrumbs = [
            { link: '/dashboard/projects', title: 'Proyectos' },
            { link: '../board', title: this.project!.nombre },
            { link: '../settings', title: 'Configuración del proyecto' }
          ];
        },
      });

  }

  formatDate(dateFormat: Date | string) {

    const date = new Date(dateFormat);

    return date.getFullYear() + '-' +
      ('0' + (date.getMonth() + 1)).substr(-2) + '-' +
      ('0' + date.getUTCDate()).substr(-2);
  }

  setPhotoUser(photo?: string) {
    return photo
      ? `${environment.base_url}/${photo}`
      : environment.path_no_img;
  }


  isValidField(field: string) {
    return this.projectForm.controls[field].errors && this.projectForm.controls[field].touched;
  }

  getErrorField(field: string) {
   return this.validatorsService.getErrorField(this.projectForm, field);
  }

  updateProject() {
    if (!this.project) return;
    this.isLoading = true;

    this.projectService.updateProject(this.projectForm.value, this.project?._id)
      .subscribe({
        next: res => {
          this.isLoading = false;
          this.socketService.editingCollaborators();
          this.modalService.toastNotification.emit({
            title: res,
            status: AlertStatus.success
          });
          console.log(res);
        },
        error: error => {
          this.isLoading = false;
          this.modalService.toastNotification.emit({
            title: 'Se ha producido un error',
            message: error,
            status: AlertStatus.error
          });
          console.log(error);
        }
      });
  }
}

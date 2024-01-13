import { Component, Input, OnDestroy, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, debounceTime } from 'rxjs';

import { ModalService } from '../../services/modal.service';
import { AlertStatus } from '../../interfaces';
import { SocketService } from '../../services/socket.service';
import { ValidatorsService } from '../../services/validators.service';
import { Project, User } from '../../models';
import { CollaboratorService } from '../../services/collaborator.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'shared-modal-add-collaborator',
  templateUrl: './modal-add-collaborator.component.html',
  styleUrls: ['./modal-add-collaborator.component.css']
})
export class SharedModalAddCollaboratorComponent implements OnDestroy {

  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private collaboratorService = inject(CollaboratorService);
  private socketService = inject(SocketService);

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  public modalService = inject(ModalService);

  public users: User[] = [];
  public isLoading: boolean = false;
  public rols = ['Administrador', 'Colaborador'];
  public collaboratorForm!: FormGroup;

  @Input() project: Project | undefined;

  constructor() {
    this.loadCollaboratorForm();

    this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime(500),
      )
      .subscribe(value => this.searchUser(value)
      );
  }
  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  loadCollaboratorForm() {
    this.collaboratorForm = this.fb.group({
      proyecto: ['', Validators.required],
      usuario: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
      rol: ['Administrador', Validators.required]
    });
  }

  onKeyPress(field: string) {
    this.debouncer.next(
      this.collaboratorForm.controls[field].value
    );
  }

  searchUser(email: string) {

    if (email === '') {
      this.users = [];
      return;
    }

    this.collaboratorService.searchCollaborator(email)
      .subscribe({
        next: res => this.users = res
      });
  }

  userSelected(user: User) {
    this.collaboratorForm.controls['proyecto'].setValue(this.project?._id);
    this.collaboratorForm.controls['usuario'].setValue(user.email);
    this.users = [];
  }

  setPhotoUser(photo?: string) {
    return photo
      ? `${environment.base_url}/${photo}`
      : environment.path_no_img;
  }

  addCollaborator() {

    if (this.collaboratorForm.invalid && !this.project) return;

    this.isLoading = true;

    this.collaboratorService.addCollaborator(this.collaboratorForm.value)
      .subscribe({
        next: res => {
          this.modalService.toastNotification.emit({
            title: res,
            status: AlertStatus.success
          })
          this.socketService.editingCollaborators();
          this.hideModal();
        },
        error: err => {
          this.isLoading = false;
          this.modalService.toastNotification.emit({
            title: 'Se ha producido un error',
            message: err.error,
            status: AlertStatus.error
          })
        }
      });
  }

  hideModal() {
    this.loadCollaboratorForm();
    this.isLoading = false;
    this.users = [];
    this.modalService.modalAddCollaboratorStatus = false;
  }

  hideResult() {
    this.loadCollaboratorForm();
    this.isLoading = false;
    this.users = [];
  }
}

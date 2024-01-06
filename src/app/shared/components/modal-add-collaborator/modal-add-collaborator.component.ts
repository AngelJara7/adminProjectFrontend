import { Component, OnDestroy, Output, computed, inject } from '@angular/core';

import { ModalService } from '../../services/modal.service';
import { ProjectService } from '../../services/project.service';

import { AlertStatus } from '../../interfaces';
import { SocketService } from '../../services/socket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { User } from '../../models';
import { CollaboratorService } from '../../services/collaborator.service';

@Component({
  selector: 'shared-modal-add-collaborator',
  templateUrl: './modal-add-collaborator.component.html',
  styleUrls: ['./modal-add-collaborator.component.css']
})
export class SharedModalAddCollaboratorComponent implements OnDestroy {

  private projectService = inject(ProjectService);
  private collaboratorService = inject(CollaboratorService);
  private socketService = inject(SocketService);
  private validatorsService = inject(ValidatorsService);
  private fb = inject(FormBuilder);

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;

  public modalService = inject(ModalService);

  public project = computed(() => this.projectService._currentProject());
  public users: User[] = [];
  public isLoading: boolean = false;
  public rols = ['Administrador', 'Colaborador'];
  public collaboratorForm!: FormGroup;

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
    this.collaboratorForm.controls['proyecto'].setValue(this.project()?._id);
    this.collaboratorForm.controls['usuario'].setValue(user.email);
    this.users = [];
  }

  addCollaborator() {

    if (this.collaboratorForm.invalid && !this.project()) return;

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

import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Project, Task } from '../../models';
import { Subscription, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../services/validators.service';
import { TaskService } from '../../services/taskService.service';
import { AuthService } from '../../services/auth.service';
import { AlertStatus } from '../../interfaces';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'shared-modal-task-form',
  templateUrl: './modal-task-form.component.html',
  styleUrls: ['./modal-task-form.component.css'],
})
export class SharedModalTaskFormComponent implements OnInit, OnDestroy {

  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService);
  private taskService = inject(TaskService);
  private socketService = inject(SocketService);

  public modalService = inject(ModalService);

  public subscription: Subscription | undefined;
  public currentTask: Task | undefined;

  public taskForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    descripcion: ['', [Validators.required]],
    vencimiento: ['', [Validators.required]],
    columna: ['', [Validators.required]],
    responsable: ['', [Validators.required]],
    usuario: ['', [Validators.required]]
  });

  @Input() public project!: Project;

  constructor() {
    this.subscription = this.subscription = this.modalService.currentTask
      .subscribe(task => this.loadTaskForm(task))
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {

  }

  loadTaskForm(task: Task) {
    this.currentTask = task;
    this.currentTask.vencimiento = this.formatDate(task.vencimiento);
    this.taskForm.reset(this.currentTask);
  }

  formatDate(dateFormat: Date | string) {

    const date = new Date(dateFormat);

    return date.getFullYear() + '-' +
      ('0' + (date.getMonth() + 1)).substr(-2) + '-' +
      ('0' + date.getUTCDate()).substr(-2);
  }

  hideModal() {
    this.currentTask = undefined;
    this.taskForm.reset();
    this.modalService.modalTaskFormStatus = false;
  }

  isValidField(field: string) {
    return this.taskForm.controls[field].errors && this.taskForm.controls[field].touched;
  }

  getErrorField(field: string) {
    return this.validatorsService.getErrorField(this.taskForm, field);
  }

  saveTask() {
    if (this.currentTask) {
      this.updateTask();
      return;
    }

    this.addTask();
  }

  updateTask() {
    const task: Task = this.taskForm.value;
    task.proyecto = this.project;

    this.taskService.updateTask(task, this.currentTask!._id)
      .subscribe({
        next: res => this.setToastNotification(res, AlertStatus.success),
        error: err => this.setToastNotification(err.error, AlertStatus.error)
      });
  }

  addTask() {
    const task: Task = this.taskForm.value;
    task.proyecto = this.project;

    this.taskService.addTask(task)
      .subscribe({
        next: res => this.setToastNotification(res, AlertStatus.success),
        error: err => this.setToastNotification(err.error, AlertStatus.error)
      });
  }

  setToastNotification(res: string, status: AlertStatus) {

    switch (status) {

      case AlertStatus.success:
        this.modalService.toastNotification.emit({
          title: res,
          status: status
        });

        this.socketService.editingCollaborators();
        this.modalService.viewNewSharedColumnCard = false;

        this.hideModal();
        break;

      case AlertStatus.error:
        this.modalService.toastNotification.emit({
          title: 'Se ha producido un error',
          message: res,
          status: status
        });

        break;
    }

  }

}

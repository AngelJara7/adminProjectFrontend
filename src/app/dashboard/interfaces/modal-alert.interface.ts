import { ModalAlertType } from "./modal-alert.enum";

export interface ModalAlert {
  type: ModalAlertType,
  title: string,
  message: string
}
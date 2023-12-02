import { AlertStatus } from "./alert-status.enum";


export interface StatusToastNotification {
  title: string,
  message?: string,
  status: AlertStatus
}
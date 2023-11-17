import { AlertStatus } from "src/app/shared/interfaces";

export interface StatusToastNotification {
  title: string,
  message?: string,
  status: AlertStatus
}
import { FC } from "react";

export enum AlertTypes {
  Danger = "danger",
  Success = "success",
  Warning = "warning",
}

export interface Route {
  path: string;
  name: string;
  component: FC;
  exact: boolean;
}

export interface Alert {
  type: AlertTypes;
  message: string;
}

export interface Modal {
  isOpen: boolean;
  type: AlertTypes | null;
  message: string | null;
  onConfirm?: Function | null;
  onCancel?: Function | null;
}

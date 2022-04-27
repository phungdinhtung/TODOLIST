import { Alert, Modal } from "./commons";

export interface CommonState {
  isLoading: boolean;
  alert: Alert | null;
  modal: Modal | null;
}

export interface State {
  commons: CommonState;
}

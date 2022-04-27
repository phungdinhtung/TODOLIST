export interface DefaultOption {
  label: string;
  value: string;
}

export interface Task {
  id?: string;
  title: string;
  description: string;
  startDate: Date;
  piority: DefaultOption;
  isChecked?: boolean;
  isOpenToggle?: boolean;
}

export interface TaskError {
  titleError: boolean;
  dateError: boolean;
}

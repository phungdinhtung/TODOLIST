import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Alert, Modal } from "../interfaces/commons";
import { CommonState } from "../interfaces/state";

const initialState: CommonState = {
  isLoading: false,
  alert: null,
  modal: {
    isOpen: false,
    type: null,
    message: null,
  },
};

const slice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAlert: (state, action: PayloadAction<Alert | null>) => {
      state.alert = action.payload;
    },
    setModal: (state, action: PayloadAction<Modal | null>) => {
      state.modal = action.payload;
    },
    reset: (state) => {
      state.alert = null;
      state.isLoading = false;
      state.modal = {
        isOpen: false,
        type: null,
        message: null,
      };
    },
  },
});

export const { setLoading, setAlert, setModal, reset } = slice.actions;
export default slice.reducer;

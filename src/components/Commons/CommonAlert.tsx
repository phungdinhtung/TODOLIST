import React, { FC, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert } from "reactstrap";

import { setAlert } from "../../redux/commons";

const CommonAlert: FC = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state: any) => state.commons.alert);
  const timeout = useRef<any>();

  const onDismiss = () => {
    dispatch(setAlert(null));
    timeout && timeout.current && clearTimeout(timeout.current);
  };

  useEffect(() => {
    if (!!alert && !!alert.message?.length) {
      timeout && timeout.current && clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        dispatch(setAlert(null));
      }, 2000);
    }
  }, [alert, dispatch]);

  return !!alert && alert.message?.length > 0 ? (
    <div className="app-alert">
      <Alert
        color={alert.type}
        isOpen={alert.message.length > 0}
        toggle={onDismiss}
      >
        {alert.message}
      </Alert>
    </div>
  ) : null;
};

export default CommonAlert;

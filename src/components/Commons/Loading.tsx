import { FC } from "react";
import { useSelector } from "react-redux";

import { State } from "../../interfaces/state";

const Loading: FC = () => {
  const isLoading = useSelector((state: State) => state.commons.isLoading);

  if (!isLoading) return null;

  return (
    <div className="d-flex align-items-center justify-content-center loading">
      <div className="spinner-border" role="status" />
    </div>
  );
};

export default Loading;

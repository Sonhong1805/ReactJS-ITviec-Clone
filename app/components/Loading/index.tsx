import React from "react";
import { LoadingWrapper } from "./styled";

const Loading = () => {
  return (
    <LoadingWrapper>
      <div className="spinner loader"></div>
    </LoadingWrapper>
  );
};

export default Loading;

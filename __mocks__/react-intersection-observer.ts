import * as React from "react";

export const useInView = () => {
  return [React.useRef(), true];
};

export default {
  useInView
};

import * as React from "react";

export const useInView = jest.fn().mockImplementation(() => {
  return [React.useRef(), true];
});

export default {
  useInView
};

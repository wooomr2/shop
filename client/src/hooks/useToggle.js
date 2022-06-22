import { useState } from "react";

function useToggle(initValue = null) {
  const [value, setValue] = useState(initValue);

  const toggle = (val) => {
    setValue((prev) => (typeof val === "boolean"  ? val : !prev));
  };

  return [value, toggle, setValue];
}

export default useToggle;

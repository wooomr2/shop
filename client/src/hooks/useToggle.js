import { useState } from "react";

function useToggle(initValue = null) {
  const [value, setValue] = useState(initValue);

  const toggle = () => {
    setValue((prev) => !prev);
  };

  return [value, toggle, setValue];
}

export default useToggle;

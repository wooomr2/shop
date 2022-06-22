import { useState } from "react";

function useAlt(initValue = null) {
  const [value, setValue] = useState(initValue);

  const alt = (value) => () => {
    setValue((prev) => {
      return value;
    });
  };

  return [value, alt, setValue];
}

export default useAlt;

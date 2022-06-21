import { useState } from "react";

function useInput(initValue = null) {
  const [value, setValue] = useState(initValue);

  const handler = (e) => {
    setValue(e.target.value);
  };

  return [value, handler, setValue];
}

export default useInput;

import { useState } from "react";

function useInput(initValue = null) {
  const [value, setValue] = useState(initValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return [value, onChange, setValue];
}

export default useInput;

import { useState } from "react";

function useSessionStorage(str = null) {
  const [value, setValue] = useState(JSON.parse(sessionStorage.getItem(str)));

  return value;
}

export default useSessionStorage;

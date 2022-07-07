import { useState } from "react";

function uselocalStorage(str = null) {
  const [value, setValue] = useState(JSON.parse(localStorage.getItem(str)));

  return value;
}

export default uselocalStorage;

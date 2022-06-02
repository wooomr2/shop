import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Search() {
  // const navigate = useNavigate();
  // const [keyword, setKeyword] = useState("");

  // const searchSubmitHandler = (e) => {
  //   e.preventDefault();
  //   if (keyword.trim()) {
  //     navigate(`/products/${keyword}`);
  //   } else {
  //     navigate("/products");
  //   }
  // };

  return (
    <div>
      {/* <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search for items ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form> */}
    </div>
  );
}

export default Search;

import "./searchInput.scss";
import { useNavigate } from "react-router-dom";
import useInput from "../../../hooks/useInput";

function Search() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useInput("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) navigate(`/search/${keyword}`);
  };
  
  return (
    <div>
      <form className="search-container" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Search for items ..."
          onChange={setKeyword}
        />
      </form>
    </div>
  );
}

export default Search;

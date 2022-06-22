import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import useInput from "../../../hooks/useInput";
import "./searchInput.scss";

function Search({ setSearchOpen }) {
  const navigate = useNavigate();
  const [keyword, onChangeKeyword] = useInput("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) navigate(`/search/${keyword}`);
  };
  
  return (
    <div className="search">
      <div className="search-wrapper">
        <form className="search-wrapper-form" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Search from items ..."
            onChange={onChangeKeyword}
          />
        </form>
        <div className="search-wrapper-close">
          <CloseIcon
            className="closeIcon"
            onClick={() => setSearchOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;

import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useInput from "../../../hooks/useInput";
import "./searchInput.scss";


function Search({ toggleSearchOpen }) {
  const navigate = useNavigate();
  const [keyword, onChangeKeyword] = useInput("");
  const keywordRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) navigate(`/search/${keyword}`);
  };

  useEffect(() => {
    keywordRef?.current?.focus();
  }, []);

  return (
    <div className="search">
      <div className="search-wrapper">
        <form className="search-wrapper-form" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Search from items ..."
            ref={keywordRef}
            onChange={onChangeKeyword}
          />
        </form>
        <div className="search-wrapper-close">
          <CloseIcon
            className="closeIcon"
            onClick={toggleSearchOpen}
          />
        </div>
      </div>
    </div>
  );
}

export default Search;

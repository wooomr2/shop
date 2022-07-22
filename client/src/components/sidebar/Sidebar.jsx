import CloseIcon from '@mui/icons-material/Close';
import CategoryList from "./categoryList/CategoryList";
import "./sidebar.scss";

function Sidebar({
  brands,
  setBrands,
  setCurrentPage,
  brandData,
  categoryOpen,
  categoryToggleHandler, 
}) {
  const handleCheck = (e) => {
    setCurrentPage(1); // 1페이지로 설정
    e.target.checked
      ? setBrands((prev) => [...prev, e.target.value]) // 브랜드 보기 추가
      : setBrands((prev) => prev?.filter((brand) => brand !== e.target.value));
  };

  return (
    <aside className={`sidebar-container ${categoryOpen ? "filterOpen" : ""}`}>
      <div className="sidebar-sticky">
        <div className="black" onClick={categoryToggleHandler}></div>
        <div className="categorylist-wrapper">
          <div
            className="categoryToggleBtn-wrapper"
            onClick={categoryToggleHandler}
          >
            <CloseIcon className="categoryToggleBtn" />
          </div>

          <div className="categorylist-name">
            <h4>CATEGORY</h4>
          </div>
          <CategoryList
            setBrands={setBrands}
            setCurrentPage={setCurrentPage}
            categoryToggleHandler={categoryToggleHandler}
          />
        </div>

        <div className="brands-wrapper">
          <div className="brands-name">
            <h4>BRANDS</h4>
          </div>
          <div className="brands-items">
            {brandData?.map((brand) => (
              <div className="brands-item" key={brand._id}>
                <input
                  type="checkbox"
                  name="brand"
                  checked={brands?.find((b) => b === brand._id) ? true : false}
                  value={brand._id}
                  onChange={(e) => handleCheck(e)}
                />
                <span>{brand._id}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

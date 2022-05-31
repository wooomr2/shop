import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import CategoryItem from './CategoryItem';

function CategoryList({ categoryToggleHandler, setBrands, setCurrentPage }) {
  const navigate = useNavigate();
  const params = useParams();
  const { categories } = useSelector((store) => store.category);
  const [openDropdown, setOpenDropdown] = useState(null);

  const openDropdownHandler = (cid) => {
    if (cid === openDropdown) return setOpenDropdown(null);
    setOpenDropdown(cid);
  }

  // const onSelectCallback = () => { // 이동시 카테고리 열었던 것 닫기
  //   if (categoryToggleHandler) categoryToggleHandler();
  //   setOpenDropdown(null);
  // }

  return (
    <div className="categorylist-main">
      {categories && categories.map((category) => {
        const isOpen = openDropdown === category._id;
        return (
          <div className="categorylist-items" key={category._id}>
            <div className="categorylist-head">
              <div 
                className='dropdown-button'
                onClick={() => {openDropdownHandler(category._id)}}
              >
                {isOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
              </div>
              <div
                className={`categorylist-head-item ${params.cid === category._id ? "category-focus" : ""}`}
                onClick={() => {
                  setBrands([]);
                  setCurrentPage(1);
                  categoryToggleHandler();
                  navigate(`/${category.slug}/${category._id}`);
                }}
              >
                {category.name}
              </div>
            </div>
            {isOpen &&
              <CategoryItem
                setBrands={setBrands}
                setCurrentPage={setCurrentPage}
                categories={category.children}
                categoryToggleHandler={categoryToggleHandler}
              />
            }
          </div>
        );
        
        // <div className="categorylist-items">
        //   <CategoryItem
        //     key={category._id}
        //     onClickNav={() => { 
        //       categoryToggleHandler();
        //       navigate(`/${category.slug}/${category._id}`)
        //     }}
        //     label={category.name}
        //     isPlus={category.children.length > 0 ? true : false}
        //   />
        //   {category.children.length > 0 && selectedCategories[category._id] &&
        //     <CategoryList
        //       key={category.children._id}
        //       categories={category.children}
        //     />
        //   }
        // </div>
      })}
    </div>
  );
}

export default CategoryList;
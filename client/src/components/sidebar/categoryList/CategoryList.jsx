import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import CategoryItem from './CategoryItem';


function CategoryList({ categoryToggleHandler, setBrands, setCurrentPage }) {
  const params = useParams();
  const categories = useSelector((store) => store.category.categories);
  const [openDropdown, setOpenDropdown] = useState(null);

  const openDropdownHandler = (cid) => {
    if (cid === openDropdown) return setOpenDropdown(null);
    setOpenDropdown(cid);
  }

  return (
    <div className="categorylist-main">
      {categories?.map((category) => {
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
              <Link to={`/${category.slug}/${category._id}`}>
                <div
                  className={`categorylist-head-item ${params.cid === category._id ? "category-focus" : ""}`}
                  onClick={() => {
                    setBrands([]);
                    setCurrentPage(1);
                    categoryToggleHandler();
                  }}
                >
                  {category.name}
                </div>
              </Link>
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
      })}
    </div>
  );
}

export default CategoryList;
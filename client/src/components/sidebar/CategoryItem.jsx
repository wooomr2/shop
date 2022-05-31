import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function TreeItem({ category, children, categoryToggleHandler, setBrands, setCurrentPage }) {
  const navigate = useNavigate();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  console.log('categroy.children', category.children);

  return (
    <div key={category._id} className="categorylist-sub-items">
      {category.children.length > 0 ? (
        <span
          className="categorylist-sub-icon-wrapper"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <KeyboardArrowDownIcon className='categorylist-sub-icon' /> : <KeyboardArrowRightIcon className='categorylist-sub-icon' />}
        </span>
      ) : (
        <span className="categorylist-sub-icon-wrapper-un"></span>
      )}
      <span
        className={`categorylist-head-item ${params.cid === category._id ? "category-focus" : ""}`}
        onClick={() => {
          setBrands([]);
          setCurrentPage(1);
          categoryToggleHandler();
          navigate(`/${category.slug}/${category._id}`)
        }}
      >
        {category.name}
      </span>
      {children && isOpen && <div>{children}</div>}
    </div>
  );
}

function CategoryItem({ categories, categoryToggleHandler, setBrands, setCurrentPage }) {
  console.log(categories);

  const createTree = (category) => (
    <TreeItem
      key={category._id}
      category={category}
      categoryToggleHandler={categoryToggleHandler}
      setBrands={setBrands}
      setCurrentPage={setCurrentPage}
    > 
        {category?.children?.map((_category) => (
          createTree(_category)
        ))}
    </TreeItem>
  );

  return (
    <div className="categorylist-sub">
      {categories.map((category) => (
        createTree(category)
      ))}
    </div>
  )
}

export default CategoryItem;
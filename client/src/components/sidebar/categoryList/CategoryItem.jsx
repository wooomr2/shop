import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useToggle from '../../../hooks/useToggle';

function TreeItem({ category, children, categoryToggleHandler, setBrands, setCurrentPage }) {
  const params = useParams();
  const [isOpen, toggleIsOpen] = useToggle(false);

  return (
    <div key={category._id} className="categorylist-sub-items">
      {category.children.length > 0 ? (
        <span
          className="categorylist-sub-icon-wrapper"
          onClick={toggleIsOpen}
        >
          {isOpen ? <KeyboardArrowDownIcon className='categorylist-sub-icon' /> : <KeyboardArrowRightIcon className='categorylist-sub-icon' />}
        </span>
      ) : (
        <span className="categorylist-sub-icon-wrapper-un"></span>
      )}
      <Link to={`/${category.slug}/${category._id}`}>
        <span
          className={`categorylist-head-item ${params.cid === category._id ? "category-focus" : ""}`}
          onClick={() => {
            setBrands([]);
            setCurrentPage(1);
            categoryToggleHandler();
          }}
        >
          {category.name}
        </span>
      </Link>
      {children && isOpen && <div>{children}</div>}
    </div>
  );
}

function CategoryItem({ categories, categoryToggleHandler, setBrands, setCurrentPage }) {

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
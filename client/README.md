
- setIsHovering에 에러 있음 고치기

# 컴포넌트 재활용 방법 찾기
-- category, brand, collection, search페이지에서 중복 사용중
<!-- <div>
        <div className="top">
          <div className="top-left">
            <div className="sort">
              <select onChange={(e) => setSort(e.target.value)}>
                <option defaultValue hidden>
                  SORT
                </option>
                <option value={"latest"}>신상품</option>
                <option value={"ascending"}>낮은가격</option>
                <option value={"descending"}>높은가격</option>
              </select>
            </div>
          </div>

          <div className="top-right">
            <GridViewRoundedIcon
              className={`grid-icon ${selectedGrid && "selected"}`}
              onClick={handleGridColums(true)}
            />
            <AppsOutlinedIcon
              className={`grid-icon ${!selectedGrid && "selected"}`}
              onClick={handleGridColums(false)}
            />
          </div>
        </div>

        <div className={`products-wrapper ${selectedGrid && "selected"}`}>
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>

      <Pagination
        total={total}
        perPage={perPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div> -->

#product 라우터 수정하기 productSlice도 수정하기 dispatch도 수정하기

import React, { FC, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import qs from "qs";
import {
  filterSelector,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { Link, useNavigate } from "react-router-dom";

import Categories from "../components/categories";
import Sort, { sortList } from "../components/sort";
import PizzaBlock from "../components/PizzaBlock/index";
import PizzaSkeleton from "../components/PizzaBlock/pizzaSkeleton";
import Pagination from "../pagination";
import { SearchPizzaParams, fetchPizzas, pizzaDataSelector } from "../redux/slices/pizzasSlice";
import { useAppDispatch } from "../redux/store";

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearching = useRef(false);
  const isMounted = useRef(false);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(filterSelector);
  const { items, status } = useSelector(pizzaDataSelector);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  const fetchLoad = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  // Если изменились параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`/?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // Если был первый рендер, то проверяются URL параметры

  useEffect(() => {
    if (window.location.search) {
      const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortBy
      );

      dispatch(setFilters({
        searchValue: params.search,
        categoryId: Number(params.category),
        currentPage: Number(params.currentPage),
        sort: sort ? sort : sortList[0],
      }));
      isSearching.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваются пиццы

  useEffect(() => {


    if (!isSearching.current) {
      fetchLoad();
    }

    isSearching.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);


  
  const skeletons = [...new Array(6)].map((_, index) => (
    <PizzaSkeleton key={index} />
  ));

  const pizzas = items
    .filter((obj: any) => {
      if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj: any) => (
      <Link key={obj.id} to={`/pizza/${obj.id}`}>
        <PizzaBlock {...obj} />
      </Link>
    ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          clickedCategoryType={onChangeCategory}
          getCategories={() => {}}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error">
          <h1>😔</h1>
          <h2>Произошла ошибка</h2>
          <h3>Мы не смогли получить пиццы</h3>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

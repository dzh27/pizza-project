import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Sort, SortPropertyEnum, setSort, sortSelector } from "../redux/slices/filterSlice";

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type outsideClick = MouseEvent & {
  path: Node[];
};

export const sortList: SortItem[] = [
  { name: "популярности ↓", sortProperty: SortPropertyEnum.RATING_DESC },
  { name: "популярности ↑", sortProperty: SortPropertyEnum.RATING_ASC },
  { name: "цене ↓", sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: "цене ↑", sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: "названию (А → Я)", sortProperty: SortPropertyEnum.TITLE_ASC },
  { name: "названию (Я → А)", sortProperty: SortPropertyEnum.TITLE_DESC },
];

function Sort() {
  const dispatch = useDispatch();
  
  const sort = useSelector(sortSelector);
  
  const sortRef = useRef<HTMLDivElement>(null);

  const [isToggled, setToggle] = useState(false);

  const onClickSelect = (obj: SortItem) => {
    dispatch(setSort(obj));
    setToggle(false);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     const _event = event as outsideClick;

  //     if (sortRef.current && !_event.path.includes(sortRef.current)) {
  //       setToggle(false);
  //     }
  //   };

  //   document.body.addEventListener('click', handleClickOutside);

  //   return () => document.body.removeEventListener('click', handleClickOutside);
  // }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        
        <b>Сортировка по:</b>
        <span onClick={() => setToggle(!isToggled)}>{sort.name}</span>
      </div>
      {isToggled && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj, index) => (
              <li
                key={index}
                onClick={() => onClickSelect(obj)}
                className={
                  sort.sortProperty === obj.sortProperty ? "active" : ""
                }
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;

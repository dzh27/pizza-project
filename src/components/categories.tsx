import { FC } from "react";

type CategoriesProps = {
  value: number;
  clickedCategoryType: (i: number) => void;
  getCategories: (categories: string[]) => void;
}

const allCategories = [
  "Все",
  "Мясные",
  "Вегетарианские",
  "Гриль",
  "Острые",
  "Разносортные",
];

const Categories: FC<CategoriesProps> = ({ value, getCategories, clickedCategoryType }) => {
  getCategories(allCategories)

  return (
    <div className="categories">
      <ul>
        {allCategories.map((categoryName, index) => {
          return (
            <li
              key={index}
              onClick={() => clickedCategoryType(index)}
              className={value === index ? "active" : ""}
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;

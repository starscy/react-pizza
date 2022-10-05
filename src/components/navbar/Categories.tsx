import React from "react";

const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

type categoriesProps = {
  clickOnCategory: (index: number) => void
  categoryId: number
}

const Categories: React.FC<categoriesProps> = React.memo(
  ({ clickOnCategory, categoryId }) => {
    console.log("rendr")
    return (
      <div>
        <div className="categories">
          <ul>
            {categories.map((item, index) => (
              <li
                key={item}
                onClick={() => clickOnCategory(index)}
                className={categoryId === index ? "active" : " "}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
)

export default Categories;

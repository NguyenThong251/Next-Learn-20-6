import MealItem from "./meal-item";
import classes from "./meals.grid.module.css";
export default function MealGrid({ meals }) {
  return (
    <ul className={classes.meals}>
      {meals.map((item) => (
        <li key={item.id}>
          <MealItem {...item} />
        </li>
      ))}
    </ul>
  );
}

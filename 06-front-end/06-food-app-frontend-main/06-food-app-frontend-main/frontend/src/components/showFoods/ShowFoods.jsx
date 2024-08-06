import { useContext } from "react";
import "./showfoods.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

// eslint-disable-next-line react/prop-types
const ShowFoods = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  console.log("category", category);

  return (
    <div className="food-display">
      <h1>Top Dishes here</h1>
      <div className="food-display-list">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category)
            return <FoodItem key={index} item={item} />;
        })}
      </div>
    </div>
  );
};

export default ShowFoods;

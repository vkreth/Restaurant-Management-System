import * as PropTypes from "prop-types";

function FoodItem(props) {
  return (
    <div>
      <h3>{props.foodItem.name}</h3>
      <p>{props.foodItem.description}</p>
      <p>{props.foodItem.price}</p>
    </div>
  );
}

FoodItem.propTypes = {
  foodItem: PropTypes.object.isRequired,
};

export default FoodItem;

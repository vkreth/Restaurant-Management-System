import {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {getFood,deleteFoodItem} from "../../../utils/apis/food-dataprovider";
import {useNavigate} from "react-router-dom";



const FoodItemList = () => {
  const navigate = useNavigate();
  const [foodItems, setFoodItems] = useState([]);

  function getAll(){
    getFood('/foodItem/all').then((res)=>{setFoodItems(res.data)})
  }

  useEffect(() => {
    getAll();
  }, []);

  function handleDelete(id) {
    deleteFoodItem(`/foodItem/${id}`).then((res)=>{console.log(res);getAll()})
  }

  return (
    <>
      <div className="d-flex justify-content-between">
        <h1>Food Items</h1>
        <Link to="/admin/foodItems/add">
          <Button variant="primary">Add Food Item</Button>
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {foodItems.map((foodItem) => (
          <tr key={foodItem._id}>
            <td>
              <img
                src={`http://localhost:3000/${foodItem.image}`}
                alt={foodItem.name}
                style={{ width: "50px", height: "50px" }}
              />
            </td>
            <td>{foodItem.name}</td>
            <td>{foodItem.price}</td>
            <td>{foodItem.category}</td>
            <td>
              <Button
                variant="info"
                className="m-1"
                onClick={() => navigate(`/admin/foodItems/edit/${foodItem.itemId}`)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                className="m-1"
                onClick={() => handleDelete(foodItem.itemId)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
    </>
  );
};

export default FoodItemList;

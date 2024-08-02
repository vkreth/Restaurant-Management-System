import { Button, Form,Dropdown, Card ,Row,Col} from "react-bootstrap";
import {useEffect, useState} from "react";
import {addFoodItem, editFoodItem, getFoodItem} from "../../../utils/apis/food-dataprovider";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export const FoodItemAdd = () => {
  const [foodItem, setFoodItem] = useState({ name: "", description: "", price: "", image: "", category: "" });
  const [foodItemId, setFoodItemId] = useState(null);
  const [foodImage, setFoodImage] = useState();
  const [toast, setToast] = useState(false);
  const navigate=useNavigate();
  const params = useParams();
  const categories = [
    {name: "Cake"},
    {name: "Dessert"},
    {name: "Noodles"},
    {name: "Pasta"},
    {name: "Pure Veg"},
    {name: "Rolls"},
    {name: "Salad"},
    {name: "Sandwich"},
  ];
  const handleChange = (event) => {
   if (event.target.name === "image") {
      const files = event.target.files[0]
      setFoodImage(files)
    }
    if(event.target.name==="category"){
      setFoodItem({...foodItem,category:event})
    }
    else {
      setFoodItem({ ...foodItem, [event.target.name]: event.target.value })
    }
  }
  const addFood = (e) => {
    e.preventDefault();
    const foodData = new FormData();
    foodData.append('name', foodItem.name)
    foodData.append('description', foodItem.description)
    foodData.append('category', foodItem.category)
    foodData.append('price', foodItem.price)
    foodData.append('image', foodImage ?? foodItem.image)
    if (!foodItemId) {
      addFoodItem('/foodItem/create', foodData).then(() => { setToast(true);navigate('/admin/foodItems');}).catch((err) => console.log(err))
    } else {
      editFoodItem(`/foodItem/update/${foodItemId}`, foodData).then(() => { setToast(true);navigate('/admin/foodItems');}).catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    const foodItemId = params.id;
    setFoodItemId(foodItemId);
    if (foodItemId) {
      getFoodItem(foodItemId).then((res) => {
        setFoodItem(res.data)
      }).catch((err) => console.log(err))
    }
  }, [params]);

  return (
    <>
      <h1>Food Item Add</h1>
      <center>
        <Card className={"py-5 w-50 flex-wrap align-items-center"}>
          <Form onSubmit={addFood}>
            <Form.Group controlId="formBaicName">
              <Row>
                <Col sm={6} className={"pb-5"}><Form.Label>Food Name</Form.Label></Col>
                <Col sm={6} className={"pb-5"}><Form.Control name="name" value={foodItem.name} type="text" placeholder="Enter Food Name" onChange={handleChange} /></Col>
              </Row></Form.Group>
            <Form.Group controlId="formBaicName">
              <Row>
                <Col sm={6} className={"pb-5"}><Form.Label>Food Description</Form.Label></Col>
                <Col sm={6} className={"pb-5"}><Form.Control name="description" value={foodItem.description} type="text" placeholder="Enter Food Description" onChange={handleChange} /></Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formBaicName">
              <Row>
                <Col sm={6} className={"pb-5"}><Form.Label>Food Image</Form.Label></Col>
                <Col sm={6} className={"pb-5"}><Form.Control name="image" type="file" accept="image/*" placeholder="Enter Food Image" onChange={handleChange} /></Col>
              </Row>
              <Row className={'d-flex justify-content-center'}>
                {foodItem.image &&
                <Col sm={6} className={"pb-5"}><img src={ `http://localhost:3000/${foodItem.image}`} alt={foodItem.name}/></Col>
                }
              </Row>
            </Form.Group>
            <Form.Group controlId="formBaicName">
              <Row>
                <Col sm={6} className={"pb-5"}><Form.Label>Food Category</Form.Label></Col>
                <Col sm={6} className={"pb-5 w-50"}><Dropdown name="category" onSelect={(eventKey)=>{setFoodItem({...foodItem,category:eventKey})}}>
                  <Dropdown.Toggle variant="success" id="dropdown-basic" className={'w-100'}>
                    {foodItem.category === null || foodItem.category === '' ?"Select Category":foodItem.category}
                  </Dropdown.Toggle>
                  <Dropdown.Menu className={'w-100'} drop={"down"}>
                    {categories.map((cat,i)=>{
                      return <Dropdown.Item key={i} eventKey={cat.name}>{cat.name}</Dropdown.Item>
                    })}
                  </Dropdown.Menu>
                </Dropdown>
                </Col>
              </Row>
            </Form.Group>
            <Form.Group controlId="formBaicName">
              <Row>
                <Col sm={6} className={"pb-5"}><Form.Label>Food Price</Form.Label></Col>
                <Col sm={6} className={"pb-5"}><Form.Control name="price" value={foodItem.price} type="number" placeholder="Enter Food Price" onChange={handleChange} /></Col>
              </Row>
            </Form.Group>
            <Button variant="primary" type="submit">
              {foodItemId ? "Update" : "Add"} Food Item
            </Button>
          </Form>
          <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
            <Toast onClose={() => setToast(false)} show={toast} delay={3000} autohide bg={"success"}>
              <Toast.Body>
                Food Item Added Successfully
              </Toast.Body>
            </Toast>
          </ToastContainer>
        </Card>
      </center>
    </>
  )
};

export default FoodItemAdd;

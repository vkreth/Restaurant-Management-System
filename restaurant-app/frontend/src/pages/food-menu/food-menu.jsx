import './food-menu.css';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {Link} from "react-router-dom";
import { useEffect,useState } from 'react';
import { getFood } from '../../utils/apis/food-dataprovider';
import { addProduct } from '../../utils/apis/cart-dataprovider';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const FoodMenu = () => {
  const [foodItems,setFoodItems]=useState();
  const cat = new URLSearchParams(window.location.search).get('cat');
  useEffect(()=>{
    console.log(cat);
    if(cat) {
      getFood(`/foodItem/category/${cat}`).then((res)=>{
        setFoodItems(res.data)
      })
    } else {
      getFood('/foodItem/all').then((res)=>{
        setFoodItems(res.data)
      })
    }

  },[cat])
  return (
    <>
      <Container className="text-center bg-body-tertiary d-flex flex-column align-items-center pb-5">
        <Row className={"pb-2"}>
          <Col>
            <h2>Categories</h2>
          </Col>
        </Row>
        <Row className={'px-5 pb-5'} style={{maxWidth: "1380px"}}>
          <CategoryList/>
        </Row>
        <Row className={"pb-2"}>
          <FoodCard foodItems={foodItems} />
        </Row>
      </Container>
      <Container className='bg-body-tertiary text-center'>
        <Row>
          <Col className='text-center'>
            <div className='hero-description fs-6'>
              <span>&copy; 2024 Food Delivery. All rights reserved.</span>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

const CategoryList = () => {
  const categories = [
    {name: "Cake", image: "src/assets/images/category_items/cake.png"},
    {name: "Dessert", image: "src/assets/images/category_items/deserts.png"},
    {name: "Noodles", image: "src/assets/images/category_items/noodles.png"},
    {name: "Pasta", image: "src/assets/images/category_items/pasta.png"},
    {name: "Pure Veg", image: "src/assets/images/category_items/pure_veg.png"},
    {name: "Rolls", image: "src/assets/images/category_items/rolls.png"},
    {name: "Salad", image: "src/assets/images/category_items/salad.png"},
    {name: "Sandwich", image: "src/assets/images/category_items/sandwich.png"},
  ];
  return (
    <>
      {categories.map((category, index) => {
        return (
          <Col key={index} className='text-center'>
            <Link to={`/foodMenu?cat=${category.name}`} className={'category text-decoration-none text-dark'}>
              <img src={category.image} alt="food" className="img-fluid mt-5"/>
              <p className='category-title'>{category.name}</p>
            </Link>
          </Col>
        );
      })}
    </>
  );
}

const FoodCard = (props) => {
  const [toast,setToast]=useState(false)
  const addToCart=(data)=>{
    const id=JSON.parse(localStorage.userDetails)._id
    addProduct(`/${id}`,data).then((res)=>setToast(true));
  }
  return (
    <>
    {props.foodItems?.map((item,index)=>{
      return(
        <Col key={index} className={"pb-5"}>
        <Card style={{width: '17rem'}}>
          <Card.Img variant="top" src={`http://localhost:3000/${item.image}`} style={{ width: "90%", height: "200px"}}/>

          <Button variant="outline-danger" className={"itemCard px-2 pt-0 fs-5 rounded-circle position-absolute"} onClick={()=>{addToCart({product:item._id,quantity:1})}}>
            <AiOutlineShoppingCart/>
          </Button>
          <Card.Body className="text-start">
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>
              {item.description}
            </Card.Text>
            <div className="d-flex justify-content-between">
              <span>${item.price}</span>
            </div>
          </Card.Body>
        </Card>
        </Col>
     
      )
    })} 
     <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1 }}>
        <Toast onClose={() => setToast(false)} show={toast} delay={3000} autohide bg={"success"}>
          <Toast.Body>
            Food Item Added Successfully
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default FoodMenu;

import './create-order.css';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import { useEffect, useState, useRef } from 'react';
import {getCart} from "../../utils/apis/cart-dataprovider.js";
import {createOrder} from "../../utils/apis/orders-dataprovider.js";
import { useNavigate} from "react-router-dom";

const CreateOrder = () => {
  const navigate = useNavigate();
  const deliveryCharge = 10;
  const [subTotal , setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const orderForm = useRef(null);
  const id = JSON.parse(localStorage.userDetails)._id;
  const getCartItems = () => {
    getCart(`/${id}`).then((res) => {
      const cartData = res.data;
      if (!cartData) {
        navigate('/cart');
      }
      setProducts(cartData.products);
      const _subTotal = cartData.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      setSubTotal(_subTotal);
      setTotal(_subTotal + deliveryCharge);
    });
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const handleOrder = () => {
    const formData = orderForm.current;
    const data = {
      userId: id,
      name: formData['formBasicName'].value,
      email: formData['formBasicEmail'].value,
      phone: formData['formBasicPhone'].value,
      address: formData['formBasicAddress'].value,
      city: formData['formBasicCity'].value,
      state: formData['formBasicState'].value,
      zipCode: formData['formBasicZipCode'].value,
      totalAmount: total,
      products: products.map((item) => {
        return {
          product: item.product._id,
          quantity: item.quantity
        }
      })
    };
    createOrder('/create', data).then(res => {
      if(res.data){
        console.log(res.data);
        window.location.replace(res.data);
      }else{
        alert("Error");
      }
    });
  }
  return (
    <Container className={'pb-5'}>
      <Row>
        <Col>
          <h2>Delivery Information</h2>
          <hr/>
          <Form ref={orderForm}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control type="text" placeholder="Enter Full Name"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Enter email"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Control type="text" placeholder="Phone Number"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Control type="text" placeholder="Address"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCity">
              <Form.Control type="text" placeholder="City"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicState">
              <Form.Control type="text" placeholder="State"/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicZipCode">
              <Form.Control type="text" placeholder="Zip Code"/>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <div className={'mb-5'}>
            <h2>Order Summary</h2>
            <hr/>
            <div className={'d-flex justify-content-between'}>
              <span> Subtotal </span> <span> ${subTotal} </span>
            </div>
            <div className={'d-flex justify-content-between'}>
              <span> Delivery Charges </span> <span> ${deliveryCharge} </span>
            </div>
            <hr/>
            <div>
              <h4 className={'d-flex justify-content-between mb-3'}>
                <span> Total </span> <span> ${total} </span>
              </h4>
            </div>
          </div>
          <div>
            <Button variant="warning" className={'text-white w-50 py-2'} onClick={handleOrder}>Proceed to Payment <br/> (Stripe)</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateOrder;

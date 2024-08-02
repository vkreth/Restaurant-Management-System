import './cart-page.css';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import {
    AiOutlineDelete,
    AiOutlineMinusCircle,
    AiOutlinePlusCircle
} from "react-icons/ai";
import { getCart, removeProduct, addQuantity,reduceQuantity } from '../../utils/apis/cart-dataprovider';
import {useNavigate} from "react-router-dom";

const CartPage = () => {
    const navigate = useNavigate();
    const deliveryCharge = 10;
    const [cartItems, setCartItems] = useState([]);
    const [subTotal , setSubTotal] = useState(0);
    const [total, setTotal] = useState(0);

    const getAllCart = () => {
        const id = JSON.parse(localStorage.userDetails)._id
        getCart(`/${id}`).then((res) => {
            const cartData = res.data;
            setCartItems(cartData);
            const _subTotal = cartData.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
            setSubTotal(_subTotal);
            setTotal(_subTotal + deliveryCharge);
        });
    }
    useEffect(() => {
        getAllCart();
    }, [])

    const handleRemove = (id) => {
        // const userId=JSON.parse(localStorage.userDetails).userId
        removeProduct(`/${cartItems.user}/${id}`).then((res) => { console.log(res); getAllCart() })
    }
    const addQ=(pId,data) => {
        const id = JSON.parse(localStorage.userDetails)._id
        addQuantity(`/add/${id}/${pId}`, data).then((res) => {console.log(res); getAllCart()});
    }
    const reduceQ=(pId,data) => {
        const id = JSON.parse(localStorage.userDetails)._id
        reduceQuantity(`/reduce/${id}/${pId}`, data).then((res) => {console.log(res); getAllCart()});
    }

    return (
        <>
            <Container className={'pb-5'}>
                <Row>
                    <Col>
                        <h2>Cart</h2>
                        <hr />
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Subtotal</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems?.products?.map((item, index) => (
                                    <tr key={index} className="text-center">
                                        <td className={"pt-2"}>
                                            {item.product["name"]}
                                        </td>
                                        <td className={"pt-2"}>${item.product.price}</td>
                                        <td className={"pt-1"}>
                                            <span className="text-primary fs-5" style={{ cursor: "pointer" }}><AiOutlinePlusCircle onClick={() => addQ(item.product._id,{ product: item.product._id, quantity: item.quantity +1 })}/></span>
                                            &nbsp; {item.quantity} &nbsp;
                                        <span className="text-primary fs-5" style={{ cursor: "pointer" }}><AiOutlineMinusCircle onClick={() => reduceQ(item.product._id,{ product: item.product._id, quantity: item.quantity - 1 })}/></span>
                                        </td>
                                        <td className={"pt-2"}>${item.product.price * item.quantity}</td>
                                        <td className={"pt-1"}>
                                            <span className={"text-danger fs-5"} style={{ cursor: "pointer" }} onClick={() => handleRemove(item.product._id)}><AiOutlineDelete /></span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                    <Col>
                        <h2>Checkout</h2>
                        <hr />
                        <div className={'d-flex justify-content-between'}>
                            <span> Subtotal </span> <span> ${subTotal} </span>
                        </div>
                        <div className={'d-flex justify-content-between'}>
                            <span> Delivery Charges </span> <span> ${deliveryCharge} </span>
                        </div>
                        <hr />
                        <div>
                            <h4 className={'d-flex justify-content-between mb-3'}>
                                <span> Total </span> <span> ${total} </span>
                            </h4>
                        </div>
                        <Button variant="primary" onClick={() => navigate('/order')} >Proceed to Checkout</Button>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default CartPage;

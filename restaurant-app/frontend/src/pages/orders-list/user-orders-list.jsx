import { useEffect, useState } from 'react';
import './user-orders-list.css';
import { Col, Container, Row } from "react-bootstrap";
import { getOrders } from '../../utils/apis/orders-dataprovider';

const UserOrdersList = () => {
  const [ordersList, setOrdersList] = useState()
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem('userDetails'))._id;
    getOrders(`/${id}`).then((res) => { console.log(res); setOrdersList(res.data) })
  }, [])
  return (
    <>
      <Container className={'pb-5'}>
        <div className={'text-center pb-5'}>
          <h1>Your Orders</h1>
        </div>
        <Row>
          <Col>
            <div className={'orderListHeading d-flex justify-content-evenly text-center'}>
              <div className={'fw-bold'} >orderId</div>
              <div className={'fw-bold'} >items</div>
              <div className={'fw-bold'} >totalAmount</div>
              <div className={'fw-bold'} >status</div>
            </div>
          </Col>
        </Row>
        <> {ordersList?.map((order, index) => {
          return (
            <Row key={index}>
              <Col>
                <div className={'orderListItem d-flex justify-content-evenly text-center'}>
                  <div>{order._id}</div>
                  <div style={{ maxWidth: '200px' }}>
                    {order.products?.map((prod, index) => {
                       return <div style={{width: '200px'}} key={index}>{prod.product?.name} x{prod.quantity}</div>
                    })}
                  </div>
                  <div>${order.totalAmount}</div>
                  <div>
                    <span className={order.status === 'Pending' || order.status === 'Food Processing' ? 'badge bg-warning' : order.status === 'Delivered' || order.status === 'Ordered' ? 'badge bg-success' : 'badge bg-danger'}>
                    {order.status}
                    </span>
                    </div>
                </div>
              </Col>
            </Row>
          )
        })}
        </>
      </Container>
      <Container className='bg-body-tertiary'>
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

export default UserOrdersList;

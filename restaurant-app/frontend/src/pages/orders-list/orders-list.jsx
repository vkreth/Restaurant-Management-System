import './orders-list.css';
import {Col, Container, Row, Table} from "react-bootstrap";
import Sidebar from "../../components/sidenavbar/sidenavbar.jsx";
import { updateOrder,getAllOrders } from '../../utils/apis/orders-dataprovider.js';
import { useEffect, useState } from 'react';

const OrdersList = () => {
  const [orders,setOrders]=useState([])
  useEffect(()=>{
    getAllOrders('/allOrders').then((res)=>setOrders(res.data))
  },[])
  const handleStatusChange=(id,stat)=>{
      updateOrder(`${id}`,stat).then(()=>{getAllOrders('/allOrders').then((res)=>setOrders(res.data))})
  }
  return (
    <Container style={{maxWidth: '1900px'}}>
      <Row>
        <Col sm={2}>
          <Sidebar />
        </Col>
        <Col>
          <h1>Orders</h1>
          <br/>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>Order ID</th>
              <th>Ordered By</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {/*  Loop through orders and display each order */}
            {orders.map((order) =>
              <tr key={order.orderId}>
                <td className={'w-25'}>{order._id}</td>
                <td>{order.user?.name}</td>
                <td>{order.status}</td>
                <td className={'w-25'}>
                  <select value={order.status} onChange={(e) => handleStatusChange(order._id,e.target.value)} className="form-select w-50" aria-label="Default select example">
                    <option value="Ordered">Ordered</option>
                    <option value="Food Processing">Food Processing</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default OrdersList;

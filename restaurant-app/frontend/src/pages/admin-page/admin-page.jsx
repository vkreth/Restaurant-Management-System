import {Card, Col, Container, Row} from "react-bootstrap";
import Sidebar from "../../components/sidenavbar/sidenavbar.jsx";
import {AiOutlineOrderedList, AiOutlineShoppingCart, AiOutlineUser} from "react-icons/ai";
import './admin-page.css';
import {useEffect, useState} from "react";
import {getDashboard} from "../../utils/apis/dashboard-provider.js";

const AdminPage = () => {
  const [dashboardData, setDashboardData] = useState({
    users: 0,
    foodItems: 0,
    orders: 0
  });

  useEffect(() => {
    getDashboard().then((data) => {
      setDashboardData(data);
    });
  }, []);
  return (
    <>
      <Container fluid className="h-100">
        <Row>
          <Col sm={3} md={2} className="bg-light vh-100">
            <Sidebar/>
          </Col>
          <Col>
            <Row className="justify-content-center mt-5">
              <Col sm={4}>
                <Card className={"bg-danger bg-gradient text-white"}>
                  <Card.Body className={'d-flex justify-content-between'}>
                    <div className="card-img">
                      <AiOutlineUser className={"card-icon"} />
                    </div>
                    <div className={'px-5 pt-1 pb-3 text-end'}>
                      <Card.Title className="mb-3 pb-4 fs-1 fw-bold">{dashboardData?.users || 0}</Card.Title>
                      <Card.Text className={"fs-4 fw-semibold"}>Users</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={4}>
                <Card className={"bg-success bg-gradient text-white"}>
                  <Card.Body className={'d-flex justify-content-between'}>
                    <div className="card-img w-50">
                      <AiOutlineOrderedList className={"card-icon"}/>
                    </div>
                    <div className={'px-5 pt-1 pb-3 text-end'}>
                      <Card.Title className="mb-3 pb-4 fs-1 fw-bold">{dashboardData?.foodItems || 0}</Card.Title>
                      <Card.Text className={"fs-4 fw-semibold"}>Food Items</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={4}>
                <Card className={"bg-info bg-gradient text-white"}>
                  <Card.Body className={'d-flex justify-content-between'}>
                    <div className="card-img">
                      <AiOutlineShoppingCart className={"card-icon"}/>
                    </div>
                    <div className={'px-5 pt-1 pb-3 text-end'}>
                      <Card.Title className="mb-3 pb-4 fs-1 fw-bold">{dashboardData?.orders || 0}</Card.Title>
                      <Card.Text className={"fs-4 fw-semibold"}>Orders</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminPage;

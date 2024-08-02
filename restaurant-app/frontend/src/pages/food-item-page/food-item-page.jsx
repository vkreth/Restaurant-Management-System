import Sidenavbar from "../../components/sidenavbar/sidenavbar.jsx";
import FoodItemList from "./food-item-list/food-item-list.jsx";
import {Col, Container, Row} from "react-bootstrap";
import FoodItemAdd from "./food-item-add/FoodItemAdd.jsx";

const FoodItemPage = () => {
  return (
    <>
      <Container fluid className="h-100">
        <Row>
          <Col sm={3} md={2} className="bg-light vh-100">
            <Sidenavbar />
          </Col>
          <Col>
            {window.location.pathname !== '/admin/foodItems/add' && <FoodItemList /> }
            {window.location.pathname === '/admin/foodItems/add' && <FoodItemAdd /> }
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FoodItemPage;

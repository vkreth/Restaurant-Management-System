import './about-page.css';
import {Col, Container, Row} from "react-bootstrap";

const AboutPage = () => {
  return (
    <>
      <Container className={'pb-5'}>
        <Row className={'text-center mb-5'}>
          <h1>About Us</h1>
          <p>
            We are a family owned restaurant that has been in business for over 20 years. We are located in the heart of
            downtown San Francisco. We offer a variety of dishes from around the world. Our chefs are trained in the art
            of cooking and are passionate about creating delicious meals for our customers. We take pride in using fresh
            ingredients and creating dishes that are both healthy and delicious. We are committed to providing excellent
            service and creating a warm and welcoming atmosphere for our customers. We look forward to serving you and
            hope that you enjoy your dining experience with us.
          </p>
        </Row>
        <Row className={'text-center mb-5'}>
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide our customers with delicious food and excellent service in a warm and welcoming atmosphere. We are committed to using fresh ingredients and creating dishes that are both healthy and delicious. We take pride in our work and are passionate about creating meals that our customers will love. We are dedicated to providing excellent service and creating a positive dining experience for our customers. We look forward to serving you and hope that you enjoy your dining experience with us.
          </p>
        </Row>
        <Row className={'text-center mb-5'}>
          <h2>Our Team</h2>
          <p>
            Our team is made up of talented chefs and dedicated staff who are passionate about creating delicious meals for our customers. Our chefs are trained in the art of cooking and are committed to using fresh ingredients to create dishes that are both healthy and delicious. Our staff is friendly and professional and is dedicated to providing excellent service to our customers. We work together as a team to create a positive dining experience for our customers and are committed to providing a warm and welcoming atmosphere for everyone who walks through our doors.
          </p>
        </Row>
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

export default AboutPage;

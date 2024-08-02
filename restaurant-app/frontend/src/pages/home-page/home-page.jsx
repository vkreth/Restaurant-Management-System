import {Col, Container, Row} from "react-bootstrap";
import './home-page.css';
import {Link} from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-body-tertiary">
      <Container className='py-5'>
        <Row>
          <Col className='ms-5'>
            <div className='hero-caption'>
              <p>Best Food Service</p>
              <p>In Town.</p>
            </div>
            <div className='hero-description'>
              <p>Choose us for a seamless and delightful food delivery experience. Enjoy your favorite dishes, crafted
                with the finest ingredients, delivered right to your doorstep.</p>
            </div>
          </Col>
          <Col>
            <img src="src/assets/images/img_illustration.svg" alt="food" className="img-fluid"/>
          </Col>
        </Row>
      </Container>
      <Container className={'py-3'}>
        <Row>
          <Col>
            <img src="src/assets/images/img_kindpng_3443995.png" alt="food" className="img-fluid p-5"/>
          </Col>
          <Col className='me-5'>
            <div className='hero-caption'>
              <p>Fast Delivery</p>
              <p>Every Time.</p>
            </div>
            <div className='hero-description'>
              <p>Our delivery team is always ready to bring you your favorite dishes in the shortest time possible.
                Order now and enjoy your meal in no time.</p>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className='mb-5 pb-5'>
        <Row>
          <Col>
            <div className='hero-caption text-center'>
              <p>Our Categories</p>
            </div>
            <div className='hero-description text-center'>
              <p>Choose from a wide range of categories and enjoy your favorite dishes from the best restaurants in
                town.</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className='text-center'>
            <Link to='/category/cake' className={'text-decoration-none text-dark'}>
              <img src="src/assets/images/category_items/cake.png" alt="food" className="img-fluid mt-5"/>
              <p className='category-title'>Cake</p>
            </Link>
          </Col>
          <Col className='text-center/dessert'>
            <Link to='/category' className={'text-decoration-none text-dark'}>
              <img src="src/assets/images/category_items/deserts.png" alt="food" className="img-fluid mt-5"/>
              <p className='category-title'>Dessert</p>
            </Link>
          </Col>
          <Col className='text-center'>
            <Link to='/category/noodles' className={'text-decoration-none text-dark'}>
              <img src="src/assets/images/category_items/noodles.png" alt="food" className="img-fluid mt-5"/>
              <p className='category-title'>Noodles</p>
            </Link>
          </Col>
          <Col className='text-center'>
            <Link to='/category/pasta' className={'text-decoration-none text-dark'}>
              <img src="src/assets/images/category_items/pasta.png" alt="food" className="img-fluid mt-5"/>
              <p className='category-title'>Pasta</p>
            </Link>
          </Col>
          <Col className='text-center'>
            <Link to='/category/pure-veg' className={'text-decoration-none text-dark'}>
              <img src="src/assets/images/category_items/pure_veg.png" alt="food" className="img-fluid mt-5"/>
              <p className='category-title'>Pure Veg</p>
            </Link>
          </Col>
          <Col className='text-center'>
            <Link to='/category/rolls' className={'text-decoration-none text-dark'}>
              <img src="src/assets/images/category_items/rolls.png" alt="food" className="img-fluid mt-5"/>
              <p className='category-title'>Rolls</p>
            </Link>
          </Col>
          <Col className='text-center'>
            <Link to='/category/salad' className={'text-decoration-none text-dark'}>
              <img src="src/assets/images/category_items/salad.png" alt="food" className="img-fluid mt-5"/>
              <p className='category-title'>Salad</p>
            </Link>
          </Col>
          <Col className='text-center'>
            <Link to='/category/sandwich' className={'text-decoration-none text-dark'}>
              <img src="src/assets/images/category_items/sandwich.png" alt="food" className="img-fluid mt-5"/>
              <p className='category-title'>Sandwich</p>
            </Link>
          </Col>
        </Row>
      </Container>
      <Container className='bg-body-secondary pb-5' style={{maxWidth: '1900px'}}>
        <Row>
          <Col className='text-center'>
            <div className='hero-caption'>
              <p>Get In Touch</p>
            </div>
            <div className='hero-description'>
              <p>Have any questions or concerns? Feel free to reach out to us. We are always ready to help you.</p>
            </div>
            <div className='hero-description'>
              <p>Email: <a href="mailto:johndoe@xyz.in">johndoe@xyz.in</a></p>
              <p>Phone: <a href="tel:+1234567890">+1234567890</a></p>
              <p>Address: 123, Main Street, City, Country</p>
              <p>Follow us on: <a href="https://www.facebook.com">Facebook</a>, <a
                href="https://www.twitter.com">Twitter</a>, <a href="https://www.instagram.com">Instagram</a></p>
              <p>Download our app: <a href="https://www.google.com">Google Play</a>, <a href="https://www.apple.com">App
                Store</a></p>
            </div>
          </Col>
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
    </div>
  );
};

export default HomePage;

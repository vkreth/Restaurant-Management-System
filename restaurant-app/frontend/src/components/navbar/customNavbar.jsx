import {Link,useNavigate} from 'react-router-dom';
import {Button, Container, Dropdown, Nav, Navbar} from "react-bootstrap";
import './customNavbar.css';
import {AiOutlineShoppingCart, AiOutlineUser} from "react-icons/ai";
import PropTypes from "prop-types";
import brandIcon from '../../assets/images/foodKing.png';
import { useEffect } from 'react';

const CustomNavbar = (props) => {
  const userDetails = localStorage.getItem('userDetails');
  const navigate=useNavigate()
  return (
    <>
    <Navbar bg="light" expand="lg" style={{maxWidth: '1900px'}}>
      <Container>
        <Navbar.Brand href="/home"><img style={{maxWidth: '150px'}} src={brandIcon}
                                        alt={'Brand Icon'}/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav activeKey='/home' className="me-auto centered-nav fs-5">
            {props.isAdmin &&
              <>
                <Nav.Item><Link className="text-decoration-none text-dark" to="/home">Home</Link></Nav.Item>
                <Nav.Item><Link className="ms-4 me-2 text-decoration-none text-dark" to="/foodMenu">Menu</Link></Nav.Item>
                <Nav.Item><Link className="me-4 ms-2 text-decoration-none text-dark" to="/about">About</Link></Nav.Item>
                <Nav.Item><Link className="text-decoration-none text-dark" to="/contact">Contact</Link></Nav.Item>
              </>
            }
          </Nav>
          <Nav className={'w-25'}>
            {props && <Link className="nav-link fs-4" to="/cart"><AiOutlineShoppingCart/></Link>}
            {
              userDetails ?
                <Dropdown>
                  <Dropdown.Toggle variant="outline-light" id="dropdown-basic" className="nav-link fs-4">
                    <AiOutlineUser/>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => navigate('/orders')}>Orders</Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                      localStorage.removeItem('userDetails'); // Assuming this is how you handle logout
                      // history.push('/login');
                      navigate('/login')
                    }}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> :
                <Link className="nav-link mt-1" to="/login"><Button type='button' variant='outline-danger'
                                                                    className={'py-1 rounded-4'}>Sign In</Button></Link>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
};

CustomNavbar.propTypes = {
  isAdmin: PropTypes.bool
};

export default CustomNavbar;

import {Container, Form, Button, Card, InputGroup, FormControl} from 'react-bootstrap';
import './auth.css';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai';
import PropTypes from "prop-types";
import {loginUser, registerUser} from './../../utils/apis/user-dataprovider';

const Auth = () => {
  const isLogin = window.location.pathname === '/login' || window.location.pathname === '/';
  return (
    <Container className='bg-image d-flex align-items-center min-vh-100 min-vw-100 bg-body-secondary'>
      <Card style={{marginLeft: '6%', minWidth: '400px'}} className='w-25 h-50 pb-5 px-5 mb-5 rounded-4 bg-white'>
        <div className='w-100 text-center'>
          <img src="src/assets/images/foodKing.png" alt='login'/>
        </div>
        {isLogin ? <LoginForm/> : <RegisterForm/>}
      </Card>
    </Container>
  );
}

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault();
    // Add validation logic here
    loginUser("/users/login", {email, password}).then((res) => {
      localStorage.setItem("userDetails", JSON.stringify(res.data));
      navigate('/home')
    });
  }
  return (
    <>
      <div className='text-center mb-2 fw-semibold fs-5'>Welcome back!</div>
      <Form className='text-center' onSubmit={handleLogin}>
        <Form.Group className='mb-3' controlId="formBasicEmail">
          <Form.Control type="text" placeholder="Your Email" value={email}
                        onChange={event => setEmail(event.target.value)}/>
        </Form.Group>
        <PasswordInputField password={password} setPassword={setPassword}/>
        <Button className={'w-75 mb-2'} variant="outline-danger" type="submit">
          Login
        </Button>
        <div className='mb-3'>
          <Link style={{textDecoration: 'none', fontSize: '0.9em'}} className='text-primary' to='/register'>Don&apos;t
            have an account?</Link>
        </div>
      </Form>
    </>
  );
}

const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({email: "", mobile: "", password: ""});
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault();
    const reqData = {
      name: registerData.name,
      email: registerData.email,
      mobile: registerData.mobile,
      password: password
    }
    // Add validation logic here

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    console.log('Registering with:', registerData.email, registerData.mobile, registerData.password);
    registerUser('/users/signup', reqData).then((res) => {
      console.log("Registration Successful with email:" + registerData.email);
      navigate('/login')
      console.log(res)
    })
  };

  const handleChange = (event) => {
    setRegisterData({
      ...registerData,
      [event.target.name]: event.target.value
    })
  }

  return (
    <>
      <div className='text-center mb-2 fw-semibold fs-5'>Create an account</div>
      <Form className='text-center' onSubmit={handleRegister}>
        <Form.Group className='mb-3' controlId="formBasicName">
          <Form.Control type="text" name="name" placeholder="Your Name" value={registerData.name}
                        onChange={handleChange}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId="formBasicEmail">
          <Form.Control type="email" name="email" placeholder="Your Email" value={registerData.email}
                        onChange={handleChange}/>
        </Form.Group>
        <Form.Group className='mb-3' controlId="formMobile">
          <Form.Control name="mobile" type="text" placeholder="Mobile Number" value={registerData.mobile}
                        onChange={handleChange}/>
        </Form.Group>
        <PasswordInputField password={password} setPassword={setPassword}/>
        <PasswordInputField password={confirmPassword} setPassword={setConfirmPassword}/>
        <Button className={'w-75 mb-2'} variant="outline-danger" type="submit">
          Register
        </Button>
        <div className='mb-3'>
          <Link style={{textDecoration: 'none', fontSize: '0.9em'}} className='text-primary' to='/login'>Already have an
            account?</Link>
        </div>
      </Form>
    </>
  );
}

const PasswordInputField = ({password, setPassword}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form.Group className='mb-3' controlId="formBasicPassword">
      <InputGroup>
        <FormControl
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <InputGroup.Text onClick={togglePasswordVisibility}>
          {showPassword ? <AiFillEyeInvisible/> : <AiFillEye/>}
        </InputGroup.Text>
      </InputGroup>
    </Form.Group>
  );
};

PasswordInputField.propTypes = {
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default Auth;

import { Button, Card, Container } from 'react-bootstrap';
import {AiOutlineCheckCircle, AiOutlineExclamationCircle} from "react-icons/ai";
import {useEffect} from "react";
import {updateOrder} from "../../utils/apis/orders-dataprovider.js";
import {useNavigate} from "react-router-dom";
export const Verify = () => {
  const navigate = useNavigate();
  const success = new URLSearchParams(window.location.search).get('success') === 'true';
  const orderId = new URLSearchParams(window.location.search).get('orderId');

  useEffect(() => {
    if (success.toString() === 'true'){
      updateOrder(orderId, 'Food Processing').then(() => {
        setTimeout(() => navigate('/orders'), 3000);
      });
    } else {
      updateOrder(orderId, 'Failed').then(() => {
        setTimeout(() => navigate('/orders'), 3000);
      });
    }
  }, [navigate, orderId, success]);

  return (
    <>
      {success ? <SuccessMessage/> : <FailedMessage/>}
    </>
  )
}

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Button className={'bg-white text-secondary border-0 fs-5 mt-3'} disabled>
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
        &nbsp;Loading...
      </Button>
    </div>
  )
}

const SuccessMessage = () => {
  return (
    <div className="vh-100">
      <Container className="d-flex pt-5 justify-content-center align-items-center">
        <Card className="p-4 w-50 text-center">
          <Card.Body className={'fs-1'}>
            <AiOutlineCheckCircle className="text-center fs-1 text-success"/>
            <h1 className="text-center">Payment Success</h1>
            <div className="text-center fs-5 pt-2">Do not reload the page or press back button</div>
            <LoadingSpinner/>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

const FailedMessage = () => {
  return (
    <div className="vh-100">
      <Container className="d-flex pt-5 justify-content-center align-items-center">
        <Card className="p-4 w-50 text-center">
          <Card.Body className={'fs-1'}>
            <AiOutlineExclamationCircle className="text-center fs-1 text-danger"/>
            <h1 className="text-center">Payment Failed</h1>
            <div className="text-center fs-5 pt-2">Do not reload the page or press back button</div>
            <LoadingSpinner/>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default Verify;

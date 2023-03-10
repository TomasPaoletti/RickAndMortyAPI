import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../db/firebase';
import { getCurrentUser, loadingUser } from '../../reducers/userSlice';
import { onAuthStateChanged } from 'firebase/auth';
import AvailableUsers from '../AvailableUsers/AvailableUsers';
import Loader from '../Loader/Loader';
import "./Home.css";

function Home() {

  const loading = useSelector(state => state.user.loading)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(loadingUser(true))
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(getCurrentUser(userAuth))
      } else {
        dispatch(loadingUser(false))
        return navigate("/login")
      }
    })

    return () => {
      unsubscribe()
    }
  }, []);

  if (loading === true) {
    return <Loader />
  };

  return (
    <Container fluid className='home'>
      <Row className="justify-content-center">
        <Col sm={8}>
          <AvailableUsers />
        </Col>
      </Row>
    </Container>
  )
}

export default Home
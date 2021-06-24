import React, {useState} from "react"
import { Nav, Navbar, Modal, Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import {FiLogOut, FiLogIn} from 'react-icons/fi'
import {BsHouse, BsWallet} from 'react-icons/bs'
import {CgProfile} from 'react-icons/cg'
import {FaCog} from 'react-icons/fa'
import '../components/CSS/Nav.css'
import { useAuth } from "../Context/AuthContext"
import {useHistory} from "react-router-dom"
import Login from '../components/Login'

function CustomNav(){
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  let userEmail= currentUser.email
  let userName= userEmail.substr(0, userEmail.indexOf('@')); 

  async function handleLogout(){
    setError(' ')

    try {
      await logout()
      history.push('/')
    }
    catch{
      setError('failed to log out')
      console.log(error);
    }
  }


  return(
    <>
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">
        Crypto <strong>Compare</strong>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          { !currentUser && 
          <>
          <Nav.Link href="/"><BsHouse/> Home</Nav.Link>
            <Button variant="primary" onClick={handleShow} className="loginBtn">
              <FiLogIn/> Login
          </Button>
          </>
          }
          { currentUser &&
          <>
          <Nav.Link href="/Dashboard"><BsHouse/> Home</Nav.Link>
          <Nav.Link href="/Portfolio"><BsWallet/> Portfolio</Nav.Link>
          <Dropdown alignRight>
            <Dropdown.Toggle id="dropdown-basic" as="p">
              {/* {error && <Alert variant="danger">{error}</Alert>} */}
               {/* <img src={`${process.env.PUBLIC_URL}/Assets/carl.jpg`} className="profilepic" alt="user"></img> */}
               <CgProfile/> {userName}
            </Dropdown.Toggle>
            <Dropdown.Menu >
              <Dropdown.Item href="#">Profile <CgProfile className="ddicon"/></Dropdown.Item>
              <Dropdown.Item href="/Settings">Settings <FaCog className="ddicon"/></Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Log Out <FiLogOut className="ddicon"/></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body><Login/></Modal.Body>
      </Modal>
    </>
  )
}

export default CustomNav
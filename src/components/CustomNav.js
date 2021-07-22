import React, {useState} from "react"
import { Nav, Navbar, Modal, Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import {FiLogOut, FiLogIn} from 'react-icons/fi'
import {BiCaretDown} from 'react-icons/bi'
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
  
  let userName = ''

  if(currentUser){
  let userEmail= currentUser.email
  userName= userEmail.substr(0, userEmail.indexOf('@')); 
  } else {
    userName = ''
  }

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
<Navbar collapseOnSelect expand="lg" bg="light" variant="light">
{ !currentUser && 
      <Navbar.Brand href="/">
        Crypto<strong>Compare</strong>
      </Navbar.Brand>
}
{ currentUser && 
      <Navbar.Brand href="/Dashboard">
        Crypto<strong>Compare</strong>
      </Navbar.Brand>
}
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
          <Nav.Link href="/Dashboard"><BsHouse style={{marginTop: "-6px"}}/> Home</Nav.Link>
          <Nav.Link href="/Portfolio"><BsWallet style={{marginTop: "-6px"}}/> Portfolio</Nav.Link>
          <Dropdown alignRight>
            <Dropdown.Toggle id="dropdown-basic" as="p">
              {/* {error && <Alert variant="danger">{error}</Alert>} */}
               {/* <img src={`${process.env.PUBLIC_URL}/Assets/carl.jpg`} className="profilepic" alt="user"></img> */}
               <CgProfile style={{marginTop: "-6px"}}/> {userName} <BiCaretDown style={{marginTop: "-6px"}}/>
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
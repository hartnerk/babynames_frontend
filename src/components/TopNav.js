import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import logo from '../styles/resources/binkylogo.png'

// COMPONENTS
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavDropdown } from 'react-bootstrap'

function TopNav() {
  const [names, setNames] = useState([])
  const [isAuth, setIsAuth] = useState(false)
  

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true)
    }
  }, [])

  async function handelLogout(e) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.replace('http://localhost:3000/login');
  }

  return (
    <Navbar style={{ boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.5)', height: '65px' }}>
      <Navbar.Brand style={{ color: '#AD588C', fontSize: '28px' }}>
        <img
          src={logo}
          alt='logo'
          height={'60px'}
        />
        &nbsp;
        baby swiper
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Nav className="mr-sm-2">
          {isAuth === true ? (
            <Fragment>
              <NavDropdown title="Menu" alignRight >
                <NavDropdown.Item>
                  <Link to='/user-profile' style={{ color: '#AD588C' }}>Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to='/liked-names' style={{ color: '#AD588C' }}>Liked Names</Link>
                </NavDropdown.Item>
                
                  {
                  localStorage.couple_id != 'undefined' ?
                  <NavDropdown.Item>
                  <Link to='/matchpage' style={{ color: '#AD588C' }}>Matches</Link> 
                  </NavDropdown.Item> : 
                  ''
                  }
                
                <NavDropdown.Item>
                  <Link to='/recommendations' style={{ color: '#AD588C' }}>Recommendations</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link onClick={handelLogout} style={{ color: '#AD588C' }}>Logout</Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Fragment>
          ) : (
            <Fragment>
              <NavDropdown title="Menu">
                <NavDropdown.Item>
                  <Link to='/login'>Login</Link>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <Link to='/signup'>Signup</Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Fragment>
          )}
        </Nav>
      </Navbar.Collapse >
    </Navbar >
  )
}


export default TopNav

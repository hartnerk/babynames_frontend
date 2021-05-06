import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'


// COMPONENTS
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavDropdown } from 'react-bootstrap'

function TopNav() {
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
    <Navbar>
      <Navbar.Brand>Baby Name Matcher</Navbar.Brand>
      <Navbar.Collapse>
        <Nav className="mr-auto">
        {isAuth === true ? (
          <Fragment>
            <NavDropdown title="Actions">
              <Link to='/user-profile'>Profile</Link>
              <Link onClick={handelLogout}>Logout</Link>
            </NavDropdown>
          </Fragment>
        ) : (
          <Fragment>
            <NavDropdown title="Actions">
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
      </Navbar.Collapse>
    </Navbar>
  )
}


export default TopNav

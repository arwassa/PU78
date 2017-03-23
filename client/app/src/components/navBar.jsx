import React from "react";
import {Col, Navbar, Nav, NavItem, NavDropdown, MenuItem, Image, Button, Glyphicon, Tooltip} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';


export class NavBar extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    let userNav = this.props.currentUser ?
      <Navbar.Collapse>
        <Nav>
          <NavDropdown eventKey={2} title="Fag" id="basic-nav-dropdown">
            <MenuItem eventKey={2.1} href="/fghj">Action</MenuItem>
            <MenuItem eventKey={2.2}>Another action</MenuItem>
            <MenuItem eventKey={2.3}>Something else here</MenuItem>
            <MenuItem divider />
          </NavDropdown>
        </Nav>
        <Navbar.Text pullRight>
          Bruker: {this.props.currentUser.fullname}
        </Navbar.Text>
        <Navbar.Form pullRight>
          <Button href="/api/v1/logout" bsStyle="primary"><Glyphicon glyph="log-out" /> Logg ut</Button>
        </Navbar.Form>
      </Navbar.Collapse>:
      <Navbar.Collapse>
        <Navbar.Form pullRight>
          <Button href="/api/v1/login" bsStyle="primary"><Glyphicon glyph="user" /> Logg inn</Button>
        </Navbar.Form>
      </Navbar.Collapse>

    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/home">
                <img src="assets/images/logo.png" height="150%"/>
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          {userNav}
        </Navbar>
      </div>
    )
  }
}

const tooltipHome = (
  <Tooltip id="tooltip"><strong>Holy guacamole!</strong> Check this info.</Tooltip>
);

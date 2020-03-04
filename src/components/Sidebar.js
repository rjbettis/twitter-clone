import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav';

export class Sidebar extends Component {
  render() {
    return (
      <Nav defaultActiveKey="/home">
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/explore">Explore</Nav.Link>
        <Nav.Link href="/notifications">Notifications</Nav.Link>
        <Nav.Link href="/messages">Messages</Nav.Link>
        <Nav.Link href="/bookmarks">Bookmarks</Nav.Link>
        <Nav.Link href="/lists">Lists</Nav.Link>
        <Nav.Link href="/profile">Profile</Nav.Link>
        <Nav.Link href="/more">More</Nav.Link>
      </Nav>
    );
  }
}
export default Sidebar;

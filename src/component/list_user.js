import React, { Component } from 'react';
import User from './user';

class ListUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
        users: [] 
        
    }
  }

  render() {
    let users = this.props.userList;
    const trItem = users.map((item,index) => (
      <User
        key={index}
        user={item}
        index={index}
        editUserSubmit={this.props.editUserSubmit}      
        deleteUser={this.props.deleteUser}
        getUserEdit={this.props.getUserEdit}
      />
    ));
    return <tbody>{trItem}</tbody>;
  }

}

export default ListUser;

import React, { Component } from 'react';
import ListUser from './list_user';
import Form from "./form"

const userList = [
  {id:1,name:'John Doe',email:'React Redux School'},
  {id:2,name:'Jane Doe',email:'React Redux School'},  
  {id:3,name:'Terry Adams',email:'React Redux School'},
  {id:4,name:'Jenny Smith',email:'React Redux School'}
];

if (localStorage.getItem("users") === null) {
  localStorage.setItem('users', JSON.stringify(userList));
}

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: userList,
      isShownForm: false,
      userChosenEdit: {},
      newUser: {},
      createUser: false
    }
  }

  componentWillMount() {
    let userList = JSON.parse(localStorage.getItem("users"));
    this.setState({
      userList: userList
    });
  }

  addNewUser = () => {
    this.setState({
      newUser: [{  
        id: this.state.userList.slice(-1)[0]["id"] + 1, name: '', email: '' 
      }][0],
      isShownForm: !this.state.isShownForm,
      createUser: !this.state.createUser
    });
  }

  createUser1 = user => {
    this.state.userList.push(user);
    this.setState({
      userList: this.state.userList,
      isShownForm: !this.state.isShownForm,
      createUser: !this.state.createUser
    });

    localStorage.setItem(
      'users',
      JSON.stringify(userList)
    );
  }

  getUserEdit = (id, name, email) => {
    this.setState({
      isShownForm: !this.state.isShownForm,
      userChosenEdit: {id: id, name: name, email: email},
      createUser: !this.state.createUser
    });
  }

  deleteUser = id => {
    let r = window.confirm("Do you want to delete this user");

    if (r === true) {
      let filteredUserList = this.state.userList.filter(

        x => x.id !== id
      );

      this.setState({
        userList: filteredUserList
      });

      localStorage.setItem(
        'users',
        JSON.stringify(filteredUserList)
      );
    }
  }

  editUserSubmit = (id, name, email) => {
  }

  updateUser = (id, name, email) => {
    let userListCopy = this.state.userList.map((user) => {
    
      if (user.id === id) {
        user.name = name;
        user.email = email;
      }

      return user;
    });

    this.setState({
      userList: userListCopy,
      isShownForm: !this.state.isShownForm
    });

    localStorage.setItem(
      'users',
      JSON.stringify(userListCopy)
    );
  }

  cancelUpdate = () => {
    this.setState({
      isShownForm: !this.state.isShownForm
    });
  }

  render() {
    const {id, name, email} = this.state.userChosenEdit;
    let form;
    if(this.state.isShownForm){
      form = <Form
        userChosenEdit = {this.state.userChosenEdit}
        addNewUser = {this.addNewUser}
        updateUser = {this.updateUser}
        cancelUpdate = {this.cancelUpdate}
        newUser = {this.state.newUser}
        createUser = {this.state.createUser}
        createUser1 = {this.createUser1}
        />
    }

    return (
      <div className="content">
        <div class="list-users">
          <div className="left">
            <p>List user</p>
            <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <ListUser
                deleteUser={this.deleteUser}
                userList={this.state.userList}
                editUserSubmit={this.editUserSubmit}
                getUserEdit={this.getUserEdit}
              />
            </table>

            <button
              className="btn-add-user"
              onClick={this.addNewUser}>
              Add User
            </button>
          </div>
          <div className="right">
            {form}
          </div>
        </div>
      </div>
    );
  }
}

export default Body;

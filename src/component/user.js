import React, { Component } from 'react';
import Form from "./form"


class User extends Component {
  constructor(props){
    super(props);
    this.state ={ isEdit: false }
  }

  deleteUser = () => {
    const {id} = this.props.user;
    this.props.deleteUser(id);
  }

  editUser = () => {
    this.setState({
      isEdit : !this.state.isEdit
    })
  }

  editUserSubmit = () => {
    const {id} = this.props.user;
    this.setState({
      isEdit : !this.state.isEdit
    });
     
    this.props.editUserSubmit(
      id,
      this.nameInput.value,
      this.emailInput.value
    );
  }

  getUserEdit = () => {
    const {id, name, email} = this.props.user;
    this.props.getUserEdit(
      id, name, email
    )
  }

  render() {
    const {name, email} = this.props.user;

    return (
      this.state.isEdit === true ? (
        <tr className="bg-warning" key={this.props.index}>
          <td>
            <input ref={nameInput => this.nameInput = nameInput} defaultValue ={name}/>
          </td>
          <td><input defaultValue={email} ref={emailInput => this.emailInput = emailInput}/>
          </td>
          
          <td><i onClick={this.editUserSubmit}>Edit</i>
          </td>
          <td><i>Delete</i></td>
        </tr>
      ) : (
        <tr key={this.props.index}>
          <td>{name}</td>
          <td>{email}</td>
          <td><button className="far fa-edit" onClick={this.getUserEdit}>Edit</button></td>
          <td><button className="fas fa-trash" onClick={this.deleteUser}>Delete</button></td>
        </tr>
      )
      );
  }
}

export default User;

import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
        users: [],
        isDisplayForm: false,
        userEdit: {},
        isGetEdit: true,
        isAddUser: false,
        isShowButton: false,
        errors: {}
    }
  }

  updateUser = () => {
    const {id ,name, email} = this.props.userChosenEdit;
    this.props.updateUser(id, this.nameInput.value, this.emailInput.value);
  }

  cancelUpdate = () => {
    this.props.cancelUpdate();
  }

  addNewUser = () => {
    let {id} = this.props.newUser;
    this.props.createUser1({id: id, name: this.nameInput.value, email: this.emailInput.value})
  }

  handleChange = (e) => {
    const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let email = e.target.value;
    const checkingResult = regexp.exec(email);
    let errors = {}
    if(!checkingResult) {
      errors["email"] = "Email invalid"
    }

    if (email.trim().length === 0){
      errors["email"] = "Require"
    }
    this.setState({
      errors: errors
    })
  }
  
  render() {
    let id, name, email
    let btn
    
    if(this.props.createUser) {
      id = this.props.newUser["id"]
      name = this.props.newUser["name"]
      email = this.props.newUser["email"]
      btn = <button onClick={this.addNewUser}>Save</button>
    } else {
      id = this.props.userChosenEdit["id"]
      name = this.props.userChosenEdit["name"]
      email = this.props.userChosenEdit["email"]
      btn = <button onClick={this.updateUser}>Save</button>
    }
    
    return (
      <div className="form-info">
          <label>Name</label>
          <input defaultValue ={name} ref={nameInput => this.nameInput = nameInput} placeholder="Your name.."/>
          <span style={{color: "red"}}>{this.state.errors["name"]}</span>
          <br></br>
          <label>Email</label>
          <input onChange={this.handleChange} defaultValue={email} ref={emailInput => this.emailInput = emailInput} placeholder="Your email.."/>
          <span style={{color: "red"}}>{this.state.errors["email"]}</span>
          <div class="btn-action">
            <button onClick={this.cancelUpdate}>Cancel</button>
            {btn}
          </div>
      </div>
    );
  }
}

export default Form;

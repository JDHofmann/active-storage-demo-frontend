import './App.css';
import React from 'react'
// import {  Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux'
import {fetchUsers, fetchCurrentUser, addNewUser, deleteUser, editUser } from './redux/actions'
import { UserCard } from './UserCard';

class App extends React.Component {

  state = {
    avatar: null,
    name: "",
    avatarUrl: null
  }

  componentDidMount(){
    this.props.fetchUsers()
  }

  renderUsers = () => {
    return this.props.users.map(user => 
    <UserCard 
      user={user}
      key={user.id}
      fetchCurrentUser={this.props.fetchCurrentUser}
      deleteUser={this.props.deleteUser}
      editUser={this.props.editUser}
    />
    )
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value})
  }

  handleFileChange = (e) => {
    const uploadingFile = e.target.files[0]
    const fileReader = new FileReader();
    // fileReader has event 
    fileReader.onloadend = () => {
      this.setState({
        avatar: uploadingFile,
        avatarUrl: fileReader.result
      })
    }
    if (uploadingFile){
      fileReader.readAsDataURL(uploadingFile)
    } 
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('user[name]', this.state.name)
    if(this.state.avatar){
      formData.append('user[avatar]', this.state.avatar)
    }
    this.props.addNewUser(formData)
    this.setState({
      avatar: null,
      name: "",
      avatarUrl: null
    })
  }

  render(){
    
    const preview = this.state.avatarUrl ? <div>
      <h3>Here's how your image will look, cool?</h3>
      <img src={this.state.avatarUrl}></img>
    </div> : null

    return (
      <div className="App">
          {this.renderUsers()}
          <form onSubmit={this.handleSubmit}>
            <input 
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              >
            </input>
            <input 
              type="file"
              name="avatar"
              onChange={this.handleFileChange}
            >
            </input>
            <button type="submit">
              Create User
            </button>
          </form>
          { preview }
          { this.props.currentUser ?
          <>
          <h2>{this.props.currentUser.user.name}</h2>
          <img src={`http://localhost:3000/${this.props.currentUser.avatar}`}></img></>
        : 
        "nothing yet" }
          
      </div>
    );

  }
}

const msp = state => {
  return {
    users: state.users,
    currentUser: state.currentUser
  }
}

const mdp = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchCurrentUser: (id) => dispatch(fetchCurrentUser(id)),
    deleteUser: (id) => dispatch(deleteUser(id)),
    addNewUser: (newUserFormData) => dispatch(addNewUser(newUserFormData)),
    editUser: (updatedUser) => dispatch(editUser(updatedUser))
  }
}

export default connect(msp, mdp)(App);

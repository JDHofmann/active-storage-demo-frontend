import './App.css';
import React from 'react'
import {  Route, Switch } from 'react-router-dom';

class App extends React.Component {

  state = {
    users: [],
    currentUser: "",
    avatar: null,
    name: "",
    avatarUrl: null
  }

  componentDidMount(){
    fetch("http://localhost:3000/users")
    .then(resp => resp.json())
    .then(data => this.setState({users: data}))
    fetch("http://localhost:3000/users/10")
    .then(resp => resp.json())
    .then(data => this.setState({currentUser: data}))
  }

  renderUsers = () => {
    return this.state.users.map(user => 
      <div contenteditable="true" key={user.name}>
        <h2>{user.name}</h2>
      </div>
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

    let options = {
      method: "POST",
      body: formData
    }
    fetch("http://localhost:3000/users", options)
    .then(resp => resp.json())
    .then(data => this.setState( prevState => ({...prevState, data})))
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
          { this.state.currentUser ?
          <>
          <h2>{this.state.currentUser.user.name}</h2>
          <img src={`http://localhost:3000/${this.state.currentUser.avatar}`}></img></>
        : 
        "nothing yet" }
          
      </div>
    );

  }
}

export default App;

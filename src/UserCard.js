import React from 'react'

export class UserCard extends React.Component{

    state = {
        editable: false,
        name: this.props.user.name
    }

    handleClick = () => {
        // console.log(props.user.id)
        this.props.fetchCurrentUser(this.props.user.id)
    }

    handleDelete = () => {
        // console.log("delete")
        this.props.deleteUser(this.props.user.id)
    }

    handleEdit = () => {
        this.setState({
            editable: true
        })
        // props.editUser(props.user.id)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let updatedUser = {...this.props.user}
        updatedUser.name = this.state.name 
        // console.log(updatedUser)
        this.props.editUser(updatedUser)
        this.setState({ editable: false })
    }

    renderForm = () => {
        return this.state.editable ? 
        <form onSubmit={this.handleSubmit}>
            <input
                value={this.state.name}
                name="name"
                onChange={this.handleChange}
            ></input>
        </form> 
        : null
    }

    render(){

        return(
            <div>
                <h2>{this.props.user.name}</h2>
                <button onClick={this.handleClick}>Select</button>
                <button onClick={this.handleEdit}>Edit</button>
                <button onClick={this.handleDelete}>Delete</button>
                {this.renderForm()}
            </div>
        )
    }
}
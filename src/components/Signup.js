import React, { Component } from 'react'
import '../index.css'
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import  {  withRouter}  from 'react-router'

export default  class Signup extends Component {



    handleChange = (event) => {
    event.preventDefault()
    
    this.setState({
    [event.target.name]: event.target.value
    })
    }

    render() {
        const SignupWithRouter = withRouter(Signup)
        
        return (


            <div id="main-registration-container">
            <div id="register">

               <h3>Sign Up</h3>

               <form method="post"  name="userRegistrationForm"  onSubmit= {(e) =>this.props.handleSubmit(e, this.state)} >

               <label>Username</label>
               <input type="text" name="currentUsername" onChange={(event) => this.props.handleChange(event)}/>
               <div className="errorMsg"></div>

               <label>Password</label>
               <input type="password" name="password" />
               <div className="errorMsg"></div>

               <button > submit
               </button>
               </form>


           </div>
       </div>
                
           
        )
    }
}

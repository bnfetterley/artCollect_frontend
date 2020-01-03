import React, { Component } from 'react'
import '../index.css'
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import  {  withRouter}  from 'react-router'

export default  class Signup extends Component {



    state = {
          username:'',
          bio:'',
        }

        // handleSubmit = (event) => {
        //     console.log(event)
        //     event.preventDefault()
        //     fetch('http://localhost:3000/users', {
        //         method:'POST',
        //        headers: { 
        //            'Content-type': 'application/json',
        //            'accept': 'application/json'
        //        },
        //        body: JSON.stringify({
        //       username: this.state.username
            
        //         })
        //       })
        //       .then(resp => resp.json())
        //       .then(json_resp => 
        //         this.setState({
        //             currentUserID: json_resp.id
        //         })
        //         )
// this.redirect()                

        // }

        // redirect = () => {
        //     console.log(this.props)
        //     this.props.history.push("/home")
        // }

        handleChange = (event) => {
            event.preventDefault()
        
            this.setState({
             [event.target.name]: event.target.value
            })
          }
        
      
        

    render() {
        const SignupWithRouter = withRouter(Signup)
        console.log(this.state)
        return (
            <div id="main-registration-container">
            <div id="register">
               <h3>Sign Up</h3>
               <form method="post"  name="userRegistrationForm"  onSubmit= {(e) =>this.props.handleSubmit(e, this.state)} >
               <label>Username</label>
               <input type="text" name="username" onChange={(event) => this.handleChange(event)}/>
               <div className="errorMsg"></div>
               <label>Password</label>
               <input type="text" name="emailid" onChange={(event) => this.handleChange(event) }/>
               <div className="errorMsg"></div>
               <button > submit
               </button>
               </form>
           </div>
       </div>
                
           
        )
    }
}

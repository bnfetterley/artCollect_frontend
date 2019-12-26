import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact"
// import { MDBRow } from "mdbreact"
import '../index.css'
import Modal from './Modal/Modal'

export default class UserCollection extends Component {

    state = {
        isShowing: false,
        currentArtwork: null
    }

    openModalHandler = (event, post) => {
        console.log(post)
        this.setState({
            isShowing: true,
            currentArtwork: post
        });
    }

    closeModalHandler = (event, post) => {
        console.log(post)
        this.setState({
            isShowing: false
        });
    }
  
    render() {
console.log(this.props)
        return (

        <div class="container">

{ this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }

<Modal
    currentArtwork = {this.state.currentArtwork}
    className="modal"
    show={this.state.isShowing}
    close={this.closeModalHandler}>
        <div> SHOW INFO
           <p> Artist: 
            </p> 
            <p>[username's] thoughts on this artwork:  </p>

            <p> <b>COMMENTS: </b> </p>



            <form onSubmit={this.handleSubmit}>
        <label>
         What do you think? Add a comment below!<p>
          <textarea value={this.state.value} onChange={this.handleChange} />
          </p> </label> 
        <input type="submit" value="Submit" />
      </form>
      
             </div>
</Modal>


<MDBContainer>
<h1> BRIS COLLECTION </h1>
      <MDBRow>
{this.props.posts.map(post =>  
      <MDBCol size="6" md={this.props.size}  onClick = {(event) => this.openModalHandler(event, post)}>
        <img src = {post.image} className="img-responsive fit-image"/>
        </MDBCol>

      )
      }
        </MDBRow>
      </MDBContainer>
      </div>

        
        )}
}


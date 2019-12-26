import React, { Component } from 'react'
// import StackGrid from "react-stack-grid"
import { MDBContainer, MDBRow, MDBCol } from "mdbreact"
// import { MDBRow } from "mdbreact"
import '../index.css'
import Modal from './Modal/Modal'


export default class Artworks extends Component {

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
        let classArray = ["col-12 col-md-8 ","col-6 col-md-4", "col-6"]
        // let images = this.props.posts.map(post => post.image)  
        // let posts =  this.props.posts.map(post => post)  
        // let ids = this.props.posts.map(post => post.id)  
        
        console.log(this.state.currentArtwork)
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
      <MDBRow>
{this.props.posts.map(post =>  
      <MDBCol size="6" md={this.props.size}  onClick = {(event) => this.openModalHandler(event, post)}>
        <img src = {post.image} className="img-responsive fit-image"/>
        </MDBCol>

      )
      }
        </MDBRow>
      </MDBContainer>

  {/* <MDBContainer>
      <MDBRow>
      <MDBCol size="6" md="4"  onClick = {(event) => this.openModalHandler(event)}>
        <img src = {this.props.post.image} className="img-responsive fit-image"/>
        </MDBCol>
      </MDBRow> */}
        {/* <MDBCol size="6" md="4" onClick = {(event, post) => this.openModalHandler(event, post)}>
        <img src =  {this.props.post.image}className="img-responsive fit-image"/>
        </MDBCol> )
      </MDBRow>

      <MDBRow>
        <MDBCol size="6" md="4">
        <img src =  {this.props.post.image} className="img-responsive fit-image"/>
        </MDBCol>
        <MDBCol size="6" md="4">
        <img src =  {this.props.post.image} className="img-responsive fit-image"/>
        </MDBCol>
        <MDBCol size="6" md="4">
        <img src =  {this.props.post.image} className="img-responsive fit-image"/>
        </MDBCol>
      </MDBRow>

      <MDBRow>
        <MDBCol size="6">
        <img src =   {this.props.post.image}  class="img-responsive fit-image"/>
        </MDBCol>
        <MDBCol size="6">
         <img src =   {this.props.post.image} class="img-responsive fit-image"/>
        </MDBCol>
      </MDBRow>

        // </MDBContainer> */}
{/* </MDBContainer> */}
</div>

        
         ) }
}

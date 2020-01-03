import React, { Component } from 'react'
// import StackGrid from "react-stack-grid"
// import { MDBContainer, MDBRow, MDBCol } from "mdbreact"
// import { MDBRow } from "mdbreact"
import '../index.css'
import Modal from './Modal/Modal'
import StackGrid from "react-stack-grid"


export default class Artworks extends Component {

    state = {
        isShowing: false,
        currentArtwork: "artwork",
        comment: ''
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

    handleChange = (event) => {
        event.preventDefault()
    
        this.setState({
         [event.target.name]: event.target.value
        })
      }
  
    
    render() {
        let classArray = ["col-12 col-md-8 ","col-6 col-md-4", "col-6"]
        let currentUser = this.props.users.find(user => user.id === this.state.currentArtwork.user_id)
        // let currentUsername = currentUser.username
        let renderComments = this.props.comments.filter(comment => comment.post_id === this.state.currentArtwork.id)

        console.log(this.props)
      

        return (

<div class="container">

{ this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }

{this.state.isShowing ?  <Modal
    currentArtwork = {this.state.currentArtwork}
    className="modal"
    show={this.state.isShowing}
    close={this.closeModalHandler}>
        <div> SHOW INFO <br></br>

        <img src = {this.state.currentArtwork.image} className="image fit-image" />
           <p> Artist:  {this.state.currentArtwork.artist}
            </p> 
    
            <p>
               USERNAME's  thoughts on this artwork: {this.state.currentArtwork.post_content} </p>
            <p> <b>COMMENTS: </b> </p>

          
               {renderComments.map(comment => <p> {comment.content} </p>)}
        
            <form onSubmit={(event) => this.props.submitComment(event, this.state)}>

        <label>
         What do you think? Add a comment below!<p>
          <textarea value={this.state.comment} onChange={(event) => this.handleChange(event)} name = "comment" />
          </p> </label> 

        <input type="submit" value="Submit" />
        <button className="btn-continue" onClick = {(event) => this.props.addToCollection(event, this.state)}>ADD TO YOUR COLLECTION</button>
      </form>
      
             </div>
</Modal> : null }
{/* <Modal
    currentArtwork = {this.state.currentArtwork}
    className="modal"
    show={this.state.isShowing}
    close={this.closeModalHandler}>
        <div> SHOW INFO

        <img src = {this.state.currentArtwork.image} />
           <p> Artist:  {this.state.currentArtwork.artist}
            </p> 
    
            <p>
               USERNAME's  thoughts on this artwork: {this.state.currentArtwork.post_content} </p>
            <p> <b>COMMENTS: </b> </p>

            {this.renderComments}
               {(renderComments[1])} 
               {renderComments.map(comment => <p> {comment.content} </p>)}
        
            <form onSubmit={(event) => this.props.submitComment(event, this.state)}>

        <label>
         What do you think? Add a comment below!<p>
          <textarea value={this.state.comment} onChange={(event) => this.handleChange(event)} name = "comment" />
          </p> </label> 

        <input type="submit" value="Submit" />
      </form>
      
             </div>
</Modal> */}



{/* <MDBContainer>
      <MDBRow>
        {this.props.posts.map(post =>  
      <MDBCol size="6" md={this.props.size}  key = {post.id}  onClick = {(event) => this.openModalHandler(event, post)}>
        <img src = {post.image} className="img-responsive fit-image"/>
        </MDBCol>

      )
      }
        </MDBRow>
      {/* {/* </MDBContainer> */}

      {/* <MDBRow>
        <MDBCol size="6">
        <img src =   {this.props.posts[1].image}  class="img-responsive fit-image"/>
        </MDBCol>
        <MDBCol size="6">
         <img src =   {this.props.posts[2].image} class="img-responsive fit-image"/>
        </MDBCol>
      </MDBRow> */}

 {/* </MDBContainer> */} 
 
 <StackGrid
        columnWidth={160}
      >
          {this.props.posts.map(post =>  
          <div key = {post.id}  onClick = {(event) => this.openModalHandler(event, post)}><img src = {post.image} className="img-responsive fit-image"/></div>)}
         {this.props.posts.map(post =>  
          <div key = {post.id}  onClick = {(event) => this.openModalHandler(event, post)}><img src = {post.image} className="img-responsive fit-image"/></div>)}
         {this.props.posts.map(post =>  
          <div key = {post.id}  onClick = {(event) => this.openModalHandler(event, post)}><img src = {post.image} className="img-responsive fit-image"/></div>)}
      </StackGrid>

</div>

        
         ) }
}

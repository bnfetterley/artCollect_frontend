import React, { Component } from 'react'
// import StackGrid from "react-stack-grid"
// import { MDBContainer, MDBRow, MDBCol } from "mdbreact"
// import { MDBRow } from "mdbreact"
import '../index.css'
import Modal from './Modal/Modal'
import StackGrid from "react-stack-grid"


export default class Artworks extends Component {


    render() {
        let classArray = ["col-12 col-md-8 ","col-6 col-md-4", "col-6"]
        let content = this.props.comments.filter(comment => comment.post_id === this.props.currentArtwork.id)



return (

    <div className ="container">

        { this.props.isShowing ? <div onClick={this.props.closeModalHandler} className="back-drop"></div> : null }

            {this.props.isShowing ?  <Modal
                                      currentArtwork = {this.props.currentArtwork}
                                      className="modal"
                                      show={this.props.isShowing}
                                      close={this.props.closeModalHandler}>
                                     <div> SHOW INFO <br></br>

        <img src = {this.props.currentArtwork.image} className="image fit-image" />
           <p> Artist:  {this.props.currentArtwork.artist}, {this.props.currentArtwork.artwork_title}
            </p> 
              <div className = "contentDiv">
                <p>
                  <b>{this.props.currentArtwork && this.props.users.find(user => user.id === this.props.currentArtwork.user_id).username}'s </b> thoughts on this artwork: 
                </p>

                <p> 
                  {this.props.currentArtwork.post_content} 
                </p>
                </div>
                <p> 
                  <b>COMMENTS: </b> 
                </p>

          {content.map(comment => <p> <b> {this.props.users.find(user => user.id === comment.user_id).username} said:</b> {comment.content}</p>)}
    
        
            <form onSubmit={(event) => this.props.submitComment(event, this.state)}>

        <label>
         What do you think? Add a comment below!<p>
          <textarea value={this.props.commentContent} onChange={(event) => this.props.handleChange(event, this.state)} name = "commentContent" />
          </p> </label> 

        <input type="submit" value="Submit" />
        <button className="btn-continue" onClick = {(event) => this.props.addToCollection(event, this.state)}>ADD TO YOUR COLLECTION</button>
      </form>
             </div>

</Modal> : null }

 <StackGrid
        columnWidth={160}
    >
          {this.props.posts.map(post =>  
          <div key = {post.id}  onClick = {(event) => this.props.openModalHandler(event, post)}><img src = {post.image} className="img-responsive fit-image"/></div>)}
         {this.props.posts.map(post =>  
          <div key = {post.id}  onClick = {(event) => this.props.openModalHandler(event, post)}><img src = {post.image} className="img-responsive fit-image"/></div>)}
         {this.props.posts.map(post =>  
          <div key = {post.id}  onClick = {(event) => this.props.openModalHandler(event, post)}><img src = {post.image} className="img-responsive fit-image"/></div>)}
      </StackGrid>

</div>

        
         ) }
}

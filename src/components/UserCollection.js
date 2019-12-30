import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact"
// import { MDBRow } from "mdbreact"
import '../index.css'
import Modal from './Modal/Modal'
// import StackGrid from "react-stack-grid"

export default class UserCollection extends Component {

    state = {
        isShowing: false,
        currentArtwork: "artwork",
        comment: '',
        toggleUpdateForm: "hidden",
        updatedArtistName: "update artist name",
        updatedPostContent: "update post content",
        toggleUpdateCollection: "hidden",
        newImage: "Paste an Image Address here!",
        newArtist: "Who made it?",
        newArtworkTitle: "What is it called?",
        newGenre: "Genre",
        newPostContent: "When you see this artwork.... What do you see? What do you feel? What do you think?"
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

      toggleUpdateForm = () => {
      this.setState({
        toggleUpdateForm: "view"
      })
      }

      toggleUpdateCollectionForm = () => {
        this.setState({
          toggleUpdateCollection: "view"
        })
        }
  
    

    render() {

        console.log(this.state)
        let classArray = ["col-12 col-md-8 ","col-6 col-md-4", "col-6"]
        let currentUser = this.props.users.find(user => user.id === this.state.currentArtwork.user_id)
        // let currentUsername = currentUser.username
        let renderComments = this.props.comments.filter(comment => comment.post_id === this.state.currentArtwork.id)
        let view = this.state.toggleUpdateForm === 'view'
        let addCollectionView = this.state.toggleUpdateCollection === "view"

        // console.log(currentUser.username)
      

        return (

<div class="container">

{ this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }


{this.state.isShowing ? 
<Modal
    currentArtwork = {this.state.currentArtwork}
    className="modal"
    show={this.state.isShowing}
    close={this.closeModalHandler}>
        <div> SHOW INFO <br></br>

        <img src = {this.state.currentArtwork.image} />
           <p> Artist:  {this.state.currentArtwork.artist}
            </p> 
    
            <p>
               USERNAME's thoughts on this artwork: {this.state.currentArtwork.post_content} </p>

               <button onClick = {this.toggleUpdateForm} >update this post</button> <br></br>


               { view ?  (
               
                <form onSubmit={(event) => this.props.submitUpdate(event, this.state)}>
               
               <textarea name = "updatedArtistName" placeholder = {this.state.currentArtwork.post_content} value={this.state.updatedArtistName} onChange={(event) => this.handleChange(event)}  />
               <textarea name = "updatedPostContent" placeholder = {this.state.currentArtwork.post_content} value={this.state.updatedPostContent} onChange={(event) => this.handleChange(event)} />

                <input type="submit" value="Submit" />
               </form>)            
               
               : null }

              <button onClick = {(event) => this.props.deletePost(event, this.state)}>delete this post</button> <br></br>


      


               
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
</Modal> : null }



<MDBContainer>
<a className="link dim gray b f1 f-headline-ns tc db mb3 mb4-ns" href="#" title="Home"> <header> <h1> BRI's COLLECTION </h1>  </header></a>

<button onClick = {this.toggleUpdateCollectionForm } >Add to your collection:</button>

{ addCollectionView ?  (     
               <form onSubmit={(event) => this.props.submitNewPost(event, this.state)}>

              <textarea name = "newImage" placeholder = {this.state.newImage} value= {this.state.newImage}onChange={(event) => this.handleChange(event)}  />
              <textarea name = "newArtworkTitle" placeholder = {this.state.newArtworkTitle} value= {this.state.newArtworkTitle}onChange={(event) => this.handleChange(event)}  />
              <textarea name = "newArtist" placeholder = {this.state.newArtist} value= {this.state.newArtist} onChange={(event) => this.handleChange(event)}  />
              <textarea name = "newGenre" placeholder = {this.state.newGenre} value= {this.state.newGenre}onChange={(event) => this.handleChange(event)}  />
              <textarea name = "newPostContent" placeholder = {this.state.newPostContent} value= {this.state.newPostContent} onChange={(event) => this.handleChange(event)} />

              <input type="submit" value="Submit" />
              </form>)            
              
              : null }


      <MDBRow>
        {this.props.posts.map(post =>  
      <MDBCol size="6" md={this.props.size}  key = {post.id}  onClick = {(event) => this.openModalHandler(event, post)}>
        <img src = {post.image} className="img-responsive fit-image"/>
        </MDBCol>

      )
      }
        </MDBRow>

        <MDBRow>
        {this.props.posts.map(post =>  
    <MDBCol sm="4"  key = {post.id}  onClick = {(event) => this.openModalHandler(event, post)}> 
    <img src = {post.image} className="img-responsive fit-image"/> 
    </MDBCol>
    )
  }
    <MDBCol sm="4">.col-sm-4</MDBCol>
    <MDBCol sm="4">.col-sm-4</MDBCol>
  </MDBRow>

  <MDBRow>
  {this.props.posts.map(post =>  
    <MDBCol md="4" key = {post.id}  onClick = {(event) => this.openModalHandler(event, post)}>
        <img src = {post.image} className="img-responsive fit-image"/> 
      </MDBCol>
 )
}
  </MDBRow>

  <MDBRow>
  {this.props.posts.map(post =>  
    <MDBCol md="4" key = {post.id}  onClick = {(event) => this.openModalHandler(event, post)}>
        <img src = {post.image} className="img-responsive fit-image"/> 
      </MDBCol>
 )
}
    <MDBCol lg="4">.col-lg-4</MDBCol>
    <MDBCol lg="4">.col-lg-4</MDBCol>
    <MDBCol lg="4">.col-lg-4</MDBCol>
  </MDBRow>

  <MDBRow>
  {this.props.posts.map(post =>  
    <MDBCol xl="4" key = {post.id}  onClick = {(event) => this.openModalHandler(event, post)}>
        <img src = {post.image} className="img-responsive fit-image"/> 
      </MDBCol>
       )
      }
    <MDBCol xl="4">.col-xl-4</MDBCol>
    <MDBCol xl="4">.col-xl-4</MDBCol>
    <MDBCol xl="4">.col-xl-4</MDBCol>
  </MDBRow>

 </MDBContainer>
 

</div>

) }
}
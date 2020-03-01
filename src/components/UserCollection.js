import React, { Component } from 'react'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact"
import '../index.css'
import Modal from './Modal/Modal'


export default class UserCollection extends Component {



    render() {
      let id = this.props.currentUserID
        // let postsToRender = this.props.posts.filter(post => post.user_id === this.props.currentUserID)
        let renderComments = this.props.comments.filter(comment => comment.post_id === this.props.currentArtwork.id)
        let view = this.props.toggleUpdateForm === 'view'
        let addCollectionView = this.props.toggleUpdateCollection === "view"
  console.log(this.props)
        return (

        

<div className="container">

{/* { this.props.isShowing ? <div onClick={this.props.closeModalHandler} className="back-drop"></div> : null } */}


{this.props.isShowing ? 

<Modal
    currentArtwork = {this.props.currentArtwork}
    className="modal"
    show={this.props.isShowing}
    close={this.props.closeModalHandler}>
        <div> SHOW INFO <br></br>

        <img src = {this.props.currentArtwork.image} className="image fit-image" />
           <p> Artist:  {this.props.currentArtwork.artist}, {this.props.currentArtwork.artwork_title}

           <div className = "contentDiv">
                <p>
                  <b> You think: </b>
                </p>

                <p> 
                  {this.props.currentArtwork.post_content} 
                </p>
                </div>
            </p> 
    
            

               <button onClick = {this.props.toggleUpdateForm} >Share what you think about this piece!</button> <br></br>


               { this.props.toggleUpdateFormShow ?  (
               
                <form onSubmit={(event) => this.props.submitUpdate(event, this.state)}>
               
               <textarea name = "newPostContent" value={this.props.newPostContent} onChange={(event) => this.props.handleChange(event)} />

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
          <textarea value={this.props.comment} onChange={(event) => this.handleChange(event)} name = "comment" />
          </p> </label> 

        <input type="submit" value="Submit" />
      </form>
      
             </div>
</Modal> : null }



<MDBContainer>
<a className="link dim gray b f1 f-headline-ns tc db mb3 mb4-ns" href="#" title="Home"> <header> <h1 key={this.props.currentUsername}> {this.props.currentUsername}'s collection</h1>  </header></a>

{/* <p>{ currentUser && currentUsername }</p> */}

<button onClick = {this.props.toggleUpdateCollectionForm }> Add to your collection! </button>  <button onClick = {this.props.redirect }> Explore! </button>

{/* / form for adding to collection */}

{ this.props.toggleUpdateCollectionShow ?  (     
               <form onSubmit={(event) => this.props.submitNewPost(event, this.state)}>

              <textarea name = "newImage" value = {this.props.newImage}onChange={(event) => this.props.handleChange(event)}  /> 
              <br></br>
              <textarea name = "newArtworkTitle"  value = {this.props.newArtworkTitle} onChange={(event) => this.props.handleChange(event)}  />
              <br></br>
              <textarea name = "newArtist"  value = {this.props.newArtist} onChange={(event) => this.props.handleChange(event)}  />
              <br></br>
              <textarea name = "newGenre" value = {this.props.newGenre}onChange={(event) => this.props.handleChange(event)}  />
              <br></br>
              <textarea name = "newPostContent"  value = {this.props.newPostContent} onChange={(event) => this.props.handleChange(event)} />
              <br></br>
              <input type="submit" value="Submit" />
              </form>)            
              
              : null }


      <MDBRow>
        {this.props.posts.map(post =>  
      <MDBCol size="6" md={this.props.size}  key = {post.id}  onClick = {(event) => this.props.openModalHandler(event, post)}>
        <img src = {post.image} className="img-responsive fit-image"/>
        </MDBCol> 

      )
      }
        </MDBRow>

       

 </MDBContainer>
 

</div>

) }
}
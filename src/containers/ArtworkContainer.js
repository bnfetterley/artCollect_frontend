import React, { Component } from 'react'
import Artworks from '../components/Artworks'


export default class ArtworkContainer extends Component {
    render() {
      

        return (
            <div>
                 <Artworks
                 currentArtwork = {this.props.currentArtwork}
                 isShowing = {this.props.isShowing} 
                 openModalHandler = {this.props.openModalHandler} 
                 closeModalHandler = {this.props.closeModalHandler} 
                 commentContent = {this.props.commentContent} 
                 handleChange = {this.props.handleChange}
                 addToCollection = {this.props.addToCollection} 
                 posts = {this.props.posts} 
                 size = {this.props.size} 
                 users = {this.props.users} 
                 comments = {this.props.comments} 
                 submitComment = {this.props.submitComment}/>
            </div>
            
                 )

    }
}

import React, { Component } from 'react'
import Artworks from '../components/Artworks'


export default class ArtworkContainer extends Component {
    render() {
      
        let sizes = ["4", "6", "9"]
        let size = sizes[Math.floor(Math.random()*sizes.length)]

        return (
            <div>
                 <Artworks  posts = {this.props.posts} size = {this.props.size} users = {this.props.users} comments = {this.props.comments} submitComment = {this.props.submitComment}/>)
          
            </div>
        )
    }
}

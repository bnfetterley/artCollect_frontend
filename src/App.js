import React, { Component } from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import './App.css';
import ArtworkContainer from './containers/ArtworkContainer'
import UserCollection from './components/UserCollection'
import Signup from './components/Signup'
import Nav from './components/Nav';
import { Route, Switch, Link, NavLink, Redirect } from 'react-router-dom'
import Select from 'react-select';


class App extends Component {

  state = {
    posts: [],
    users: [],
    comments: [],
    currentUserID: 3,
    collectionToRender: [],
    currentUsername: "string"
  }

  fetchPosts = () => {
    fetch(`http://localhost:3000/posts`)
    .then(resp => resp.json())
    .then(json_resp => 
      this.setState({
       posts: json_resp
      }) 
      )
  }

  fetchUsers = () => {
    fetch(`http://localhost:3000/users`)
    .then(resp => resp.json())
    .then(json_resp => 
      this.setState({
       users: json_resp
      }) 
      )

  }

  fetchComments = () => {
    fetch(`http://localhost:3000/comments`)
    .then(resp => resp.json())
    .then(json_resp => 
      this.setState({
       comments: json_resp
      }) 
    )
  }



//FETCH ALL THE DATA - USERS, POSTS, COMMENTS
  componentDidMount(){
   this.fetchPosts()
   this.fetchComments()
   this.fetchUsers()
      
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.collectionToRender !== this.state.collectionToRender){
      
      // this.fetchUsers()
  }}
  


  //CREATE A USER

  submitUser = (event, state) => {
    console.log(event)
    event.preventDefault()
    fetch('http://localhost:3000/users', {
        method:'POST',
       headers: { 
           'Content-type': 'application/json',
           'accept': 'application/json'
       },
       body: JSON.stringify({
      username: state.username
    
        })
      })
      .then(resp => resp.json())
      .then(json_resp => 
 this.setState({
   currentUserID: json_resp.id,
   currentUsername: json_resp.username
 })
        )
// this.redirect()                

}

//ADD TO COLLECTION

addToCollection = (event, artworkState) => {
  console.log(artworkState)
  this.setState({
    collectionToRender: [...this.state.collectionToRender, artworkState.currentArtwork]
  })
  // fetch(`http://localhost:3000/users/${this.state.currentUserID}`, {
  //   method:'PATCH',
  //  headers: { 
  //      'Content-type': 'application/json',
  //      'accept': 'application/json'
  //  },
  //  body: JSON.stringify({
  // post_id: artworkState.currentArtwork.id
  //   })
  // })
  // .then(resp => resp.json())
  // .then(json_resp => {console.log(json_resp)})
}

//SUBMIT A NEW USER

// handleSubmit = (event) => {
//   console.log(event)
//   event.preventDefault()
//   fetch('http://localhost:3000/users', {
//       method:'POST',
//      headers: { 
//          'Content-type': 'application/json',
//          'accept': 'application/json'
//      },
//      body: JSON.stringify({
//     username: this.state.username
  
//       })
//     })
//     .then(resp => resp.json())
//     .then(json_resp => 
//       this.setState({
//           currentUserID: json_resp.id,
//           currentUsername: this.state.username
//       })
//       )
//     }
  // ADD A COMMENT

 submitComment = (event, artWorkState) => {
  event.preventDefault()
   console.log(artWorkState.comment, this.state)
  this.setState({
   comments: [...this.state.comments, artWorkState.comment]
  })
  console.log(this.state)
 
  fetch('http://localhost:3000/comments', {
    method:'POST',
   headers: { 
       'Content-type': 'application/json',
       'accept': 'application/json'
   },
   body: JSON.stringify({
   content: artWorkState.comment,
   post_id:  artWorkState.currentArtwork.id,
   user_id:  this.state.currentUserID

    })
  })
  .then(resp => resp.json())
  .then(json_resp => {console.log(json_resp)})
 }

//UPDATE POST
 submitUpdate = (event, state ) => {
  event.preventDefault()

  let newPost = {
    id: state.currentArtwork.id,
    image: "https://www.theartstory.org/images20/works/degas_edgar_6.jpg?2",
    artist: state.updatedArtistName,
    artwork_title: null,
    genre: "european impressionism",
    user_id: this.state.currentUserID,
    post_content: state.updatedPostContent
  }
   
  let arrayMinusOne = this.state.posts.filter(post => post.id !== state.currentArtwork.id)
  let updatedArray = [...arrayMinusOne, newPost]

console.log(updatedArray)
     this.setState({
    posts: updatedArray
 })

 fetch(`http://localhost:3000/posts`, {
   method:'PATCH',
  headers: { 
      'Content-type': 'application/json',
      'accept': 'application/json'
  },
  body: JSON.stringify({
    artist: state.updatedArtistName,
    post_content: state.updatedPostContent
   })
 })
 .then(resp => resp.json())
 .then(json_resp => {console.log(json_resp)})


 }
  
 //DELETE POST

 deletePost = (event, state) => {
  let arrayMinusOne = this.state.posts.filter(post => post.id !== state.currentArtwork.id)
  this.setState({
    posts: arrayMinusOne
  })

  fetch(`http://localhost:3000/posts`, {
    method:'DELETE',
   headers: { 
       'Content-type': 'application/json',
       'accept': 'application/json'
   },
   body: JSON.stringify({

    })
  })
  .then(resp => resp.json())
  .then(json_resp => {console.log(json_resp)})

}


//NEW POST

 submitNewPost = (event, state) => {
  event.preventDefault()
 
   fetch(`http://localhost:3000/posts`, {
     method:'POST',
    headers: { 
        'Content-type': 'application/json',
        'accept': 'application/json'
    },
    body: JSON.stringify({
    image: state.newImage,
    artist: state.newArtist,
    artwork_title: state.newArtistTitle,
    genre: state.newGenre,
    user_id: this.state.currentUserID,
    post_content: state.newPostContent
     })
   })
   .then(resp => resp.json())
   .then(json_resp => 
    
    this.setState({
      posts: [...this.state.posts, json_resp],
      collectionToRender: [this.state.collectionToRender, json_resp]
     })
  
  
  
   
   )


 }
  render() {
    
    let ID = this.state.currentUserID
    // let found = this.state.collectionToRender; 

    let user = this.state.users.find(user => user.id === ID)
  
 
    console.log(this.state.collectionToRender)
    console.log(this.state)
  return (
    <div className="App">

<nav className="pa3 pa4-ns">
  <a className="link dim gray b f1 f-headline-ns tc db mb3 mb4-ns" href="#" title="Home"> <header> <h1> artCollect </h1>  </header></a>
 
  <div className="tc pb3">
    {/* <a className="link dim gray f6 f5-ns dib pr3 ma3 mh3 mr3" href="/home" title="Home">Home</a> */}
    < Link to="/home">Home</Link>
    {/* <a className="link dim gray f6 f5-ns dib pr3 ma3 mh3 mr3" href="/signup" title="About">Signup</a> */}
    < Link to="/signup">Signup</Link>
    {/* <a className="link dim gray f6 f5-ns dib pr3 ma3 mh3 mr3" href="/usercollection" title="About">My Collection</a> */}
    < Link to="/usercollection">My Collection</Link>
    {/* <a className="link dim gray f6 f5-ns dib pr3 ma3 mh3 mr3" href="#" title="Store"> <Select options = {genres}/> </a><br></br> */}
    {/* <a className="link dim gray f6 f5-ns pr3 ma3 mh3 dib" href="#" title="Contact"><Select /> </a> */}
  </div>
</nav>
      <Switch>
      <Route path= "/home" render={(props) => <ArtworkContainer addToCollection = {this.addToCollection} posts = {this.state.posts} users = {this.state.users} comments = {this.state.comments} submitComment ={this.submitComment} />}/>
      <Route path= "/usercollection" render={(props) => <UserCollection currentUsername = {this.state.currentUsername} currentUserID = {this.state.currentUserID} posts = {this.state.collectionToRender}  users = {this.state.users} comments = {this.state.comments} submitUpdate ={this.submitUpdate}   deletePost = {this.deletePost}  submitNewPost = {this.submitNewPost}/>}/>
      <Route path= "/signup" render={(props) => <Signup history={this.props.history} handleSubmit = {this.submitUser} posts = {this.state.posts} users = {this.state.users} comments = {this.state.comments} submitComment ={this.submitComment} />}/>

     </Switch>
       
    </div>
  );
}
}

const genres = [
  { label: "Scuplture", value: 1 },
  { label: "Impressionist", value: 2 },
  { label: "Contemporary", value: 3 },
  { label: "Modern", value: 4 },
  { label: "Performance Art", value: 5 },
  { label: "Miscellaneous", value: 6 }
];
export default App;

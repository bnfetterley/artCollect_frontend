import React, { Component } from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import './App.css';
import ArtworkContainer from './containers/ArtworkContainer'
import UserCollection from './components/UserCollection'
import Signup from './components/Signup'
import Nav from './components/Nav';
import { Route, Switch, Link, withRouter } from 'react-router-dom'
import Select from 'react-select';


class App extends Component {

  state = {
    posts: [],
    users: [],
    collectionToRender: [],
    comments: [],
    currentUserID: '',
    currentUsername: "Your",
    commentContent: '',
    post_id: "",
    isShowing: false,
    currentArtwork: "artwork",
    username:'',
    bio:'',


        toggleUpdateFormShow: false,
        toggleUpdateCollectionShow: false,
        updatedArtistName: "update artist name",
        updatedPostContent: "update post content",
        newImage: "Paste an Image Address here!",
        newArtist: "Who made it?",
        newArtworkTitle: "What is the piece called?",
        newGenre: "Genre",
        newPostContent: "What do you think about it?"
  }

  redirect = () => {
    this.props.history.push("/home")
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


 //MODAL HANDLING
openModalHandler = (event, post) => {
  console.log("event hit")
    this.setState({
        isShowing: true,
        currentArtwork: post
    });
}

closeModalHandler = (event, post) => {
  this.setState({
      isShowing: false
  });
}

// USER COLLECTION MODAL HANDLING
toggleUpdateForm = () => {
  this.setState({
    toggleUpdateFormShow: !this.state.toggleUpdateFormShow
  })
  }

  toggleUpdateCollectionForm = () => {
    console.log("event hit")
    this.setState({
      toggleUpdateCollectionShow: !this.state.toggleUpdateCollectionShow
    })
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

  //HANDLECHANGE FOR FORM
  handleChange = (event) => {
    event.preventDefault()

    this.setState({
     [event.target.name]: event.target.value,
     post_id: this.state.currentArtwork.id
    })
  }

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
      username: this.state.currentUsername
        })
      })
      .then(resp => resp.json())
      .then(json_resp => 

 this.setState({
   currentUserID: json_resp.id,
   currentUsername: json_resp.username
 }))     
 this.props.history.push("/usercollection")
}

//ADD TO COLLECTION
addToCollection = (event) => {
  fetch(`http://localhost:3000/posts`, {
    method:'POST',
   headers: { 
       'Content-type': 'application/json',
       'accept': 'application/json'
   },
   body: JSON.stringify({
    image: this.state.currentArtwork.image,
    artist: this.state.currentArtwork.artist,
    artwork_title: this.state.currentArtwork.artwork_title,
    genre: this.state.currentArtwork.genre,
    user_id: this.state.currentUserID,
    })
  })
  .then(resp => resp.json())
  .then(json_resp => 
   this.setState({
     collectionToRender: [...this.state.collectionToRender, json_resp]
   })
    
   )
   console.log("fetch hit!", this.state)
   this.closeModalHandler()
  this.props.history.push("/usercollection")

}

// ADD A COMMENT
 submitComment = (event, artWorkState) => {
  event.preventDefault()
 
  fetch('http://localhost:3000/comments', {
    method:'POST',
   headers: { 
       'Content-type': 'application/json',
       'accept': 'application/json'
   },
   body: JSON.stringify({
   content: this.state.commentContent,
   post_id:  this.state.post_id,
   user_id:  this.state.currentUserID

    })
  })
  .then(resp => resp.json())
  .then(json_resp => {
    this.setState({
    comments: [...this.state.comments, json_resp],
    commentContent: ""
    })
  }
  )
 }

//UPDATE POST
 submitUpdate = (event) => {
  event.preventDefault()

  let newPost = {
    id: this.state.currentArtwork.id,
    image: this.state.currentArtwork.image,
    artist: this.state.currentArtwork.artist,
    artwork_title: this.state.currentArtwork.artwork_title,
    genre: this.state.currentArtwork.genre,
    user_id: this.state.currentUserID,
    post_content: this.state.newPostContent
  }
   
  let arrayMinusOne = this.state.posts.filter(post => post.id !== this.state.currentArtwork.id)
  let updatedArray = [...arrayMinusOne, newPost]


 //UPDATE POST
 fetch(`http://localhost:3000/posts/${this.state.currentArtwork.id}`, {
   method:'PATCH',
  headers: { 
      'Content-type': 'application/json',
      'accept': 'application/json'
  },
  body: JSON.stringify({
    post_content: this.state.newPostContent
   })
 })
 .then(resp => resp.json())
 .then(json_resp => 
  
  this.setState({
    posts: updatedArray,
    newPostContent: ""
 })
  
  )
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
 submitNewPost = (event) => {
  event.preventDefault()
 
   fetch(`http://localhost:3000/posts`, {
     method:'POST',
    headers: { 
        'Content-type': 'application/json',
        'accept': 'application/json'
    },
    body: JSON.stringify({
    image: this.state.newImage,
    artist: this.state.newArtist,
    artwork_title: this.state.newArtistTitle,
    genre: this.state.newGenre,
    user_id: this.state.currentUserID,
    post_content: this.state.newPostContent
     })
   })
   .then(resp => resp.json())
   .then(json_resp => 
    
    this.setState({
      posts: [...this.state.posts, json_resp],
     }))

   this.toggleUpdateCollectionForm()
 }
  render() {
    
    

    // let uniquePosts = [...new Set(this.state.posts.artw)]

  return (

    <div className="App">

<nav className="pa3 pa4-ns">
  <a className="link dim gray b f1 f-headline-ns tc db mb3 mb4-ns" href="#" title="Home"> <header> <h1> artCollect </h1>  </header></a>

  < Link to="/home">Home</Link>
 
   < Link to="/signup">Signup</Link>
   
    < Link to="/usercollection"  onClick = {this.closeModalHandler}> My Collection</Link>

</nav>

      <Switch>
      <Route path= "/home" render={(props) => 
      <ArtworkContainer  
      currentArtwork = {this.state.currentArtwork}
      isShowing = {this.state.isShowing}
      openModalHandler = {this.openModalHandler} 
      closeModalHandler = {this.closeModalHandler} 
      comments = {this.state.comments} 
      addToCollection = {this.addToCollection} 
      posts = {this.state.posts} 
      users = {this.state.users} 
      comments = {this.state.comments} 
      commentContent = {this.state.commentContent} 
      handleChange = {this.handleChange} 
      submitComment ={this.submitComment} />}/>

      <Route path= "/usercollection" render={(props) => 
      <UserCollection 
      redirect = {this.redirect}
      handleChange = {this.handleChange} 
      currentArtwork = {this.state.currentArtwork}
      isShowing = {this.state.isShowing}
      openModalHandler = {this.openModalHandler} 
      closeModalHandler = {this.closeModalHandler} 
      toggleUpdateFormShow = {this.state.toggleUpdateFormShow}
      toggleUpdateCollectionShow = {this.state.toggleUpdateCollectionShow}
      toggleUpdateForm = {this.toggleUpdateForm}
      toggleUpdateCollectionForm = {this.toggleUpdateCollectionForm}

      comments = {this.state.comments} 
      currentUsername = {this.state.currentUsername} 
      currentUserID = {this.state.currentUserID} 
      posts = {this.state.collectionToRender}  
      users = {this.state.users} 
      comments = {this.state.comments} 
      submitUpdate ={this.submitUpdate}   
      deletePost = {this.deletePost}  
      submitNewPost = {this.submitNewPost}
      
      newImage = {this.state.newImage}
      newArtist = {this.state.newArtist}
      newArtworkTitle = {this.state.newArtworkTitle}
      newGenre = {this.state.newGenre}
      newPostContent = {this.state.newPostContent}
      
        />
      }/>

      <Route path= "/signup" render={(props) => 
      <Signup 
      handleChange = {this.handleChange} 
      history={this.props.history} 
      handleSubmit = {this.submitUser} 
      users = {this.state.users} 
      comments = {this.state.comments} 
      submitComment ={this.submitComment} />}/>

     </Switch>
       
    </div>
  )}}

const genres = [
  { label: "Scuplture", value: 1 },
  { label: "Impressionist", value: 2 },
  { label: "Contemporary", value: 3 },
  { label: "Modern", value: 4 },
  { label: "Performance Art", value: 5 },
  { label: "Miscellaneous", value: 6 }
];
export default withRouter(App);

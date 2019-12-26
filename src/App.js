import React, { Component } from 'react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import './App.css';
import ArtworkContainer from './containers/ArtworkContainer'
import UserCollection from './components/UserCollection'
import Nav from './components/Nav';




class App extends Component {

  state = {
    posts: [],
    currentUserID: 2,
    collectionToRender: []
  }



  componentDidMount(){
    fetch(`http://localhost:3000/posts`)
    .then(resp => resp.json())
    .then(json_resp => 
      this.setState({
       posts: json_resp
      }) 
      )
  }

  // setCollectionToRender = () => {
  //   let ID = this.state.currentUserID
  //   let found = this.state.posts.find(function(element) { 
  //     return element.user_id === ID ; 
  //   }); 

  //  this.setState({
  //   collectionToRender: found
  //  })
  // }


  
  render() {
    
    let ID = this.state.currentUserID
    let found = this.state.posts.filter(function(element) { 
      return element.user_id === ID ; 
    }); 

    console.log(found)
      
    // Printing desired values. 
 
    console.log(this.state)
  return (
    <div className="App">
        <Nav />
     <ArtworkContainer posts = {this.state.posts}/>
     <UserCollection posts = {found}/>
       
    </div>
  );
}
}

export default App;

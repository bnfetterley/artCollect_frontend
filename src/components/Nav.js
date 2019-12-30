import React, { Component } from 'react'
import '../Nav.css'


export default class Nav extends Component {
    render() {
        return (
            <div>
                <nav className="pa3 pa4-ns">
  <a className="link dim gray b f1 f-headline-ns tc db mb3 mb4-ns" href="#" title="Home"> <header> <h1> artCollect </h1>  </header></a>
 
  <div className="tc pb3">
    <a className="link dim gray f6 f5-ns dib pr3 ma3 mh3 mr3" href="#" title="Home">Home</a>
    <a className="link dim gray f6 f5-ns dib pr3 ma3 mh3 mr3" href="#" title="About">My Collection</a>
    <a className="link dim gray f6 f5-ns dib pr3 ma3 mh3 mr3" href="#" title="Store">Genres</a>
    <a className="link dim gray f6 f5-ns pr3 ma3 mh3 dib" href="#" title="Contact">Sort By</a>
  </div>
</nav>
                
            </div>
        )
    }
}

import React, { useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import '../index.css';
import Modal from './Modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../redux/actions';


const UserCollection = (props) => {
  const username = useSelector((state) => state.username);

  const login = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.token) {
      dispatch(actions.persistUser());
    }
  });

  const userPosts = props.posts.filter((post) => post.user_id === login.id);

  let id = props.currentUserID;

 
  let renderComments = props.comments.filter(
    (comment) => comment.post_id === props.currentArtwork.id
  );

  let view = props.toggleUpdateForm === 'view';
  let addCollectionView = props.toggleUpdateCollection === 'view';


  return (
    <div className="container">
   

      {props.isShowing ? (
        <Modal
          currentArtwork={props.currentArtwork}
          className="modal"
          show={props.isShowing}
          close={props.closeModalHandler}
        >
          <div>
            {' '}
            SHOW INFO <br></br>
            <img src={props.currentArtwork.image} className="image fit-image" />
            <p>
              {' '}
              Artist: {props.currentArtwork.artist},{' '}
              {props.currentArtwork.artwork_title}
              <div className="contentDiv">
                <p>
                  <b> You think: </b>
                </p>

                <p>{props.currentArtwork.post_content}</p>
              </div>
            </p>
            <button onClick={props.toggleUpdateForm}>
              Share what you think about this piece!
            </button>{' '}
            <br></br>
            {props.toggleUpdateFormShow ? (
              <form onSubmit={(event) => props.submitUpdate(event)}>
                <textarea
                  name="newPostContent"
                  value={props.newPostContent}
                  onChange={(event) => props.handleChange(event)}
                />

                <input type="submit" value="Submit" />
              </form>
            ) : null}
            <button onClick={(event) => props.deletePost(event)}>
              delete this post
            </button>{' '}
            <br></br>
            <p>
              {' '}
              <b>COMMENTS: </b>{' '}
            </p>
            {renderComments}
            {renderComments[1]}
            {renderComments.map((comment) => (
              <p> {comment.content} </p>
            ))}
            <form onSubmit={(event) => props.submitComment(event)}>
              <label>
                What do you think? Add a comment below!
                <p>
                  {/* <textarea value={props.comment} onChange={(event) => handleChange(event)} name = "comment" /> */}
                </p>{' '}
              </label>

              <input type="submit" value="Submit" />
            </form>
          </div>
        </Modal>
      ) : null}

      <MDBContainer>
        <header>
          <h1 key={props.currentUsername}> {username}'s collection</h1>
        </header>
        <button onClick={props.toggleUpdateCollectionForm}>
          {' '}
          Add to your collection!{' '}
        </button>{' '}
        <button onClick={(event) => props.redirect(event, login)}>
          {' '}
          Explore!{' '}
        </button>
        {/* / form for adding to collection */}
        {props.toggleUpdateCollectionShow ? (
          <form onSubmit={(event) => props.submitNewPost(event)}>
            <textarea
              name="newImage"
              value={props.newImage}
              placeholder="Paste an Image Address here"
              onChange={(event) => props.handleChange(event)}
            />
            <br></br>
            <textarea
              name="newArtworkTitle"
              value={props.newArtworkTitle}
              placeholder="What is the name of this artwork?"
              onChange={(event) => props.handleChange(event)}
            />
            <br></br>
            <textarea
              name="newArtist"
              value={props.newArtist}
              placeholder="Who made this piece?"
              onChange={(event) => props.handleChange(event)}
            />
            <br></br>
            <textarea
              name="newGenre"
              value={props.newGenre}
              placeholder="What genre is this piece?"
              onChange={(event) => props.handleChange(event)}
            />
            <br></br>
            <textarea
              name="newPostContent"
              value={props.newPostContent}
              placeholder="What are your thoughts about this piece?"
              onChange={(event) => props.handleChange(event)}
            />
            <br></br>
            <input type="submit" value="Submit" />
          </form>
        ) : null}
        <MDBRow>
          {userPosts.map((post) => (
            <MDBCol
              size="6"
              md={props.size}
              key={post.id}
              onClick={(event) => props.openModalHandler(event, post)}
            >
              <img src={post.image} className="img-responsive fit-image" />
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default UserCollection;

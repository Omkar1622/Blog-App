import { async } from '@firebase/util';
import { addDoc, collection } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase-config';

const CreatePost = ({isAuth}) => {
  

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  // Create a Reference to the Collection which we want to access
    const postsCollectionRef = collection(db, "posts");

  // To redirect to Home Page
  let navigate = useNavigate();


  const createPost = async () => {
     await addDoc(postsCollectionRef, {
      title,
      postText,
      //  The Variable Auth will Contain the Information About the User, so we will access it for the author details.
      author: {name: auth.currentUser.displayName , id: auth.currentUser.uid },
     } );

    //  After Adding Post, We will Redirect the user to Home Page
    navigate("/");

  }

  // If we manually change the link to go to createpost page without login in to the app,
  //  we will go to the createpost page in the app. To protect the access of that page 
  // from the users which are not logged in, we will redirect them to login page whenever
  // we found out that the isAuth useState is false and user is trying to acces createpost page.

  useEffect(() => {
      if(!isAuth) {
          navigate("/login");
      }
  }, []);


  return (
    <div className='createPostPage'>
        <div className="cpContainer">
          <h1> Create A Post </h1>
          <div className="inputGp">
              <label > Title: </label>
              <input
                 type="text"
                 placeholder='Title...'
                 onChange={(event) => {
                    setTitle(event.target.value);
                 }}
                 />
          </div>
          <div className="inputGp">
              <label > Post: </label>
              <textarea 
                placeholder='Post...'
                onChange={(event) => {
                  setPostText(event.target.value);
               }}
                />
          </div>

          <button onClick={createPost}> Submit Post </button>
        </div>
    </div>
  )
}

export default CreatePost

import { async } from '@firebase/util';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase-config';

const Home = ({isAuth}) => {

  const [postList, setPostList] = useState([]);

  // We need a reference to know which Collection we are referring to.
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
        const data = await getDocs(postsCollectionRef);
        console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
        setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  //  To Delete Document
  // We need to specify that which document we want to Delete
  const deletePost = async (id) => {
    // we need the id of the doc we want to delete, we were having that id inside the map function below in homepage
    // so while calling this function, we will take id as parameter.
      const postDoc = doc(db, "posts", id  );
      await deleteDoc(postDoc);
  }

  return (
    <div className='homePage'>
      {postList.map((post) => {
          return(
            <div className='post'> 
              <div className="postHeader">
                  <div className="title">
                    <h1> {post.title} </h1>
                  </div>
                  {/* We are using a Unicode to display the Trashcan Icon */}
                  <div className='deletePost'>
                    {/* Display the button when isAuth is True And author-id in post matches with the id from the auth token */}
                    {/* i.e if the id of the current user who is logged in matches with the id of the authors post, then show the Button */}
                  { isAuth && post.author.id === auth.currentUser.uid && <button 
                      onClick={() => {
                        deletePost(post.id);   {/* Pass id as Parameter */}
                      }}>
                         &#128465;  {/* Unicode */}
                    </button> }   
                  </div>
              </div>
              <div className="postTextContainer">
                  { post.postText }
              </div>
              <h3> @{post.author.name} </h3>
            </div>
          );
      })}
    </div>
  )
}

export default Home

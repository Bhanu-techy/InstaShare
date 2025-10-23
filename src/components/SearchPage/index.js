import { useContext, useEffect, useState } from 'react'
import Header from '../Header';
import { SearchContext } from "../context/SearchContext";
import PostItem from '../PostItem';
import Cookies from 'js-cookie';

import { Oval } from "react-loader-spinner";

const stateConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'LOADING',
}

export default function SearchPage() {

    const [state, setState] = useState(stateConstants.in_progress)
    const [posts, setPosts] = useState([])
    
    const {searchInput} = useContext(SearchContext)

    useEffect(()=>{
    const onSearchResults = async () => {
    const posturl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const postResponse = await fetch(posturl, options)

    if (postResponse.ok) {
      const postData = await postResponse.json()
      const postList = postData.posts.map(each => ({
        postId: each.post_id,
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        postDetails: each.post_details,
        likesCount: each.likes_count,
        comments: each.comments,
        createdAt: each.created_at,
      }))
      setState(stateConstants.success)
      setPosts(postList)
      
    } else {
      setState(stateConstants.failure)
    }
  }  

  onSearchResults()
    },[searchInput])

     const renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dsqphsoxb/image/upload/v1751650133/failureView_po4xd8.png"
        alt="failure view"
        className="failure-view-img"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" >
        Try again
      </button>
    </div>)

  
    const renderLoadingView = () => (
      <div className="profile-loader" data-testid="loader">
        <Oval
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
      </div>
    )

    const renderPostsSuccessView = () => (
    <ul className="post-bgcontainer">
      <h1>Search Results</h1>
        {posts.map(each => (
          <PostItem details={each} key={each.postId} />
        ))}
      </ul>
  )
    
    const renderResultView = () => {

    switch (state) {
      case stateConstants.success:
        return renderPostsSuccessView()
      case stateConstants.failure:
        return renderFailureView()
      case stateConstants.in_progress:
        return renderLoadingView()
      default:
        return null
    }
  }


  return (
    <>
    <Header/>
    <div>
        
        {renderResultView()}
    </div>
    </>
  )
}

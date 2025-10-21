import React, { useContext, useEffect, useState } from 'react'
import Header from '../Header';
import { SearchContext } from "../context/SearchContext";
import PostItem from '../PostItem';
import Cookies from 'js-cookie';

const stateConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'LOADING',
  initial: 'INITIAL',
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
    },[])


  return (
    <>
    <Header/>
    <div>
        <h1>Search Results</h1>
        <ul className="post-bgcontainer">
        {posts.map(each => (
          <PostItem details={each} key={each.postId} />
        ))}
      </ul>
    </div>
    </>
  )
}

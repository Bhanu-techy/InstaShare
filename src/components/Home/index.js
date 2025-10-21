import React from 'react';
import { useState, useEffect } from 'react'
import PostItem from '../PostItem'
import Header from '../Header'
import Cookies from 'js-cookie'

import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './index.css'

const stateConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'LOADING',
  initial: 'INITIAL',
}


function Home() {

  const [state, setState] = useState(stateConstants.in_progress)
  const [postList, setPosts] = useState([])
  const [storiesList, setStories] = useState([])


  useEffect(()=>{
    const  getPosts = async () => {

    const posturl = 'https://apis.ccbp.in/insta-share/posts'

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

      const posts = postData.posts.map(each => ({
        postId: each.post_id,
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        postDetails: each.post_details,
        likesCount: each.likes_count,
        comments: each.comments,
        createdAt: each.created_at,
      }))
      setPosts(posts)
      setState(stateConstants.success)
    }else{
      setState(stateConstants.failure)
    }
  }
  getPosts()
  },[])

  useEffect(()=>{
   const getstories =async()=>{
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()

      const stories = data.users_stories.map(each => ({
        userId: each.user_id,
        userName: each.user_name,
        storyUrl: each.story_url,
      }))
      setStories(stories)
      console.log(stories)
    }
    
  }
  getstories()
  },[])

  const renderStorySuccessView = () => {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 1,
    }

    return (
      <>
        <ul className="slider-container-md">
          <Slider {...settings}>
            {storiesList.map(each => (
              <li key={each.userId} className="story-container">
                <img
                  src={each.storyUrl}
                  alt="user story"
                  className="story-img"
                />
                <p className="stories-name">{each.userName}</p>
              </li>
            ))}
          </Slider>
        </ul>
      </>
    )
  }

  const  getPosts = async () => {
    const posturl = 'https://apis.ccbp.in/insta-share/posts'
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
      const posts = postData.posts.map(each => ({
        postId: each.post_id,
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        postDetails: each.post_details,
        likesCount: each.likes_count,
        comments: each.comments,
        createdAt: each.created_at,
      }))
      setPosts(posts)
      setState(stateConstants.success)
    }else{
      setState(stateConstants.failure)
    }
  }

  const renderLoadingView = () => (
    <div className="profile-loader" data-testid="loader">
      <h1>Loading...</h1>
    </div>
  )

  const renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dsqphsoxb/image/upload/v1751650133/failureView_po4xd8.png"
        alt="failure view"
        className="failure-view-img"
      />
      <p>Something went wrong. Please try again</p>
      <button type="button" onClick={getPosts}>
        Try again
      </button>
    </div>)
  
  const renderPostsSuccessView = () => {
    return (
      <div className='main-container'>
      {renderStorySuccessView()}
      <ul className="-container">
        {postList.map(each => (
          <PostItem details={each} key={each.postId} />
        ))}
      </ul>
      </div>
    )
  }

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
    <div>
        <Header/>
        {renderResultView()}
    </div>
  )
}

export default Home
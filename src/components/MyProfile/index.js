import {useState, useEffect} from 'react'
import { Oval } from "react-loader-spinner";
import Cookies from 'js-cookie'
import Header from '../Header'
import ProfileItem from '../ProfileItem'

import './index.css'

const stateConstants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  in_progress: 'LOADING',
  initial: 'INITIAL',
}

const Userprofile = ()=>{

  const [state, setState] = useState(stateConstants.in_progress)
  const [userDetails, setDetails] = useState([])


  useEffect(()=>{
    const getUserProfile = async () => {
    const url = 'https://apis.ccbp.in/insta-share/my-profile'

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const user = data.profile

      const details = {
        userName: user.user_name,
        userId: user.user_id,
        userBio: user.user_bio,
        postsCount: user.posts_count,
        followersCount: user.followers_count,
        followingCount: user.following_count,
        profilePic: user.profile_pic,
        stories: user.stories,
        posts: user.posts,
      }
      
      setDetails(details)
      setState(stateConstants.success)
    } else {
      setState(stateConstants.failure)
    }
  }
  getUserProfile()
  })

  const getUserProfile = async () => {
    const url = 'https://apis.ccbp.in/insta-share/my-profile'

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const user = data.user_details
      console.log(user)
      const details = {
        userName: user.user_name,
        userId: user.user_id,
        userBio: user.user_bio,
        postsCount: user.posts_count,
        followersCount: user.followers_count,
        followingCount: user.following_count,
        profilePic: user.profile_pic,
        stories: user.stories,
        posts: user.posts,
      }

      setDetails(details)
      setState(stateConstants.success)
    } else {
      setState(stateConstants.failure)
    }
  }

  const renderProfileView = () => (
      <div>
        <ProfileItem details={userDetails} />
      </div>
    )
  

  const renderLoadingView = () => (
    <div className="profile-loader" data-testid="loader">
      <Oval
                  visible={true}
                  height="80"
                  width="80"
                  color="#0000FF"
                  ariaLabel="oval-loading"
                  secondaryColor="#ADD8E6"
                  strokeWidth={2}
                  strokeWidthSecondary={2}
                />
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
      <button type="button" onClick={getUserProfile}>
        Try again
      </button>
    </div>
  )

  const renderProfileSuccessView = () => {

    switch (state) {
      case stateConstants.success:
        return renderProfileView()
      case stateConstants.failure:
        return renderFailureView()
      case stateConstants.in_progress:
        return renderLoadingView()
      default:
        return null
    }
  }

    return (
      <div className="home-container">
        <Header/>
        {renderProfileSuccessView()}
      </div>
    )
  }


export default Userprofile

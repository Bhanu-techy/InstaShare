import { useState, useEffect } from 'react'
import PostItem from '../PostItem'
import Header from '../Header'
import Cookies from 'js-cookie'

function Home() {

  const [postList, setPosts] = useState([])


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
    }
  }
  getPosts()
  },[])

  console.log(postList)
  const renderPostsSuccessView = () => {
    return (
      <ul className="post-bgcontainer">
        {postList.map(each => (
          <PostItem details={each} key={each.postId} />
        ))}
      </ul>
    )
  }

  return (
    <div>
        <Header/>
        {renderPostsSuccessView()}
    </div>
  )
}

export default Home
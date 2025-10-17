import React from 'react'
import {Link} from 'react-router-dom'
import './index.css'

const PostItem = props => {

    const {details} = props

    const {
      postDetails = {},
      userId,
      postId,
      profilePic,
      likesCount,
      userName,
      comments = [],
      createdAt,
    } = details

  return (
    <li>
        <div className="profile-details">
          <img
            src={profilePic}
            className="profile-pic"
            alt="post author profile"
          />
          <Link to={`/users/${userId}`} className="link">
            <p>{userName}</p>
          </Link>
        </div>
        <img src={postDetails.image_url} className="post-img" alt="post" />
        <div className="post-content">
          <p>{likesCount} likes</p>
          <p>{postDetails.caption}</p>
          <div>
            {comments.map(each => (
              <div className="comment-List" key={each.user_id}>
                <p>
                  <span className="comment-user">{each.user_name}</span>
                  {` `}
                  {each.comment}
                </p>
              </div>
            ))}
          </div>
          <p className="post-time">{createdAt}</p>
        </div>
    </li>
  )
}

export default PostItem
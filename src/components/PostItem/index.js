import { useState } from 'react'
import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'

import './index.css'

const PostItem = props => {

    const {details} = props

    const [likeBtn, setLikeBtn] = useState(false)

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

    const [count, setCount] = useState(likesCount)

    const onClickLike = (id) => {
      setLikeBtn((prevState) => !prevState)

      if(likeBtn){
        setCount(likesCount)
      }else{
        setCount(likesCount+1)
      }
    }

  return (
    <li className='post-container'>
        <div className="profile-details">
          <img
            src={profilePic}
            className="profile-pic"
            alt="post author profile"
          />
          <Link to={`/profile/${userId}`} className="link">
            <p>{userName}</p>
          </Link>
        </div>
        <img src={postDetails.image_url} className="post-img" alt="post" />
        <div className="post-content">
          <div>
            {likeBtn ? (
              <button
                type="button"
                data-testid="unLikeIcon"
                className="like-button"
                onClick={() => onClickLike(postId)}
              >
                <FcLike height={50} />
              </button>
            ) : (
              <button
                type="button"
                className="like-button"
                data-testid="likeIcon"
                onClick={() => onClickLike(postId)}
              >
                <BsHeart height={50} />
              </button>
            )}
            <button
              type="button"
              data-testid="commentIcon"
              className="like-button"
            >
              <FaRegComment height={50} />
            </button>
            <button
              type="button"
              data-testid="shareIcon"
              className="like-button"
            >
              <BiShareAlt height={50} />
            </button>
          </div>
          <p>{count} likes</p>
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
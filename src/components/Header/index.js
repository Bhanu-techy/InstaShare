import React, { useState, useContext } from 'react'
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { SearchContext } from "../context/SearchContext";

import './index.css'

function Header() {

  const [shownavItems, setShownavItems] = useState(false)
  const {searchInput, onSearchInput} = useContext(SearchContext)

  const navigate = useNavigate()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate("/login")
  }

  const onClickHamberger = () => {
    setShownavItems(true)
  }

  const onClickCloseHamberger = () => {
    setShownavItems(false)
  }

  const onClickSearchBtn = () => {
    navigate("/search")
  }
  

   const navsmall = shownavItems ? 'nav-container-sm' : ''
  const navshowsm = shownavItems ? 'navshow' : 'navhide'
  const searchbarsm = shownavItems ? 'navhide' : 'searchshow'

  return (
    <>
              <nav className="navbar">
                <div className={`nav-container ${navsmall}`}>
                  <div className="logo-div">
                    <div className="logo-and-title">
                      <Link to="/">
                        <img
                          src="https://res.cloudinary.com/dya0bwju7/image/upload/v1749788026/Standard_Collection_8_ujpfzk.png"
                          alt="website logo"
                          className="nav-logo"
                        />
                      </Link>
                      <h1 className="website-title">Insta Share</h1>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={onClickHamberger}
                        className="popup"
                      >
                        <img
                          src="https://res.cloudinary.com/dsqphsoxb/image/upload/v1751720351/menu_x8id77.png"
                          alt="hamberger"
                        />
                      </button>
                    </div>
                  </div>
                  <ul className="nav-list">
                    <li className={`searchbar ${searchbarsm}`}>
                      <input
                        type="search"
                        placeholder="Search Caption"
                        value={searchInput}
                        onChange={onSearchInput}
                      />
                      <button
                        type="button"
                        className="search-icon"
                        data-testid="searchIcon"
                        onClick={onClickSearchBtn}
                      >
                        <FaSearch />
                      </button>
                    </li>
                    <Link to="/" className="link">
                      <li className={`nav-item ${navshowsm}`}>
                        Home
                      </li>
                    </Link>
                    <Link to="/my-profile" className="link">
                      <li className={`nav-item ${navshowsm}`}>
                        Profile
                      </li>
                    </Link>
                    <li className={`nav-item ${navshowsm}`}>
                      <button type="button" className='logout-btn' onClick={onClickLogout}>
                        Logout
                      </button>
                    </li>
                    <li className={`nav-item ${navshowsm} cancelbtn`}>
                      <button
                        type="button"
                        onClick={onClickCloseHamberger}
                      >
                        x
                      </button>
                    </li>
                  </ul>
                </div>
              </nav>
              
            </>
  )
}

export default Header
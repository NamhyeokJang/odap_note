import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

import './Header.css'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="header">
      <div className="header__wrapper container">
        <Link to='/'>
          <div className='header__logo'>
            암기짱v3
        </div>
        </Link>
        <div
          className='header__menu-handler'
          onClick={() => setMenuOpen(prev => !prev)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <div
          className={`header__menu-container ${menuOpen ? 'active' : ''}`}
        >
          <Link to='/record' onClick={() => setMenuOpen(prev => !prev)}>
            <div className="header__menu">기록</div>
          </Link>
          <Link to='/edit' onClick={() => setMenuOpen(prev => !prev)}>
            <div className="header__menu">문제 편집</div>
          </Link>
          <Link to='#'>
            <div className="header__menu">test2</div>
          </Link>
        </div>
      </div>
    </div>
  )
};

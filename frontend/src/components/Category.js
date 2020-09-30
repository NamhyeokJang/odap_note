import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

import './Category.css'

export default function Category({ category }) {


  return (
    <div className='category'>
      <div className="category__top">
        <div className="category__title">{category.title}</div>
        <div className="category__fav">
          {category.favorited ? <AiFillStar /> : <AiOutlineStar />}
        </div>
      </div>
      <div className='category__bottom'>
        <div className="category__q-count">
          문제: {category.questionCount}
        </div>
      </div>
      <div className='category__bottom'>
        <Link to={`/view/${category.id}`} className='category__link'>
          순서대로 학습하기
        </Link>
        <Link to={`/view/${category.id}?order=random`} className='category__link'>
          랜덤으로 학습하기
        </Link>
      </div>
    </div>
  )
};

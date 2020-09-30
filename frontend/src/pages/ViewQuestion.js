import React, { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { QuestionCarousel } from '../components'
import { fetchCategory, modifyCategory } from '../utils'

import './ViewQuestion.css'

export default function ViewQuestion() {
  const [category, setCategory] = useState({ title: '불러오는중...', questions: [], favorited: false })
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const { search } = useLocation()


  const modifyFavorited = async () => {
    modifyCategory(category.id, { favorited: !category.favorited })
    setCategory(prev => {
      return {
        ...prev,
        favorited: !prev.favorited
      }
    })
  }

  useEffect(() => {
    fetchCategory(id, search).then(res => {
      setCategory(res)
      setLoading(false)
    })
  }, [id, search])

  return (
    <div className="view-question view container">
      <div className="view-question__top">
        <div className="view-question__title">
          {category.title}
        </div>
        <div className='view-question__fav' onClick={modifyFavorited}>
          {category.favorited ? <AiFillStar /> : <AiOutlineStar />}
        </div>
      </div>
      <QuestionCarousel questions={category.questions} loading={loading} />
    </div>
  )
};

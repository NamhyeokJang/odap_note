import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { QuestionCarousel } from '../components'
import { fetchQuestions } from '../utils'

import './ViewQuestions.css'

export default function ViewQuestionsByQuestion() {
  const [loading, setLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const { type } = useParams()


  useEffect(() => {
    fetchQuestions(type)
      .then(res => {
        setQuestions(res)
        setLoading(false)
      })
  }, [type])

  return (
    <>
      <Helmet>
        <title>View Q</title>
      </Helmet>
      <div className="view-question view container">
        <div className="view-question__top">
          <div className="view-question__title">
            틀렸던 문제 보기 {type}
          </div>
        </div>
        <QuestionCarousel questions={questions} loading={loading} />
      </div>
    </>
  )
};

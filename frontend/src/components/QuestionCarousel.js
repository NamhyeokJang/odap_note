import React, { useState, useRef } from 'react'
import { Carousel, Button, Progress } from 'antd'
import { FiBell } from 'react-icons/fi'
import { createLog } from '../utils'

import './QuestionCarousel.css'

export default function QuestionCarousel({ questions, loading }) {
  const [isAnswer, setIsAnswer] = useState(false)
  const [wrongCount, setWrongCount] = useState(0)
  const [progressState, setProgressState] = useState(0)
  const carouselRef = useRef()

  const carouselSettings = {
    ref: carouselRef,
    dots: false,
    infinite: false,
    afterChange: (currentIndex) => {
      const state = parseInt(currentIndex * 100 / questions.length)
      setProgressState(state)
    },
    beforeChange: () => {
      setIsAnswer(false)
    }
  }

  const handleNext = (questionId, bool) => {
    carouselRef.current.next()
    if (bool) {
      createLog(questionId, 'success')
    } else {
      setWrongCount(prev => prev + 1)
      createLog(questionId, 'fail')
    }
  }

  return (
    <div className="question-carousel">
      <Progress percent={progressState} />
      <Carousel {...carouselSettings}>
        {questions.map(q =>
          <Question key={q.id} q={q}
            handleNext={handleNext}
            isAnswer={isAnswer} setIsAnswer={setIsAnswer} />
        )}
        {loading ?
          <div className='question-carousel__question'>

          </div>
          :
          <div className='question-carousel__question'>
            <h1>끝!!</h1>
            <h3>틀린개수: {wrongCount}</h3>
          </div>
        }
      </Carousel>
    </div>
  )
};

const Question = ({ q, isAnswer, setIsAnswer, handleNext }) => {
  return (
    <div className='question-carousel__question'>
      <div className='question-carousel__question-important'>
        {q.important ? <FiBell /> : ''}
      </div>
      <div className="question-carousel__question-text">
        {isAnswer ? q.answer : q.question}
      </div>
      <div className="question-carousel__question-handler">
        <div className="question-carousel__question-top">
          <Button size='large' onClick={() => handleNext(q.id, false)}>틀렸습니다</Button>
          <Button size='large' onClick={() => setIsAnswer(prev => !prev)}>
            {isAnswer ? '문제보기' : '정답보기'}
          </Button>
          <Button size='large' onClick={() => handleNext(q.id, true)}>맞았습니다</Button>
        </div>
      </div>
    </div>
  )
}
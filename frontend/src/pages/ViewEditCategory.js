import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import CSVReader from 'react-csv-reader'
import { Button } from 'antd'
import {
  createQuestions,
  fetchCategory,
  modifyQuestion,
  deleteQuestion
} from '../utils'

import './ViewEditCategory.css'

export default function ViewEditCategory() {
  const [category, setCategory] = useState({ title: '', questions: [], favorited: false })
  const { id } = useParams()

  const onFileLoaded = (data, fileInfo) => {
    if (fileInfo.type !== 'application/vnd.ms-excel') {
      alert('잘못된 파일 형식입니다.')
      return
    }
    data = data.filter(value => value.length > 1)
    createQuestions(id, data)
      .then(res => setCategory(prev => {
        return {
          ...prev,
          questions: [...prev.questions, ...res]
        }
      }))
  }

  const handleDeleteQuestion = id => {
    deleteQuestion(id).then(res => setCategory(prev => {
      return {
        ...prev,
        questions: prev.questions.filter(q => q.id !== id)
      }
    }))
  }

  useEffect(() => {
    fetchCategory(id, '?edit=true').then(res => {
      setCategory(res)
    })
  }, [id])

  return (
    <>
      <Helmet>
        <title>문제편집: {category.title}</title>
      </Helmet>
      <div className='view-editor-category container view'>
        <h1>{category.title}</h1>
        <CSVReader onFileLoaded={onFileLoaded} />
        {category.questions.map(q =>
          <Question key={q.id} q={q} _delete={handleDeleteQuestion} />)}
      </div>
    </>
  )
};

/* Question Component */
const Question = ({ q, _delete, }) => {
  const [excluded, setExcluded] = useState(q.excluded)
  const logs = q.logs ? q.logs : []

  const handleExclude = () => {
    modifyQuestion(q.id, { excluded: !excluded })
    setExcluded(prev => !prev)
  }

  return (
    <div key={q.id} className={`view-editor-category__question ${excluded ? 'q--excluded' : ''}`} >
      <div className="view-editor-category__question__records">
        <span style={{ fontWeight: 'bold', marginRight: '10px' }}>
          푼 횟수: {logs.length}
        </span>
        <span style={{ color: 'var(--blue)', marginRight: '10px' }}>
          맞은 횟수: {logs.filter(t => t.type === 'success').length}
        </span>
        <span style={{ color: 'var(--red)' }}>
          틀린 횟수: {logs.filter(t => t.type === 'fail').length}
        </span>
      </div>
      <label >문제</label>
      <EditableDiv id={q.id} type='question'>{q.question}</EditableDiv>
      <label>정답</label>
      <EditableDiv id={q.id} type='answer'>{q.answer}</EditableDiv>
      <Button onClick={() => _delete(q.id)} style={{ marginTop: '10px', marginRight: '10px' }}>삭제</Button>
      <Button onClick={handleExclude}>제외</Button>
    </div>
  )
}

const EditableDiv = ({ id, type, children }) => {
  const divRef = useRef()

  const updateData = () => {
    const modify = {}
    modify[type] = divRef.current.innerHTML.replace('&nbsp;', ' ')

    modifyQuestion(id, modify)
  }

  const EnterEvent = e => {
    if (e.charCode === 13) {
      e.preventDefault()
      divRef.current.blur()
    }
  }

  return (
    <div ref={divRef}
      contentEditable
      suppressContentEditableWarning
      onBlur={updateData}
      onKeyPress={EnterEvent}
    >
      {children}
    </div>
  )
}
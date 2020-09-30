import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import CSVReader from 'react-csv-reader'
import { Button } from 'antd'
import { createQuestions, fetchCategory, modifyQuestion, deleteQuestion } from '../utils'

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
    fetchCategory(id).then(res => {
      setCategory(res)
    })
  }, [id])

  return (
    <div className='view-editor-category container view'>
      <h1>{category.title}</h1>
      <CSVReader onFileLoaded={onFileLoaded} />
      {category.questions.map(q =>
        <div key={q.id} className='view-editor-category__question'>
          <label >문제</label>
          <EditableDiv id={q.id} type='question'>{q.question}</EditableDiv>
          <label>정답</label>
          <EditableDiv id={q.id} type='answer'>{q.answer}</EditableDiv>
          <Button onClick={() => handleDeleteQuestion(q.id)} style={{ marginTop: '10px' }}>삭제</Button>
        </div>)}
    </div>
  )
};

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
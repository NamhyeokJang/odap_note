import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { Input, Button } from 'antd'
import { fetchCategories, createCategory, deleteCategory } from '../utils'

import './ViewEditor.css'

export default function ViewEditor() {
  const [categoryTitle, setCategoryTitle] = useState('')
  const [categories, setCategories] = useState([])

  const submitCategory = async () => {
    const res = await createCategory(categoryTitle)
    if (res.result === 'error') {
      alert(res.message)
      return
    }
    setCategories(prev => [res.category, ...prev])
    setCategoryTitle('')
  }

  const removeCategory = (id) => {
    deleteCategory(id)
    setCategories(prev => prev.filter(ctg => ctg.id !== id))
  }

  useEffect(() => {
    fetchCategories().then(res => setCategories(res))
  }, [])

  return (
    <>
      <Helmet>
        <title>문제 편집</title>
      </Helmet>
      <div className="view-editor container view">
        <h2>Editor</h2>
        <div className="view-editor__category-input">
          <Input type='text' placeholder='카테고리 입력'
            value={categoryTitle}
            onChange={e => setCategoryTitle(e.target.value)}
            onPressEnter={submitCategory} />
          <Button
            onClick={submitCategory}
          >
            추가
        </Button>
        </div>
        <div className="view-editor__category-container">
          {categories ? categories.map(ctg =>
            <div key={ctg.id} className="view-editor__category">
              <div className="view-editor__category-title">
                {ctg.title}
              </div>
              <div className='view-editor__category-q-count'>
                문제수: {ctg.questionCount}
              </div>
              <div className="view-editor__category-handler">
                <Link to={`/edit/${ctg.id}`}>
                  <div className="view-editor__category-modify">
                    편집
              </div>
                </Link>
                <div className="view-editor__category-delete"
                  onClick={() => removeCategory(ctg.id)}>
                  삭제
              </div>
              </div>
            </div>
          ) : '데이터가 없습니다'}
        </div>
      </div>
    </>
  )
};

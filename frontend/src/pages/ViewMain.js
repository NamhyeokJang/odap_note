import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { CategoryList } from '../components'
import { fetchCategories } from '../utils'

import './ViewMain.css'

export default function ViewMain() {
  const [categories, setCategories] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchCategories().then(res => {
      setCategories(res)
      setLoading(false)
    })
  }, [])

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="view-main view container">
        <div className="view-main__top">
          <Link to='/view/today'>
            <Button>오늘의 학습</Button>
          </Link>
          <Link to='/view/weak'>
            <Button>약점 공략</Button>
          </Link>
        </div>
        {isLoading ? 'Loading...'
          :
          <CategoryList categories={categories} />
        }
      </div>
    </>
  )
};


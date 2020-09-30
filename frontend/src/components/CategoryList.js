import React from 'react'
import { Category } from '.'

import './CategoryList.css'

export default function CategoryList({ categories = [] }) {
  return (
    <div className='category-list'>
      {categories ? '데이터가 없습니다.' :
        categories.map(category =>
          <Category key={category.id} category={category} />
        )
      }

    </div>
  )
};

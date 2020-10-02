import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import moment from 'moment'
import 'moment/locale/ko'
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { fetchLogs } from '../utils'

import './ViewRecords.css'

export default function ViewRecords() {
  const [logs, setLogs] = useState([])
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetchLogs().then(res => {
      setLogs(res.logs)
      setCount(res.count)
    })
  }, [])

  return (
    <div className="view-records view container">
      <div className="view-records__top">
        공부한 문제 수: {count}
      </div>
      <div className="view-records__logs-container">
        {logs.map(log => <Log key={log.id} log={log} />)}
      </div>
    </div>
  )
};

const Log = ({ log }) => {
  const [isAnswer, setIsAnswer] = useState(false)
  return (
    <div className='view-records__log'>
      <div className='view-records__log-status'>
        <span style={{ marginRight: '5px' }}>{moment(log.createdAt).fromNow()}</span>
        {log.type === 'fail' ?
          <FiAlertCircle color='var(--red)' /> :
          <FiCheckCircle color='var(--green)' />
        }
      </div>
      <div className='view-records__question'>
        <p style={{ margin: 0 }}>{isAnswer ? log.question.answer : log.question.question}</p>
        <Button onClick={() => setIsAnswer(prev => !prev)}>
          {isAnswer ? '문제' : '정답'}
        </Button>
      </div>
    </div>
  )
}
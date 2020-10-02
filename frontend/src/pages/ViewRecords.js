import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Button, Select } from 'antd'
import moment from 'moment'
import 'moment/locale/ko'
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import { fetchLogs } from '../utils'

import './ViewRecords.css'

export default function ViewRecords() {
  const [logs, setLogs] = useState([])
  const [count, setCount] = useState(0)
  const [select, setSelect] = useState('')

  useEffect(() => {
    fetchLogs().then(res => {
      setLogs(res.logs)
      setCount(res.count)
    })
  }, [])

  return (
    <>
      <Helmet>
        <title>기록</title>
      </Helmet>
      <div className="view-records view container">
        <div className="view-records__top">
          <span>공부한 문제 수: {count}</span>
          <Select defaultValue='' style={{ width: 120 }} onChange={setSelect}>
            <Select.Option value=''>모든 문제</Select.Option>
            <Select.Option value='fail'>틀린 문제</Select.Option>
            <Select.Option value='success'>맞은 문제</Select.Option>
          </Select>
        </div>
        <div className="view-records__logs-container">
          {logs.filter(log => {
            if (!select) return true
            else return log.type === select
          }).map(log => <Log key={log.id} log={log} />)
          }
        </div>
      </div>
    </>
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
        <p style={{ marginBottom: '10px', fontSize: '1rem', fontWeight: '500' }}>{isAnswer ? log.question.answer : log.question.question}</p>
        <Button onClick={() => setIsAnswer(prev => !prev)}>
          {isAnswer ? '문제' : '정답'}
        </Button>
      </div>
    </div>
  )
}
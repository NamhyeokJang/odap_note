import { dbCategories, dbQuestions } from './DB'
import { fetchCategories } from './categories'
import {
  fetchCategory,
  createCategory,
  modifyCategory,
  deleteCategory,
  createQuestions
} from './category'
import { modifyQuestion, deleteQuestion } from './question'
import { fetchLogs } from './logs'
import { createLog } from './log'


export {
  dbCategories,
  dbQuestions,
  fetchCategories,
  fetchCategory,
  createCategory,
  modifyCategory,
  deleteCategory,
  createQuestions,
  modifyQuestion,
  deleteQuestion,
  fetchLogs,
  createLog
}
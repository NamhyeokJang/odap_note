import faker from 'faker'

const createCategories = () => {
  let categories = []
  for (let i = 1; i < 25; i++) {
    const temp = {
      id: i,
      title: faker.lorem.word(),
      favorited: i % 3 === 0 ? true : false
    }
    categories.push(temp)
  }

  return categories
}

const createQuestions = () => {
  let questions = []

  for (let i = 0; i < 30; i++) {
    const temp = {
      id: i,
      question: `Q: ${faker.lorem.sentence()}`,
      answer: `A: ${faker.lorem.sentence()}`,
      important: i % 5 === 0 ? true : false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    questions.push(temp)
  }

  return questions
}


export const dbCategories = createCategories()
export const dbQuestions = createQuestions()
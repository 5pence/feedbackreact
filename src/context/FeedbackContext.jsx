import { createContext } from "react";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {

  const [ feedback, setFeedback ] = useState([
    {
      id: 1,
      text: 'In context what is confabulation? Confabulation is a symptom of various memory disorders in which made-up stories fill in any gaps in memory.',
      rating: 10
    },
    {
      id: 2,
      rating: 10,
      text: 'What is confabulation? Confabulation is a symptom of various memory disorders in which made-up stories fill in any gaps in memory.'
    },
    {
      id: 3,
      rating: 7,
      text: 'Symptom of various memory disorders in which made-up stories fill in any gaps in memory.'
    },
    {
      id: 4,
      rating: 5,
      text: 'Disorders in which made-up stories fill in any gaps in memory.'
    },
    {
      id: 5,
      rating: 8,
      text: 'Various memory disorders in which made-up stories fill in any gaps in memory.'
    }
  ])

  const [ feedbackEdit, setFeedbackEdit ] = useState({
    item: {},
    edit: false
  })

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  const updateFeedback = (id, upDateditem) => {
    setFeedback(feedback.map((item) => item.id === id ? {
      ...item, ...upDateditem} : item)
    )
  }

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to do this?')) {
      setFeedback(feedback.filter(item => item.id !== id));
    }
  }

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
    setFeedbackEdit({
      item: {},
      edit: false,
    })
  }

  return (
    <FeedbackContext.Provider 
      value={{ 
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
      }}
    >
      { children }
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
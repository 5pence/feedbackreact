import { createContext, useState, useEffect } from "react";

const FeedbackContext = createContext()

export const FeedbackProvider = ({ children }) => {

  const [ feedback, setFeedback ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)
  const [ feedbackEdit, setFeedbackEdit ] = useState({
    item: {},
    edit: false
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    const response = await fetch(`http://localhost:5010/feedback`)
    const data = await response.json()
    setFeedback(data)
    setIsLoading(false)
  }

  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  const updateFeedback = async (id, upDateditem) => {
    const response = await fetch(`http://localhost:5010/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(upDateditem)
    })
    const data = await response.json()
    setFeedback(feedback.map((item) => item.id === id ? {
      ...item, ...data} : item)
    )
    setFeedbackEdit({
      item: {},
      edit: false
    })
  }

  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to do this?')) {
      const response = await fetch(`http://localhost:5010/feedback/${id}`, {
      method: 'DELETE'
    })
    const data = await response.json()
    setFeedback(feedback.filter(item => item.id !== id));
    }
  }

  const addFeedback = async (newFeedback) => {
    const response = await fetch(`http://localhost:5010/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    })
    const data = await response.json()
    setFeedback([data, ...feedback])
  }

  return (
    <FeedbackContext.Provider 
      value={{ 
        feedback,
        isLoading,
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
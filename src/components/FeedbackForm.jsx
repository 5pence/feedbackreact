import { useState, useContext, useEffect } from "react"
import FeedbackContext from "../context/FeedbackContext"
import Card from "./shared/Card"
import Button from "./shared/Button"
import RatingSelect from "./RatingSelect"

function FeedbackForm() {

  const [ ratingScore, setRatingScore ] = useState(10)
  const [ feedbackText, setFeedbackText ] = useState('')
  const [ btnDisabled, setBtnDisabled ] = useState(true)
  const [ validationMessage, setValidationMessage ] = useState('')

  const { addFeedback, feedbackEdit, updateFeedback } = useContext(FeedbackContext)

  useEffect(() => {
    if (feedbackEdit.edit) {
      setRatingScore(feedbackEdit.item.rating)
      setFeedbackText(feedbackEdit.item.text)
      setBtnDisabled(false)
      setValidationMessage('')
    }
  }, [feedbackEdit])

  const handleTextChange = (event) => {
    if (event.target.value.trim().length === 0) {
      setValidationMessage('')
      setBtnDisabled(true)
    }
    if (event.target.value.trim().length > 0 && event.target.value.trim().length < 10) {
      setValidationMessage('You need to type at least 10 characters')
      setBtnDisabled(true)
    }
    if (event.target.value.trim().length >= 10) {
      setValidationMessage('')
      setBtnDisabled(false)
    }
    setFeedbackText(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (feedbackText.trim().length >= 10) {
      const newFeedback = {
        rating: ratingScore,
        text: feedbackText
      }
      feedbackEdit.edit ? updateFeedback(feedbackEdit.item.id, newFeedback) : addFeedback(newFeedback)
      setFeedbackText('')
    }
    // NOTE: reset to default state after submission
    setBtnDisabled(true)
    setRatingScore(10) 
    setFeedbackText('')
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How do you rate your service?</h2>
        <RatingSelect select={(rating) => setRatingScore(rating)}/>
        <div className="input-group">
          <input 
            onChange={handleTextChange} 
            type="text" 
            placeholder="Write a review" 
            value={feedbackText}  
          />
          <Button type="submit" isDisabled={btnDisabled}>Send</Button>
        </div>
        {validationMessage && <div className="massage">{validationMessage}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
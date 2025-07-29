import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateCorrectAnswer }) { // Destructure props
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick() {
    onDeleteQuestion(id); // Call the delete handler with the question's ID
  }

  function handleCorrectAnswerChange(event) {
    onUpdateCorrectAnswer(id, parseInt(event.target.value)); // Call update handler
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleCorrectAnswerChange}> {/* Add onChange */}
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button> {/* Add onClick */}
    </li>
  );
}

export default QuestionItem;
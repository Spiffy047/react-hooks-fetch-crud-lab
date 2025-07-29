import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

// QuestionList now accepts onDeleteQuestion and onUpdateCorrectAnswer as props
function QuestionList({ onDeleteQuestion, onUpdateCorrectAnswer }) {
  const [questions, setQuestions] = useState([]); // State to hold the questions

  useEffect(() => {
    // Fetch questions when the component mounts
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []); // Empty dependency array means this runs once on mount

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            // Pass the handlers down to each QuestionItem
            onDeleteQuestion={onDeleteQuestion}
            onUpdateCorrectAnswer={onUpdateCorrectAnswer}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
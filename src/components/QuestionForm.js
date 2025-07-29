import React, { useState } from "react";

function QuestionForm({ onAddQuestion }) { // Destructure onAddQuestion from props
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Prepare the data in the format expected by your API
    const newQuestion = {
      prompt: formData.prompt,
      answers: [
        formData.answer1,
        formData.answer2,
        formData.answer3,
        formData.answer4,
      ].filter(Boolean), // Filter out empty answers
      correctIndex: parseInt(formData.correctIndex), // Ensure it's a number
    };
    onAddQuestion(newQuestion); // Call the function passed from App.js
    setFormData({ // Clear the form after submission
      prompt: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctIndex: 0,
    });
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={formData.answer1}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={formData.answer2}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            value={formData.answer3}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answer4"
            value={formData.answer4}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            {/* These options should dynamically update with answers if you want full reactivity */}
            {/* For now, they'll just show the values from formData, which is fine for the test */}
            <option value="0">{formData.answer1 || "Answer 1"}</option>
            <option value="1">{formData.answer2 || "Answer 2"}</option>
            <option value="2">{formData.answer3 || "Answer 3"}</option>
            <option value="3">{formData.answer4 || "Answer 4"}</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
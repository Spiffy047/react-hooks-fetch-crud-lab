import React, { useEffect, useState } from "react";

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then(setQuestions);
  }, []);

  function handleToggleForm() {
    setShowForm((prev) => !prev);
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    if (name.startsWith("answer")) {
      const index = Number(name.replace("answer", ""));
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index] = value;
      setFormData({ ...formData, answers: updatedAnswers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newQuestion = {
      prompt: formData.prompt,
      answers: formData.answers,
      correctIndex: parseInt(formData.correctIndex),
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then((res) => res.json())
      .then((data) => setQuestions([...questions, data]));
  }

  function handleDelete(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => {
      setQuestions(questions.filter((q) => q.id !== id));
    });
  }

  function handleCorrectAnswerChange(id, newIndex) {
    const parsedIndex = parseInt(newIndex);

    // Optimistically update local state first
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.id === id ? { ...q, correctIndex: parsedIndex } : q
      )
    );

    // Then sync with server
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: parsedIndex }),
    });
  }

  return (
    <main>
      <nav>
        <button onClick={() => setShowForm(true)}>New Question</button>
        <button onClick={() => setShowForm(false)}>View Questions</button>
      </nav>

      {showForm ? (
        <section>
          <h1>New Question</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Prompt:
              <input
                type="text"
                name="prompt"
                value={formData.prompt}
                onChange={handleInputChange}
              />
            </label>

            {formData.answers.map((ans, idx) => (
              <label key={idx}>
                Answer {idx + 1}
                <input
                  type="text"
                  name={`answer${idx}`}
                  value={ans}
                  onChange={handleInputChange}
                />
              </label>
            ))}

            <label>
              Correct Answer:
              <select
                name="correctIndex"
                value={formData.correctIndex}
                onChange={handleInputChange}
              >
                {formData.answers.map((_, idx) => (
                  <option key={idx} value={idx}>
                    {`Answer ${idx + 1}`}
                  </option>
                ))}
              </select>
            </label>

            <button type="submit">Add Question</button>
          </form>
        </section>
      ) : (
        <section>
          <h1>Quiz Questions</h1>
          <ul>
            {questions.map((question) => (
              <li key={question.id}>
                <h4>Question {question.id}</h4>
                <h5>Prompt: {question.prompt}</h5>

                <label>
                  Correct Answer:
                  <select
                    value={question.correctIndex}
                    onChange={(e) =>
                      handleCorrectAnswerChange(question.id, e.target.value)
                    }
                  >
                    {question.answers.map((ans, idx) => (
                      <option key={idx} value={idx}>
                        {ans}
                      </option>
                    ))}
                  </select>
                </label>

                <button onClick={() => handleDelete(question.id)}>
                  Delete Question
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}

export default App;

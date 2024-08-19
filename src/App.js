import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: {
      coding: false,
      design: false,
      writing: false,
    },
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        interests: {
          ...prevData.interests,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const { name, email, interests } = formData;
  const interestList = Object.entries(interests)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(', ');

  return (
    <main>
      <h1>Hi, I'm (your name)</h1>
      <img alt="My profile pic" src="https://via.placeholder.com/350" />
      <h2>About Me</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <div>
        <a href="https://github.com">GitHub</a>
        <a href="https://linkedin.com">LinkedIn</a>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <fieldset>
          <legend>Interests:</legend>
          <label>
            <input
              type="checkbox"
              name="coding"
              checked={interests.coding}
              onChange={handleChange}
            />
            Coding
          </label>
          <label>
            <input
              type="checkbox"
              name="design"
              checked={interests.design}
              onChange={handleChange}
            />
            Design
          </label>
          <label>
            <input
              type="checkbox"
              name="writing"
              checked={interests.writing}
              onChange={handleChange}
            />
            Writing
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <p>
          Thank you for signing up, {name}! We have received your interest in {interestList}.
        </p>
      )}
    </main>
  );
}

export default App;

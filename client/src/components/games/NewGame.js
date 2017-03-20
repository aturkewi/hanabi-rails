import React from 'react';

export default ({ createGame }) => {
  
  let input = {};
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const title = input.title.value.trim()
    if (!!title) {
      createGame(title);
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            ref={node => input.title = node}
            type="text"
          />
          <input
            type="submit"
            value="Create Game"
          />
        </div>
      </form>
    </div>
  )
}

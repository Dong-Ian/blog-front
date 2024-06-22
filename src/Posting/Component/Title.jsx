function Title({ title, setTitle }) {
  function handleInput(event) {
    const {
      target: { value },
    } = event;
    setTitle(value);
  }

  return (
    <div>
      <p>title</p>
      <input
        name="title"
        onChange={handleInput}
        placeholder="title"
        value={title}
      />
    </div>
  );
}

export default Title;

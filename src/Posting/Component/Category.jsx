function Catetory({ category, setCategory }) {
  function handleInput(event) {
    const {
      target: { value },
    } = event;
    setCategory(value);
  }

  return (
    <div>
      <p>category</p>
      <input
        name="category"
        onChange={handleInput}
        placeholder="cagetory"
        value={category}
      />
    </div>
  );
}

export default Catetory;

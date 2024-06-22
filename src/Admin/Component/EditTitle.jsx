function EditElement({ placeholder, text, getter, setter }) {
  function handleInput(event) {
    const {
      target: { value },
    } = event;
    setter(value);
  }

  return (
    <div>
      <p>{text}</p>
      <input
        placeholder={placeholder}
        value={getter}
        onChange={handleInput}
        name={getter}
      />
    </div>
  );
}

export default EditElement;

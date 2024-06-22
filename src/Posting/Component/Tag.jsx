import { useState } from "react";

function Tag({ tag, setTag }) {
  const [tagElement, setTagElement] = useState("");

  function handleTag(event) {
    const {
      target: { value },
    } = event;
    setTagElement(value);
  }

  function handleKeyPress(event) {
    if (
      (event.key === "Enter" || event.key === " ") &&
      tagElement.trim() !== ""
    ) {
      setTag((prevTags) => [...prevTags, tagElement]);
      setTagElement("");
    }
  }

  function handleClearClick(index) {
    setTag((prevTags) => prevTags.filter((_, i) => i !== index));
  }

  function TagRender() {
    return tag.map((tag, index) => {
      return (
        <div key={index}>
          <p>{tag}</p>
          <button onClick={() => handleClearClick(index)}>x</button>
        </div>
      );
    });
  }

  return (
    <div>
      <p>태그</p>
      <TagRender />
      <input
        placeholder="tag"
        value={tagElement}
        onChange={handleTag}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}

export default Tag;

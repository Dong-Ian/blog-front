import { useState } from "react";

import styles from "../Style/Posting.module.css";

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
        <div className={styles.tag_box} key={index}>
          <p>{tag}</p>
          <button onClick={() => handleClearClick(index)}>x</button>
        </div>
      );
    });
  }

  return (
    <div className={styles.tag}>
      <TagRender />
      <input
        placeholder="태그를 입력해주세요"
        value={tagElement}
        onChange={handleTag}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}

export default Tag;

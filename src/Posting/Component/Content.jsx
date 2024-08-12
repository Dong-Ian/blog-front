import { useMemo, useRef, useState } from "react";

import { storage } from "../../Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import styles from "../Style/Posting.module.css";
import quill_styles from "../Style/Quill.module.css";

import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize";

import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark-reasonable.css";

function Content({ content, setContent }) {
  const quillRef = useRef();

  const bold = Quill.import("formats/bold");
  bold.tagName = "b";
  Quill.register(bold, true);

  const italic = Quill.import("formats/italic");
  italic.tagName = "i";
  Quill.register(italic, true);

  const BlockEmbed = Quill.import("blots/block/embed");

  class DividerBlot extends BlockEmbed {
    static blotName = "divider";
    static tagName = "hr";
  }

  Quill.register(DividerBlot);

  hljs.configure({
    languages: [
      "javascript",
      "ruby",
      "python",
      "java",
      "cpp",
      "kotlin",
      "sql",
      "swift",
      "c",
      "flutter",
    ],
  });

  Quill.register("modules/ImageResize", ImageResize);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      const editor = quillRef.current.getEditor();
      const file = input.files[0];
      const range = editor.getSelection(true);
      try {
        // 파일명을 "image/Date.now()"로 저장
        const storageRef = ref(storage, `image/${Date.now()}`);

        // Firebase Method : uploadBytes, getDownloadURL
        await uploadBytes(storageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            // 이미지 URL 에디터에 삽입
            editor.insertEmbed(range.index, "image", url);

            // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
            editor.setSelection(range.index + 1);
          });
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block", "divider"],
          ["link", "image", "video"],

          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          [{ indent: "-1" }, { indent: "+1" }],

          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],

          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      syntax: {
        highlight: (text) => hljs.highlightAuto(text).value,
      },
      ImageResize: {
        parchment: Quill.import("parchment"),
      },
    };
  }, []);

  return (
    <div className={styles.textForm}>
      <ReactQuill
        className={styles.textBox}
        placeholder="내용을 작성해주세요"
        theme="snow"
        ref={quillRef}
        value={content}
        onChange={setContent}
        modules={modules}
      />
    </div>
  );
}

export default Content;

import { useMemo, useRef, useState } from "react";
import { storage } from "../../Firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import styles from "../Style/Posting.module.css";
import quill_styles from "../Style/Quill.module.css";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark-reasonable.css";

/**
 * Content 컴포넌트
 *
 * 이 컴포넌트는 ReactQuill을 사용하여 사용자에게 WYSIWYG 에디터를 제공하며,
 * 이미지 업로드 및 코드 하이라이팅 기능을 지원합니다.
 *
 * @param {Object} props - 컴포넌트의 속성
 * @param {string} props.content - 에디터의 초기 내용
 * @param {Function} props.setContent - 에디터 내용 변경 시 호출되는 함수
 * @returns {JSX.Element} - ReactQuill 에디터를 렌더링한 JSX 요소
 */
function Content({ content, setContent }) {
  // Quill 에디터에 대한 참조를 생성합니다.
  const quillRef = useRef();

  // Quill의 기본 서식(format)을 커스터마이즈합니다.
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

  // 코드 하이라이팅을 위한 hljs 설정
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

  // ImageResize 모듈을 등록합니다.
  Quill.register("modules/ImageResize", ImageResize);

  /**
   * 이미지 업로드 핸들러
   *
   * 사용자가 이미지를 선택하면 Firebase Storage에 업로드하고,
   * 에디터에 이미지 URL을 삽입합니다.
   */
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
        // Firebase Storage에 이미지 업로드
        const storageRef = ref(storage, `image/${Date.now()}`);

        // 파일을 업로드하고 다운로드 URL을 얻습니다.
        await uploadBytes(storageRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            // 에디터에 이미지 URL을 삽입합니다.
            editor.insertEmbed(range.index, "image", url);

            // URL 삽입 후 커서를 이미지 뒷 칸으로 이동합니다.
            editor.setSelection(range.index + 1);
          });
        });
      } catch (error) {
        console.log(error);
      }
    });
  };

  // Quill 에디터의 모듈 설정
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

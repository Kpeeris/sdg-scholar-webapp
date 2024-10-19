import { useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import { useParams } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useAuthContext } from "@/AuthProvider";

import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Button } from "@/components/ui/button";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../../firebaseFiles/firebaseConfig.js";

import parse from "html-react-parser";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

import sanitizeHtml from 'sanitize-html';

const Content = () => {
  const { moduleId } = useParams(); // Capture the module ID from the URL
  const [image1Url, setImage1Url] = useState("");
  const [image2Url, setImage2Url] = useState("");
  const [textEditorShow, setTextEditorShow] = useState(false);

  const { role } = useAuthContext();

  let isAdmin = role === "admin";

  //let admin = true

  const [content, setContent] = useState("");

  //const [showCancel, setShowCancel] = useState(false)

  const storage = getStorage();

  let dbModuleId = moduleId;
  if (moduleId === "a") {
    dbModuleId = "8";
  } else if (moduleId === "b") {
    dbModuleId = "9";
  } else if (moduleId === "c") {
    dbModuleId = "10";
  }

  const transform = (node) => {
    //console.log(`NAME IS: ${node.name}`)
    if (node.attribs && node.attribs.class) {
      if (node.attribs.class.includes("ql-align-center")) {
        node.attribs.style = {
          ...node.attribs.style,
          textAlign: "center",
        };
      }
      if (node.attribs.class.includes("ql-align-right")) {
        node.attribs.style = {
          ...node.attribs.style,
          textAlign: "right",
        };
      }
      if (node.attribs.class.includes("ql-size-small")) {
        node.attribs.style = {
          ...node.attribs.style,
          fontSize: "0.75em",
        };
      }
      if (node.attribs.class.includes("ql-size-large")) {
        node.attribs.style = {
          ...node.attribs.style,
          fontSize: "2em",
        };
      }
      if (node.attribs.class.includes("ql-size-huge")) {
        node.attribs.style = {
          ...node.attribs.style,
          fontSize: "3em",
        };
      }
      if (node.attribs.class.includes("ql-indent-1")) {
        node.attribs.style = {
          ...node.attribs.style,
          marginLeft: "3em",
        };
      }

      node.attribs.className = node.attribs.class; // Convert class to className
      delete node.attribs.class; // Remove the old class attribute
    }
    if (node.name == "a") {
      //console.log("REACHED A LINK")
      //node.attribs.className = 'quill-link';
      node.attribs.style = {
        ...node.attribs.style,
        textDecoration: "underline",
        color: "blue",
      };
    }
    if (node.name == "p" && node.children.length === 1 && node.children[0].name == "br"){
      return <br />
    }
  };

  const getContent = async (moduleId) => {
    try {
      const docRef = doc(db, `quizzes/sdg11t${moduleId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data().content);
        setContent(docSnap.data().content);
      } else {
        console.log("Document does not exist");
      }
    } catch (e) {
      console.error("Error retrieving document: ", e);
    }
  };

  useEffect(() => {
    getContent(dbModuleId);
    console.log(`${content}`);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //text editor styling credit to https://medium.com/@aalam-info-solutions-llp/how-to-build-a-text-editor-in-react-js-d5c7fdb321ef
  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      //[ { list: "bullet" }],
      ["link", "image"],
      [{ list: "bullet" }, { indent: "-1" }, { indent: "+1" }, { align: [] }],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };

  var formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
  ];

  const handleProcedureContentChange = (newContent) => {
    setContent(newContent);
    console.log("content---->", newContent);
  };

  //const [buttonState, setButtonState] = useState('Edit')

  const adminContentWrite = async (newContent) => {
    const docRef = doc(db, `quizzes/sdg11t${moduleId}`);

    console.log("trying to update");
    console.log("module id is: ", moduleId);

    try {
      console.log("doc reference is :  ", docRef);
      await updateDoc(docRef, { content: newContent });
      console.log("update successful");
    } catch (e) {
      console.error("Error retrieving document: ", e);
    }
  };

  const handleClick = (newContent) => {
    console.log("NEW CONTENT", newContent);
    setTextEditorShow(false);
    //setButtonState('Edit')
    if (newContent) {
      console.log("new content is --->", newContent);
      adminContentWrite(newContent);
    } else {
      console.log("NO NEW CONTENT");
    }
  };

  const handleCancelClick = () => {
    setTextEditorShow(false);
    //setButtonState('Edit')
  };

  const retrieveImages = async () => {
    //const dbString = `/sdg11/target${dbModuleId}/GOAL_11_TARGET_11.1.png`
    //const testDbString= "New Ardoch Logo (1) 1.png"
    //console.log(`trying to hit: ${dbString}`)
    console.log(`${isNaN(Number(dbModuleId))}`);
    try {
      getDownloadURL(
        ref(
          storage,
          `/sdg11/target${dbModuleId}/GOAL_11_TARGET_11.${
            isNaN(Number(moduleId)) ? moduleId.toUpperCase() : dbModuleId
          }.png`
        )
      ).then((url) => {
        setImage1Url(url);
      });
      getDownloadURL(
        ref(
          storage,
          `sdg11/target${dbModuleId}/MC_Target_11.${
            isNaN(Number(moduleId)) ? moduleId.toUpperCase() : dbModuleId
          }.png`
        )
      ).then((url) => {
        console.log(url);
        setImage2Url(url);
      });
    } catch (error) {
      console.error("Error retrieving images:", error);

      // Handling different error types
      if (error.code === "storage/object-not-found") {
        console.error("The file does not exist at the specified path.");
      } else if (error.code === "storage/unauthorized") {
        console.error("User does not have permission to access the file.");
      } else {
        console.error("Unknown error occurred:", error.message);
      }
    }
    //const storageRef1 = ref(storage, `/sdg11/target${dbModuleId}/GOAL_11_TARGET_11.1.png`)
    //const storageRef2 = ref(storage, `/sdg11/target${dbModuleId}/MC_Target_11.1.png`)
  };

  useEffect(() => {
    retrieveImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(
      `url of image 1 is ${image1Url}. url of mage 2 is ${image2Url}`
    );
  }, []);

  // You can replace this with logic to dynamically retrieve module info
  const moduleTitle = `Target 11.${moduleId}`;

  return (
    <div className="flex">
      <SideMenu moduleTitle={moduleTitle} moduleId={moduleId} />
      <div className="ml-[250px] flex-1">
        <div className="flex justify-between">
          <h1>{moduleTitle} Content</h1>
          <br />
          {isAdmin ? (
            <Button
              className="w-44 text-lg"
              onClick={() => setTextEditorShow(true)}
            >
              <PencilSquareIcon className="h-6 w-6 text-white" /> Edit Content
            </Button>
          ) : null}
        </div>
        <hr className="w-full mt-4 border-white" />
        <div className="relative h-96 flex flex-cols">
          <img src={image1Url} alt="Image 1" />
          <img src={image2Url} alt="Image 2" />
        </div>
        <br />
        <div>
          {textEditorShow === false ? (
            <div>
              {content
                ? parse(content, {
                    replace: (domNode) => {
                      transform(domNode); // Apply the transformation
                      return domNode; // Return the transformed node
                    },
                  })
                : null}
            </div>
          ) : (
            <div>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={content}
                onChange={handleProcedureContentChange}
                style={{
                  height: "400px",
                  maxWidth: "100%",
                  overflowWrap: "break-word",
                  wordWrap: "break-word",
                }}
              ></ReactQuill>
            </div>
          )}
          <br />
          <br />
          <br />
          <div>
            {isAdmin && textEditorShow ? (
              <Button
                onClick={() => {
                  handleClick(content);
                }}
                style={{ marginRight: "10px" }}
              >
                Publish
              </Button>
            ) : null}
            {isAdmin && textEditorShow ? (
              <Button
                onClick={() => {
                  handleCancelClick();
                }}
              >
                Cancel
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;

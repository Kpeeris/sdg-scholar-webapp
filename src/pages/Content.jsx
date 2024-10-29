import { useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import { useParams } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useAuthContext } from "@/AuthProvider";

import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Button } from "@/components/ui/button";
//import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

import { doc, getDoc, updateDoc } from "firebase/firestore";
import db from "../../firebaseFiles/firebaseConfig.js";

import parse from "html-react-parser";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
//import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

import sanitizeHtml from 'sanitize-html';

const Content = () => {
  const { moduleId } = useParams(); // Capture the module ID from the URL
  const [image1Url, setImage1Url] = useState("");
  const [image2Url, setImage2Url] = useState("");
  const [textEditorShow, setTextEditorShow] = useState(false);

  const { role } = useAuthContext();

  let isAdmin = role === "admin";

  const [content, setContent] = useState("");
  const [pulledContent, setPulledContent] = useState("")
  const [databaseError, setDatabaseError] = useState("")

  const storage = getStorage();

  let dbModuleId = moduleId;
  if (moduleId === "a") {
    dbModuleId = "8";
  } else if (moduleId === "b") {
    dbModuleId = "9";
  } else if (moduleId === "c") {
    dbModuleId = "10";
  }
  {/*  const deleteEmptyQuestions = async () => {

    const docRef = collection(db, `quizzes/sdg11t4/questions`);
    const docSnap = await getDocs(docRef);
    docSnap.forEach((doc) => {
      if((doc.id).slice(0,3) == "sdg"){
        console.log("not wrong")
      } else{
        console.log(`DELETE!${doc.id}`)
        console.log("DELETE THIS")
        deleteDoc(doc.ref)
      }
      
    })
  }*/}

  {/*const saveImage = () => {

  }*/}
  


  const transform = (node) => {
    //console.log(`NAME IS: ${node.name}`)
    if (node.attribs) {
      //console.log("ATTRIBS EXIST")
      if (typeof node.attribs.style === "string") {
        const styleObject = {};
        //console.log("THIS STYLE IS A STRING")
        node.attribs.style.split(";").forEach((style) => {
            const [key, value] = style.split(":").map(s => s.trim());
            console.log(`KEY: ${key} AND VALUE: ${value}`)
            if (key && value) {
                // Convert CSS keys to camelCase for React styles (e.g., "font-size" to "fontSize")
                const camelCaseKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                styleObject[camelCaseKey] = value;
            }
        });
        node.attribs.style = styleObject;
      } else if (!node.attribs.style && node.attribs.class) {
        //console.log("CREATING A STYLE ATTRIB FOR CLASS ATTRIB")
          node.attribs.style = {};
      }
        
    
      if (node.attribs.class) {
        if (node.attribs.class.includes("ql-align-center")) {
          node.attribs.style.textAlign = "center"
        }
        if (node.attribs.class.includes("ql-align-right")) {
          node.attribs.style.textAlign = "right"
        }
        if (node.attribs.class.includes("ql-size-small")) {
          node.attribs.style.fontSize = "0.75em"
        }
        if (node.attribs.class.includes("ql-size-large")) {
          node.attribs.style.fontSize = "2em"
        }
        if (node.attribs.class.includes("ql-size-huge")) {
          //console.log("the size is: HUGE")
          node.attribs.style.fontSize = "3em"
        }
        if (node.attribs.class.includes("ql-indent-1")) {
          node.attribs.style.marginLeft = "3em"
          
        }

        //node.attribs.className = node.attribs.class; // Convert class to className
        delete node.attribs.class; // Remove the old class attribute
      }
      if (node.name == "a") {
        node.attribs.style = {textDecoration: "underline", color: "blue"}
        //node.attribs.style.textDecoration = "underline"
        //node.attribs.style.color = "blue"
      }
      
    }
    //console.log(`node name is ${node.name}`)
    if (node.name == "p" && node.children.length === 1 && node.children[0].name == "br"){
      console.log("THERE IS A BREAK HERE")
      node = <br/>
    }
    
  };

  const getContent = async (moduleId) => {
    try {
      const docRef = doc(db, `quizzes/sdg11t${moduleId}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data().content);
        setContent(docSnap.data().content);
        setPulledContent(docSnap.data().content);
      } else {
        console.log("Document does not exist");
      }
    } catch (e) {
      console.error("Error retrieving document: ", e);
      setDatabaseError(e)
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
    const docRef = doc(db, `quizzes/sdg11t${dbModuleId}`);

    console.log("trying to update");
    console.log("module id is: ", moduleId);

    console.log(`HTML IS UNSANITIZED: ${newContent}`)

    const writeableContent = sanitizeHtml(newContent, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([ "img" ]),
      //allowedAttributes: sanitizeHtml.defaults.allowedAttributes[ "img" ].concat(["src"])
      allowedSchemes: sanitizeHtml.defaults.allowedSchemes.concat(["data"]),
      allowedAttributes: {...sanitizeHtml.defaults.allowedAttributes, 
        "p": ["class", "style"], 
        "span": ["class", "style"], 
        "s": ["class", "style"],
        "strong": ["class", "style"],
        "u": ["class", "style"],
        "em": ["class", "style"]},
      allowedStyles: {
        "*": {
          color: [/^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/],
          fontSize: [/^\d+(\.\d+)?(px|em|%)$/],
          textAlign: [/^left|right|center|justify$/],
        },
      },
    });

    console.log(`WRITNG: ${writeableContent}`)

    try {
      console.log("doc reference is :  ", docRef);
      await updateDoc(docRef, { content: writeableContent });
      console.log(`WRITING:         ${writeableContent}`)
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
      //transform(newContent)
      adminContentWrite(newContent);
    } else {
      console.log("NO NEW CONTENT");
    }
  };

  const handleCancelClick = () => {
    setTextEditorShow(false);
    setContent(pulledContent)
    //setButtonState('Edit')
  };

  const retrieveImages = async () => {
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
  };

  useEffect(() => {
    retrieveImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // You can replace this with logic to dynamically retrieve module info
  const moduleTitle = `Target 11.${moduleId}`;

  return (
    <div className="flex">
      <SideMenu moduleTitle={moduleTitle} moduleId={moduleId} />
      {databaseError ? 
        <div>
          <Alert variant="destructive">
            <ExclamationCircleIcon className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{databaseError}</AlertDescription>
          </Alert>
        </div> : 
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
      }
      
    </div>
  );
};

export default Content;

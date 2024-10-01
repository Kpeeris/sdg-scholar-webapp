import { useState, useEffect } from "react";
import SideMenu from "../components/SideMenu";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import db from "../../firebaseFiles/firebaseConfig.js";
import EditableBlock from "../components/EditableBlock";

const Content = () => {
  const { moduleId } = useParams(); // Capture the module ID from the URL

  // Issue moduleId is not in the form 11.{id} when before it was just {id}
  // i think this affects the api call because the content no longer appears on
  // the page

  const [content, setContent] = useState("");

  useEffect(() => {
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

    getContent(moduleId);
  });

  return (
    <div className="ml-[250px]">
      <h2>Content Page</h2>
      <SideMenu moduleId={moduleId} />
      {content ? (
        <div>
          <EditableBlock content={content} />
        </div>
      ) : null}

      {/*<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ab sunt aliquam suscipit dolor inventore laborum doloribus, aliquid consequuntur laudantium nam ipsa voluptates porro ad est incidunt impedit esse corrupti, necessitatibus accusantium. Qui quam sed beatae dignissimos enim officiis nam, voluptates molestias esse cumque magni similique nobis a magnam perferendis perspiciatis? Eligendi corrupti quod laboriosam maxime velit consequatur, veritatis similique voluptates, dolorem alias impedit ducimus commodi error! Voluptatem fuga adipisci at, nostrum quo rem, quibusdam beatae laborum magni, eaque recusandae? Cumque neque ullam hic, vitae iure nulla similique unde eaque cum omnis? Rerum perferendis culpa tempore, saepe officia mollitia sed!</p>
        <br />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ab sunt aliquam suscipit dolor inventore laborum doloribus, aliquid consequuntur laudantium nam ipsa voluptates porro ad est incidunt impedit esse corrupti, necessitatibus accusantium. Qui quam sed beatae dignissimos enim officiis nam, voluptates molestias esse cumque magni similique nobis a magnam perferendis perspiciatis? Eligendi corrupti quod laboriosam maxime velit consequatur, veritatis similique voluptates, dolorem alias impedit ducimus commodi error! Voluptatem fuga adipisci at, nostrum quo rem, quibusdam beatae laborum magni, eaque recusandae? Cumque neque ullam hic, vitae iure nulla similique unde eaque cum omnis? Rerum perferendis culpa tempore, saepe officia mollitia sed!</p>
        <br />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ab sunt aliquam suscipit dolor inventore laborum doloribus, aliquid consequuntur laudantium nam ipsa voluptates porro ad est incidunt impedit esse corrupti, necessitatibus accusantium. Qui quam sed beatae dignissimos enim officiis nam, voluptates molestias esse cumque magni similique nobis a magnam perferendis perspiciatis? Eligendi corrupti quod laboriosam maxime velit consequatur, veritatis similique voluptates, dolorem alias impedit ducimus commodi error! Voluptatem fuga adipisci at, nostrum quo rem, quibusdam beatae laborum magni, eaque recusandae? Cumque neque ullam hic, vitae iure nulla similique unde eaque cum omnis? Rerum perferendis culpa tempore, saepe officia mollitia sed!</p>
        <br />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ab sunt aliquam suscipit dolor inventore laborum doloribus, aliquid consequuntur laudantium nam ipsa voluptates porro ad est incidunt impedit esse corrupti, necessitatibus accusantium. Qui quam sed beatae dignissimos enim officiis nam, voluptates molestias esse cumque magni similique nobis a magnam perferendis perspiciatis? Eligendi corrupti quod laboriosam maxime velit consequatur, veritatis similique voluptates, dolorem alias impedit ducimus commodi error! Voluptatem fuga adipisci at, nostrum quo rem, quibusdam beatae laborum magni, eaque recusandae? Cumque neque ullam hic, vitae iure nulla similique unde eaque cum omnis? Rerum perferendis culpa tempore, saepe officia mollitia sed!</p>
        <br />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ab sunt aliquam suscipit dolor inventore laborum doloribus, aliquid consequuntur laudantium nam ipsa voluptates porro ad est incidunt impedit esse corrupti, necessitatibus accusantium. Qui quam sed beatae dignissimos enim officiis nam, voluptates molestias esse cumque magni similique nobis a magnam perferendis perspiciatis? Eligendi corrupti quod laboriosam maxime velit consequatur, veritatis similique voluptates, dolorem alias impedit ducimus commodi error! Voluptatem fuga adipisci at, nostrum quo rem, quibusdam beatae laborum magni, eaque recusandae? Cumque neque ullam hic, vitae iure nulla similique unde eaque cum omnis? Rerum perferendis culpa tempore, saepe officia mollitia sed!</p>
        <br />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ab sunt aliquam suscipit dolor inventore laborum doloribus, aliquid consequuntur laudantium nam ipsa voluptates porro ad est incidunt impedit esse corrupti, necessitatibus accusantium. Qui quam sed beatae dignissimos enim officiis nam, voluptates molestias esse cumque magni similique nobis a magnam perferendis perspiciatis? Eligendi corrupti quod laboriosam maxime velit consequatur, veritatis similique voluptates, dolorem alias impedit ducimus commodi error! Voluptatem fuga adipisci at, nostrum quo rem, quibusdam beatae laborum magni, eaque recusandae? Cumque neque ullam hic, vitae iure nulla similique unde eaque cum omnis? Rerum perferendis culpa tempore, saepe officia mollitia sed!</p>
        <br />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ab sunt aliquam suscipit dolor inventore laborum doloribus, aliquid consequuntur laudantium nam ipsa voluptates porro ad est incidunt impedit esse corrupti, necessitatibus accusantium. Qui quam sed beatae dignissimos enim officiis nam, voluptates molestias esse cumque magni similique nobis a magnam perferendis perspiciatis? Eligendi corrupti quod laboriosam maxime velit consequatur, veritatis similique voluptates, dolorem alias impedit ducimus commodi error! Voluptatem fuga adipisci at, nostrum quo rem, quibusdam beatae laborum magni, eaque recusandae? Cumque neque ullam hic, vitae iure nulla similique unde eaque cum omnis? Rerum perferendis culpa tempore, saepe officia mollitia sed!</p>
        <br />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ab sunt aliquam suscipit dolor inventore laborum doloribus, aliquid consequuntur laudantium nam ipsa voluptates porro ad est incidunt impedit esse corrupti, necessitatibus accusantium. Qui quam sed beatae dignissimos enim officiis nam, voluptates molestias esse cumque magni similique nobis a magnam perferendis perspiciatis? Eligendi corrupti quod laboriosam maxime velit consequatur, veritatis similique voluptates, dolorem alias impedit ducimus commodi error! Voluptatem fuga adipisci at, nostrum quo rem, quibusdam beatae laborum magni, eaque recusandae? Cumque neque ullam hic, vitae iure nulla similique unde eaque cum omnis? Rerum perferendis culpa tempore, saepe officia mollitia sed!</p>
        <br />*/}
    </div>
  );
};

export default Content;

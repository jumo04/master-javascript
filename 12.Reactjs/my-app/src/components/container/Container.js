import React, { Fragment } from "react";
import { useState } from "react";
import Articles from "./articles/Articles";

export default function Container() {
  //como contruir un hoot primero se pasa la variable segundo se pasa la funcion que modifica el estado de la variable
  const [article, setArticle] = useState([
    {
      id: 1,
      title: "TITLE HEADING 1",
      description:
        "Sunt in culpa qui officia deserunt mollit anim id est laborum nconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ullamco.",
    },
    {
      id: 2,
      title: "TITLE HEADING 2",
      description:
        "Sunt in culpa qui officia deserunt mollit anim id est laborum nconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ullamco.",
    },
  ]);
  return (
    <Fragment>

    <div className="col-sm-8">
      {article.map((article) => (
        <Articles key={article.id} article={article} />
      ))}
    </div>
    <button  className="btn btn-outline-primary btn-sm mx-auto mb-3" type="button" onClick={() => setArticle([
        {
            id: 1,
            title: "TITLE HEADING 3",
            description:
              "Sunt in culpa qui officia deserunt mollit anim id est laborum nconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ullamco.",
          },
          {
            id: 2,
            title: "TITLE HEADING 4",
            description:
              "Sunt in culpa qui officia deserunt mollit anim id est laborum nconsectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboreet dolore magna aliqua. Ut enim ad minim veniam, quis nostrudexercitation ullamco.",
          },
        
    ])}>Cambiar</button>
    </Fragment>

  );
}

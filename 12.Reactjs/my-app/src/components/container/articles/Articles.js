import React, { Fragment } from "react";
import ("./article.css");

export default function Articles({article}) {
    const { id, title, description } = article;
  return (
    <Fragment>
      <h2>{title}</h2>
      <h5>Title description, Sep 2, 2017</h5>
      <div className="fakeimg">Fake Image</div>
      <p>Some text..</p>
      <p>
       {description}
      </p>
    </Fragment>
  );
}

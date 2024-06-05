import React, { Fragment } from "react";

export default function Footer({date}) {
  return (
    <div className="jumbotron text-center" style={{ "margin-bottom": "0" }}>
      <p>{date}</p>
    </div>
  );
}

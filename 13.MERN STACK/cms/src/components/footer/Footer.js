import React, { Fragment } from "react";

export default function Footer() {
  return (
    <Fragment>
      <footer className="main-footer">
        <div className="float-right d-none d-sm-inline"></div>
        <strong>
          Copyright &copy; 2014-2019{" "}
          <a href="#/">AdminLTE.io</a>.
        </strong>{" "}
        All rights reserved.
      </footer>
    </Fragment>
  );
}

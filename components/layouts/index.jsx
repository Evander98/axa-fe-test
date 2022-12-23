import Head from "next/head";
import React, { useState } from "react";
import Drawer from "../Drawer";
import Header from "../Header";

const Layout = ({ children, title }) => {
  const [toggle, setToggle] = useState(true);

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <div className="flex">
        <div className={toggle ? "" : "mr-14"}>
          <Drawer toggle={toggle} setToggle={setToggle} />
        </div>
        <div className="p-8 w-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

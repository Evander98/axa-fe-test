import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../components/layouts";
import Loading from "../components/Loading";

const Redirect = () => {
  let router = useRouter();
  useEffect(() => {
    router.push("/user");
  }, []);
  return <Loading/>
};

export default Redirect;

Redirect.getLayout = (page) => {
  return <Layout title="Loading...">{page}</Layout>;
};

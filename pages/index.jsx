import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../components/layouts";

const Loading = () => {
  let router = useRouter();
  useEffect(() => {
    router.push("/user");
  }, []);
  return <p>Loading...</p>
};

export default Loading;

Loading.getLayout = (page) => {
  return <Layout title="Loading...">{page}</Layout>;
};

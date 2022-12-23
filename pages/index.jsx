import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Layout from "../components/layouts";

const index = () => {
  let router = useRouter();
  useEffect(() => {
    router.push("/user");
  }, []);
};

export default index;

index.getLayout = (page) => {
  return <Layout title="Loading...">{page}</Layout>;
};

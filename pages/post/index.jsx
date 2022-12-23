import axios from "axios";
import React from "react";
import Layout from "../../components/layouts";
import CardList from "../../components/List/Card";

export async function getServerSideProps() {
  let items = [];
  let { status, data } = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL + "/posts",
    {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    }
  );
  if (status === 200) {
    items = data;
  }
  return {
    props: { data: items },
  };
}

const Post = ({ data }) => {
  return (
    <div className="page__container">
      <CardList data={data} meta={{ text: "Posts", link: "/post" }} />
    </div>
  );
};

export default Post;

Post.getLayout = (page) => {
  return <Layout title="Post - List">{page}</Layout>;
};

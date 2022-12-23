import axios from "axios";
import React from "react";
import PostCard from "../../components/Card/Post";
import Layout from "../../components/layouts";

export async function getServerSideProps({ params }) {
  let { id } = params;
  let items = [];
  let { status, data } = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL + `/photos/${id}`,
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

const PhotoDetail = ({ data }) => {
  return (
    <div className="page__container">
      <PostCard data={data} />
    </div>
  );
};

export default PhotoDetail;

PhotoDetail.getLayout = (page) => {
  return <Layout title="Photo - Detail">{page}</Layout>;
};

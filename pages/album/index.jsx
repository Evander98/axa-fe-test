import axios from "axios";
import React from "react";
import Layout from "../../components/layouts";
import CardList from "../../components/List/Card";

export async function getServerSideProps() {
  let items = [];
  let { status, data } = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL + "/albums",
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

const Album = ({data}) => {
  return (
    <div className="page__container">
      <CardList data={data} meta={{ text: "Albums", link: "/album" }} />
    </div>
  );
};

export default Album;

Album.getLayout = (page) => {
  return <Layout title="Album - List">{page}</Layout>;
};

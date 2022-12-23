import axios from 'axios';
import React from 'react'
import Layout from '../../components/layouts'
import CardList from '../../components/List/Card';

export async function getServerSideProps() {
  let items = [];
  let { status, data } = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL + "/photos",
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

const Photo = ({data}) => {
  return (
    <div className="page__container">
      <CardList data={data} meta={{ text: "Photos", link: "/photo" }} />
    </div>
  )
}

export default Photo


Photo.getLayout = (page) => {
  return <Layout title="Photo - List">{page}</Layout>;
};

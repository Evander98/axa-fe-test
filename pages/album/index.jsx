import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts";
import CardList from "../../components/List/Card";
import Loading from "../../components/Loading";

const Album = () => {
  const [data, setData] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    setIsLoading(true);
    let res = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + "/albums");
    if (res.status === 200) {
      setData(res.data);
    }
    setIsLoading(false);
  };

  if (IsLoading) return <Loading />;
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

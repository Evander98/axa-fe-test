import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts";
import CardList from "../../components/List/Card";
import Tab from "../../components/Tab";

export async function getServerSideProps() {
  return {
    props: {},
  };
}

const Detail = () => {
  const [selected, setSelected] = useState(0);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tabs] = useState(() => [
    {
      text: "Post",
      link: "/post",
    },
    {
      text: "Album",
      link: "/album",
    },
  ]);

  let router = useRouter();
  let { id, name } = router.query;

  useEffect(() => {
    fetchData();
  }, [selected]);

  const fetchData = async () => {
    setIsLoading(true);
    let { status, data } = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL +
        `/${tabs[selected].text.toLowerCase()}s?userId=${id}`
    );

    if (status === 200) {
      setItems(data);
    }
    setIsLoading(false);
  };

  return (
    <Layout title={`${tabs[selected].text} - ` + name}>
      <div className="page__container">
        <Tab tabs={tabs} selected={selected} setSelected={setSelected} />
        <div className="mt-4">
          <CardList data={items} meta={tabs[selected]} />
        </div>
      </div>
    </Layout>
  );
};

export default Detail;

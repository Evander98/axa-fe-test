import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";

const User = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isNext, setIsNext] = useState(true);

  useEffect(() => {
    fetch();
  }, [currentPage]);

  const fetch = async () => {
    setIsLoading(true);
    let tempItems = [];
    let perPage = 3;
    let { data, status } = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + "/users"
    );

    if (status === 200) {
      tempItems = data.map((item) => ({
        ...item,
        company: item.company.name,
        address: item.address.city,
      }));

      let splicedItems = tempItems.splice(
        perPage * currentPage - perPage,
        perPage
      );
      perPage * currentPage >= data.length ? setIsNext(false) : setIsNext(true);
      setItems(splicedItems);
    }

    setIsLoading(false);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="page__container">
      <p className="headline--large mb-11">User List</p>
      <div className="w-full">
        {items.length ? <Table items={items} action={true} /> : <p>No Data</p>}
        <Pagination
          paging={{currentPage, setCurrentPage}}
          isNext={isNext}
        />
      </div>
    </div>
  );
};

export default User;

User.getLayout = (page) => {
  return <Layout title="User - List">{page}</Layout>;
};

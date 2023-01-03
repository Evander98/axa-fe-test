import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Layout from "../../components/layouts";
import Loading from "../../components/Loading";
import Table from "../../components/Table";

const User = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [number, setNumber] = useState(0);

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

      setNumber(Math.ceil(tempItems.length / perPage));
      tempItems.splice(perPage * currentPage, tempItems.length);

      setItems(tempItems);
    }

    setIsLoading(false);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="page__container">
      <p className="headline--large mb-11">User List</p>
      <div className="w-full">
        {items.length ? <Table items={items} action={true} /> : <p>No Data</p>}
        <div className="flex items-center justify-between mt-4">
          <Button
            label="Prev Page"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          />
          <p>{currentPage}</p>
          <Button
            label="Next Page"
            onClick={() => setCurrentPage(currentPage + 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default User;

User.getLayout = (page) => {
  return <Layout title="User - List">{page}</Layout>;
};

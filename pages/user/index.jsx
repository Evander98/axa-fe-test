import axios from "axios";
import React from "react";
import Layout from "../../components/layouts";
import Table from "../../components/Table";

export async function getServerSideProps() {
  let items = [];
  let { data, status } = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL + "/users",
    {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    }
  );

  if (status === 200) {
    items = data.map((item) => ({
      ...item,
      company: item.company.name,
      address: item.address.city,
    }));
  }

  return {
    props: { items, title: "User List" },
  };
}

const User = ({ items, title }) => {
  return (
    <div className="page__container">
      <p className="headline--large mb-11">{title}</p>
      <div className="w-full">
        {items.length ? <Table items={items} action={true} /> : <p>No Data</p>}
      </div>
    </div>
  );
};

export default User;

User.getLayout = (page) => {
  return <Layout title="User - List">{page}</Layout>;
};

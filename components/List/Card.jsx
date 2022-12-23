import React from "react";
import Card from "../Card";

const CardList = ({ data, meta }) => {
  return (
    <div>
      <p className="headline--large mb-4">{meta.text}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row gap-4">
        {data?.map((item, index) => (
          <Card data={item} key={index} link={meta.link}/>
        ))}
      </div>
    </div>
  );
};

export default CardList;

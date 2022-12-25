import React from "react";
import Card from "../Card";

const CardList = ({ data, meta, isDelete, id, onDelete, onEdit }) => {
  return (
    <div>
      {meta.text && <p className="headline--large mb-4">{meta.text}</p>}
      {data.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row gap-4">
          {data?.map((item, index) => (
            <Card
              data={item}
              key={index}
              link={meta?.link}
              isDelete={isDelete}
              isEdit={item[id] === 501 ? true : false}
              onDelete={() => onDelete(index)}
              onEdit={() => onEdit(index)}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">No data</p>
      )}
    </div>
  );
};

export default CardList;

import React from "react";
import { useRouter } from "next/router";
import { BiEditAlt, BiTrash } from "react-icons/bi";

const Card = ({ data, link, isDelete, isEdit, onDelete, onEdit }) => {
  let router = useRouter();
  return (
    <div className="w-[350px] border-2 rounded-xl p-4 cursor-pointer flex justify-between">
      <div
        className="w-[90%]"
        onClick={() => router.push(`${link}/${data?.id}`)}
      >
        <p className="font-bold truncate mb-2">{data?.title}</p>
        <p className="four-line">{data?.body}</p>
        {data?.thumbnailUrl && (
          <img src={data.thumbnailUrl} alt="Image" className="m-auto" />
        )}
      </div>
      <div>
        {isDelete && (
          <BiTrash
            size={30}
            className="mb-4 hover:text-primary cursor-pointer"
            onClick={onDelete}
          />
        )}
        {isEdit ? (
          <BiEditAlt
            size={30}
            className="hover:text-primary cursor-pointer"
            onClick={onEdit}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Card;

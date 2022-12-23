import React from "react";
import { useRouter } from "next/router";

const Card = ({ data, link }) => {
  let router = useRouter()
  return (
    <div className="w-[350px] border-2 rounded-xl p-4 cursor-pointer" onClick={() => router.push(`${link}/${data?.id}`)}>
      <p className="font-bold truncate mb-2">{data?.title}</p>
      <p className="four-line">{data?.body}</p>
      {
        data?.thumbnailUrl && <img src={data.thumbnailUrl} alt="Image" className="m-auto"/>
      }
    </div>
  );
};

export default Card;

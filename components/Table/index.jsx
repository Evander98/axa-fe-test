import { useRouter } from "next/router";
import React from "react";
import { HiOutlineEye } from "react-icons/hi";

const Table = ({ headers, items, action }) => {
  let router = useRouter();
  return (
    <div className="overflow-x-auto">
      <table className="table-auto m-auto w-full">
        <thead>
          <tr className="text-zinc-500 font-normal">
            {headers?.length
              ? headers.map((item, index) => (
                  <th className="capitalize p-4 border-b-2" key={index}>
                    {item.text}
                  </th>
                ))
              : Object.keys(items[0]).map((item, index) => (
                  <th className="capitalize p-4 border-b-2" key={index}>
                    {item}
                  </th>
                ))}
            {action && <th className="p-4 border-b-2">Action</th>}
          </tr>
        </thead>
        <tbody>
          {items?.map((row, index) => (
            <tr key={index}>
              {Object.keys(row).map(
                (item, idx) =>
                  typeof row[item] !== "object" && (
                    <td key={idx} className="border-y-2 p-4 text-zinc-600">
                      {row[item]}
                    </td>
                  )
              )}
              {action && (
                <td className="border-b-2 p-4">
                  <HiOutlineEye
                    size={25}
                    className="text-primary cursor-pointer"
                    onClick={() =>
                      router.push(`/user/${row.id}?name=${row.name}`)
                    }
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

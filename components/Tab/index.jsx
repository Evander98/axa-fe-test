import React from "react";

const Tab = ({ tabs, selected, setSelected }) => {
  return (
    <div className="flex">
      {tabs.map((item, index) => (
        <div
          key={index}
          className={`${
            selected === index
              ? "border-b-4 border-secondary text-primary"
              : "text-slate-500"
          } font-bold cursor-pointer pb-1`}
          onClick={() => setSelected(index)}
        >
          <p className="mx-2">{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Tab;

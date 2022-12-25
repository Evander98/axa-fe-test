import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Layout from "../../components/layouts";
import CardList from "../../components/List/Card";
import { FiPlus } from "react-icons/fi";
import Loading from "../../components/Loading";

const Post = () => {
  const [data, setData] = useState([]);
  const [isGetLoading, setIsGetLoading] = useState(false);
  const [toggle, setToggle] = useState("");
  const [editIndex, setEditIndex] = useState(-1)
  const [titleInput, setTitleInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    setIsGetLoading(true);
    let { status, data } = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + "/posts"
    );
    if (status === 200) {
      setData(data);
    }
    setIsGetLoading(false);
  };

  const onAddPost = () => {
    setToggle("");
    setTitleInput("");
    setBodyInput("");
    setToggle("post");
  };

  const addPost = async () => {
    let body = {
      title: titleInput,
      body: bodyInput,
      userId: 501,
    };
    let res = await axios.post(
      process.env.NEXT_PUBLIC_BASE_URL + "/posts",
      body
    );
    if (res.status === 201) {
      setData([res.data, ...data]);
      setToggle("");
      setTitleInput("");
      setBodyInput("");
    }
  };

  const onEditPost = (index) => {
    setToggle("edit");
    setTitleInput(data[index].title);
    setBodyInput(data[index].body);
    setEditIndex(index)
  };

  const deletePost = (index) => {
    let tempData = [...data];
    tempData.splice(index, 1);
    setData(tempData);
  };

  const editPost = () => {
    let tempData = [...data];
    let body = {
      title: titleInput,
      body: bodyInput,
      userId: 501,
    };
    tempData.splice(editIndex, 1, body);
    setData(tempData);
    setTitleInput("");
    setBodyInput("");
    setToggle("");
  };

  const renderAddPost = () => (
    <div className="border-2 rounded-xl flex flex-col mb-4">
      <input
        type="text"
        className="m-2 p-2 border-2 rounded-xl outline-primary"
        value={titleInput}
        onChange={(e) => setTitleInput(e.target.value)}
      />
      <input
        type="text"
        className="m-2 p-2 border-2 rounded-xl outline-primary"
        value={bodyInput}
        onChange={(e) => setBodyInput(e.target.value)}
      />
      <div className="m-2">
        <Button
          label={toggle === "post" ? "Post" : "Edit"}
          onClick={toggle === "post" ? addPost : editPost}
          disabled={!titleInput || !bodyInput}
        />
      </div>
    </div>
  );

  if (isGetLoading) return <Loading />;

  return (
    <div className="page__container">
      <div className="flex justify-between items-center mb-4">
        <p className="headline--large">Posts</p>
        <Button
          label="Add Post"
          icon={<FiPlus size={30} />}
          onClick={onAddPost}
        />
      </div>
      {["post", "edit"].includes(toggle) ? renderAddPost() : null}
      <CardList
        data={data}
        meta={{ link: "/post" }}
        isDelete={true}
        id="userId"
        onDelete={deletePost}
        onEdit={onEditPost}
      />
    </div>
  );
};

export default Post;

Post.getLayout = (page) => {
  return <Layout title="Post - List">{page}</Layout>;
};

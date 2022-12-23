import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PostCard from "../../components/Card/Post";
import Layout from "../../components/layouts";
import { BiCommentDetail, BiTrash, BiEditAlt } from "react-icons/bi";

export async function getServerSideProps({ params }) {
  let { id } = params;
  let items = [];
  let { status, data } = await axios.get(
    process.env.NEXT_PUBLIC_BASE_URL + `/posts/${id}`
  );
  if (status === 200) {
    items = data;
  }
  return {
    props: { data: items },
  };
}

const Post = ({ data }) => {
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [isEdit, setIsEdit] = useState(-1);
  const [commentEdit, setCommentEdit] = useState("");

  let router = useRouter();
  let { id } = router.query;

  useEffect(() => {
    fetchComment();
  }, []);

  const fetchComment = async () => {
    let { status, data } = await axios.get(
      process.env.NEXT_PUBLIC_BASE_URL + `/posts/${id}/comments`
    );
    if (status === 200) {
      setComments(data);
    }
  };

  const onSubmitComment = async () => {
    if (commentInput) {
      let body = {
        name: "Admin",
        email: "admin@mail.com",
        body: commentInput,
        postId: id,
      };
      let { status, data } = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/comments",
        body
      );
      if (status === 201) {
        setComments([...comments, data]);
        setToggle(true);
        setCommentInput("");
      }
    }
  };

  const onDeleteComment = async (commentId, index) => {
    let { status } = await axios.delete(
      process.env.NEXT_PUBLIC_BASE_URL + `/comments/${commentId}`
    );
    if (status === 200) {
      let tempComments = [...comments];
      tempComments.splice(index, 1);
      setComments(tempComments);
    }
  };

  const onSubmitEditComment = async (item, index) => {
    let body = {
      ...item,
      body: commentEdit,
    };
    // let res = await axios.put(
    //   process.env.NEXT_PUBLIC_BASE_URL + `/comments/${item.id}`,
    //   body
    // );
    let tempComments = [...comments];
    tempComments.splice(index, 1, body);
    setComments(tempComments);
    setCommentEdit("");
    setIsEdit(-1);
  };

  const onEnterComment = (e) => {
    if (e.key === "Enter") {
      onSubmitComment();
    }
  };

  const renderComments = () =>
    comments?.map((item, index) => (
      <div
        className="flex items-start mt-2 border-2 rounded-lg p-4 text-neutral-500"
        key={index}
      >
        <div className="w-full">
          <p className="font-bold">{item.name}</p>
          <p>{item.email}</p>
          {isEdit === index ? (
            <div className="flex items-center mt-4 border-2 rounded-lg">
              <input
                type="text"
                placeholder={item.body}
                className="w-full p-4 outline-none border-r-2"
                value={commentEdit}
                onChange={(e) => setCommentEdit(e.target.value)}
              />
              <input
                type="button"
                value="Save"
                className="p-4 cursor-pointer"
                onClick={() => onSubmitEditComment({ ...item }, index)}
              />
            </div>
          ) : (
            <p>{item.body}</p>
          )}
        </div>
        <div>
          <BiTrash
            size={30}
            className="mb-4 hover:text-primary cursor-pointer"
            onClick={() => onDeleteComment(item.id, index)}
          />
          {item.id === 501 && (
            <BiEditAlt
              size={30}
              className="hover:text-primary cursor-pointer"
              onClick={() => setIsEdit(index)}
            />
          )}
        </div>
      </div>
    ));

  return (
    <div className="page__container">
      <PostCard data={data} />
      <div className="border-y-2 py-2 mt-4">
        <div
          className="flex items-center text-primary font-bold cursor-pointer"
          onClick={() => setToggle(!toggle)}
        >
          <BiCommentDetail size={30} className="mr-2" />
          <p>{comments.length} Komentar</p>
        </div>
        {toggle && renderComments()}
      </div>
      <div className="flex items-center mt-4 border-2 rounded-lg">
        <input
          type="text"
          value={commentInput}
          placeholder="Your comment goes here..."
          onChange={(e) => setCommentInput(e.target.value)}
          onKeyUp={onEnterComment}
          className="w-full p-4 outline-none border-r-2"
        />
        <input
          type="button"
          value="Send"
          className="p-4 cursor-pointer"
          onClick={onSubmitComment}
        />
      </div>
    </div>
  );
};

export default Post;

Post.getLayout = (page) => {
  return <Layout title="Post - Detail">{page}</Layout>;
};

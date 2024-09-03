import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async ({ queryKey }) => {
  const [_, page] = queryKey;
  try {
    const response = await axios(
      `https://jsonplaceholder.typicode.com/posts?_page=${page}&limit=10`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const Posts = () => {
  const [page, setPage] = useState(1);

  const handlePrevious = () => {
    setPage((pageValue) => pageValue - 1);
  };
  const handleNext = () => {
    setPage((pageValue) => pageValue + 1);
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["posts", page],
    queryFn: fetchPosts,
  });

  console.log({ data, isError, isLoading });

  return (
    <div>
      <h1>Posts</h1>
      {data?.map((post) => (
        <div>
          {" "}
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
      <button onClick={handlePrevious} disabled={page === 1}>
        Previous
      </button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Posts;

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

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }
  if (isError) {
    return <h1>Something went wrong!</h1>;
  }
  return (
    <div>
      <h1>Posts</h1>{" "}
      <button onClick={handlePrevious} disabled={page === 1}>
        Previous
      </button>
      <button onClick={handleNext}>Next</button>
      {data?.map((post) => (
        <div>
          {" "}
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;

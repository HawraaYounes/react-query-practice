import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const createPost = async (newPost) => {
  try {
    const response = await axios({
      url: "https://jsonplaceholder.typicode.com/posts",
      method: "POST",
      data: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

function CreatePost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const createPostMutation = useMutation(createPost);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createPostMutation.mutateAsync({ title, body });
      console.log({ result });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {createPostMutation.isLoading && <p>Loading...</p>}
        {createPostMutation.isSuccess && <p>Post Created Successfully!</p>}
        {createPostMutation.isError && <p>Something went wrong!</p>}
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="body">Body</label>
        <input
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <button type="submit">Add Post</button>
    </form>
  );
}

export default CreatePost;

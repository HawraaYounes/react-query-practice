import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUser = async ({ queryKey }) => {
  const [_, { userId }] = queryKey;
  const response = await axios(`https://reqres.in/api/users/${userId}`);
  return response.data;
};

const User = () => {
  const userId = 2;
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["users", { userId }],
    queryFn: fetchUser,
    staleTime: 5000,
  });
  console.log(isLoading, isError, error, data);

  if (isLoading) {
    return <h1> Loading ...</h1>;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div>
      <h2>
        {data.data?.first_name} {data?.data?.last_name}
      </h2>
      <p>{data?.data?.email}</p>
      <img src={data?.data?.avatar} alt="user-img" />
    </div>
  );
};

export default User;

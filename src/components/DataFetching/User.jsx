import { useQuery } from "@tanstack/react-query";
import React from "react";

const fetchUser = async (userId) => {
  const response = await fetch(`https://reqres.in/api/users/${userId}`);
  return response.json();
};

const User = () => {
  const userId = 5;
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => fetchUser(userId),
  });
  console.log("USER DATA", data);

  if (isLoading) {
    return <h1> Loading ...</h1>;
  }
  if (isError) {
    return <h1> Something wrong occured! {error.message}</h1>;
  }
  return <div >
  <h2>
    {data.data?.first_name} {data?.data?.last_name}
  </h2>
  <p>{data?.data?.email}</p>
  <img src={data?.data?.avatar} alt="user-img" />
</div>
};

export default User;

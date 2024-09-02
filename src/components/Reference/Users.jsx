import { useQuery } from "@tanstack/react-query";
import React from "react";

const fetchUsers = async () => {
  const response = await fetch("https://reqres.in/api/users?page=2");
  return response.json();
};

const Users = () => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  console.log("USERS DATA", data);

  if (isLoading) {
    return <h1> Loading ...</h1>;
  }
  if (isError) {
    return <h1> Something wrong occured! {error.message}</h1>;
  }
  return (
    <div>
      {data?.data?.map((user) => (
        <div >
          <h2>
            {user?.first_name} {user.last_name}
          </h2>
          <p>{user?.email}</p>
          <img src={user?.avatar} alt="user-img" />
        </div>
      ))}
    </div>
  );
};

export default Users;

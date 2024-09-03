import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUsers = async () => {
  try {
    const response = await axios(`https://reqres.in/api/users`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchUnknown = async () => {
  try {
    const response = await axios(`https://reqres.in/api/unknown`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const User = () => {
  const users = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  const unknownUser = useQuery({
    queryKey: ["unknown"],
    queryFn: fetchUnknown,
  });

  if (users.isLoading || unknownUser.isLoading) {
    return <h1>Loading ...</h1>;
  }
  if (users.error || unknownUser.error) {
    return <h1>Something went wrong!</h1>;
  }

  return (
    <div>
      <h1>Parallel Queries</h1>
      <h2>Users List</h2>
      {/* users  */}
      {users?.data?.data?.map((user) => {
        return (
          <div>
            <h3>
              {user.first_name} {user.last_name}
            </h3>
            <p>Email: {user.email}</p>
            <img src={user.avatar} />
          </div>
        );
      })}
      {/* unknown user  */}
      {users?.data?.data?.map((user) => {
        return (
          <div>
            <h3>
              {user.first_name} {user.last_name}
            </h3>
            <p>Unknown User Email: {user.email}</p>
            <img src={user.avatar} />
          </div>
        );
      })}
    </div>
  );
};

export default User;

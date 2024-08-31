import { useQuery } from "@tanstack/react-query";
import React from "react";

const fetchUsers = async () => {
  const response = await fetch("https://reqres.in/api/users?page=2");
  return response.json();
};

const Users = () => {
  const usersQuery = useQuery({
    queryKey: [""],
    queryFn: fetchUsers,
  });
  console.log("USERS QUERY",usersQuery);

  return <div>Users</div>;
};

export default Users;

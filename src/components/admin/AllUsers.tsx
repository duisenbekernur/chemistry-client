import {
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { IUser } from "../../types";
import UserCard from "./UserCard";
import Sceletons from "../Sceletons";

const AllUsers = () => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await axios.get("/admin/users");
      setIsLoading(false);
      setUsers(data);
    }

    fetchUsers();
  }, []);

  return (
    <>
      <SimpleGrid w="100%" columns={[1, 2, 3, 4, 5, 6]} spacing={5} mb={15}>
        {!isLoading ? (
          users?.map((user: IUser, index: number) => (
            <UserCard
              id={user.id}
              name={user.name}
              password={user.password}
              iat={user.iat}
              exp={user.exp}
              isAdmin={user.isAdmin}
              key={index}
            />
          ))
        ) : (
          <Sceletons />
        )}
      </SimpleGrid>
    </>
  );
};

export default AllUsers;

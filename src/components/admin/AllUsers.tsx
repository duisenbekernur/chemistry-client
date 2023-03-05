import { Input, SimpleGrid } from "@chakra-ui/react";
import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { IUser } from "../../types";
import UserCard from "./UserCard";
import Sceletons from "../Sceletons";

const AllUsers = () => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await axios.get("/admin/users");
      setIsLoading(false);
      setUsers(data.users);
    }

    fetchUsers();
  }, []);

  return (
    <>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Поиск по логин"
        marginBottom={3}
      />
      <SimpleGrid w="100%" columns={[1, 2, 3, 4, 5, 6]} spacing={5} mb={15}>
        {!isLoading ? (
          users
            ?.filter((elem: IUser) =>
              elem.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((user: IUser, index: number) => (
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

import React from "react";
import { inferQueryResponse } from "@pages/api/trpc/[trpc]";

type PersonResponse = inferQueryResponse<"get-person-by-id">;

const Person: React.FC<{ person: PersonResponse }> = props => {
  return <div>{`${props.person.id} - ${props.person.name}`}</div>;
};

export default Person;

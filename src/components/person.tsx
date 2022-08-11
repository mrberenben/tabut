import React from "react";
import { inferQueryResponse } from "@pages/api/trpc/[trpc]";

type PersonResponse = inferQueryResponse<"get-person-by-id">;

const Person: React.FC<{
  person: PersonResponse;
  vote: () => void;
}> = props => {
  return (
    <div onClick={() => props.vote()}>
      <img
        src={props.person.image}
        alt={props.person.name}
        width={128}
        height={128}
      />
      {`${props.person.id} - ${props.person.name}`}
    </div>
  );
};

export default Person;

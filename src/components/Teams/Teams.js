import React from "react";
import { useSelector } from "react-redux";
import { selectAuthenticatedUser } from "../../features/auth/authSelectors";
import { useGetTeamsQuery } from "../../features/teams/teamsApi";
import Error from "../ui/Error";
import Team from "./Team";

function Teams() {
  console.log("Teams")
  const { user } = useSelector(selectAuthenticatedUser) || {};
  const { email } = user || {};
  const {
    data: teams,
    isLoading,
    isError,
    error,
  } = useGetTeamsQuery(email) || {};

  let content = null;

  if (isLoading) {
    content = <div className="m-2 text-center">Loading...</div>;
  } else if (!isLoading && isError) {
    content = (
      <li className="m-2 text-center">
        <Error message={error?.data} />
      </li>
    );
  } else if (!isLoading && !isError && teams?.length === 0) {
    content = <div className="m-2 text-center">No teams found!</div>;
  } else if (!isLoading && !isError && teams?.length > 0) {
    content = teams
      .slice()
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((team) => <Team key={team.id} team={team} email={email}/>);
  }
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-10 mt-4 gap-6 overflow-auto">
        {content}
      </div>
    </>
  );
}

export default Teams;

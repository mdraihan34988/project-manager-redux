import React from "react";
import { useSelector } from "react-redux";
import ProjectBoard from "../components/Projects/ProjectBoard";
import Error from "../components/ui/Error";
import { selectAuthenticatedUser } from "../features/auth/authSelectors";
import { useGetTeamsQuery } from "../features/teams/teamsApi";

function ProductPanel() {
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
  } else if (!isLoading && !isError && teams?.length >= 0) {
    content = <ProjectBoard teams={teams} user={user} />;
  }

  return (
    <>
      <div className="px-10 mt-6">
        <h1 className="text-2xl font-bold">Project Board</h1>
      </div>
      {content}
    </>
  );
}

export default ProductPanel;

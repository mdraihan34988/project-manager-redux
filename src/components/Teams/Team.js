import moment from "moment/moment";
import React, { useState } from "react";
import { useGetUsersQuery } from "../../features/users/usersApi";
import getColor from "../../utils/getColor";
import Modal from "../Modal/Modal";
import getAvatar from "gravatar-url";
import AddTeamMember from "./AddTeamMember";
import TeamDetails from "./TeamDetails";

function Team({ team = {}, email= "" }) {

  const { TeamName, TeamDescription, TeamColor, timestamp, Users, CreatedBy } =
    team || {};
  const { data: usersList, isLoading, isError } = useGetUsersQuery() || {};
  const specificUser = Users.find((user) => user.email === CreatedBy);
  let unAssignedUsers = [];

  if (!isLoading && !isError && usersList?.length > 0) {
    unAssignedUsers = usersList.filter(
      (user) => !Users.find((u) => u.id === user.id)
    );
  }

  let color = null;

  if (TeamColor) {
    color = getColor(TeamColor);
  }

  const [opened, setOpened] = useState(false);
  const [openedDetails, setOpenedDetails] = useState(false);

  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  const controlDetailsModal = () => {
    setOpenedDetails((prevState) => !prevState);
  };

  return (
    <>
      <div
        className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
        draggable="true"
      >
        <button className="m-4 absolute top-0 right-5 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onClick={controlDetailsModal}
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <button className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex">
          <svg className="h-8 w-8 text-green-500"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" onClick={controlModal}>  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="12" y1="5" x2="12" y2="19" />  <line x1="5" y1="12" x2="19" y2="12" /></svg>
        </button>
        <span
          className={`flex items-center h-6 px-3 text-xs font-semibold rounded-full ${
            color && color
          }`}
        >
          {TeamName}
        </span>
        <h4 className="mt-3 text-sm font-medium">{TeamDescription}</h4>
        <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-gray-300 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1 leading-none">
              {moment(timestamp).format("MMM D")}
            </span>
          </div>
          <span className="ml-auto">{specificUser?.name}</span>
          <img
            className="w-6 h-6 ml-2 rounded-full"
            src={getAvatar(CreatedBy, {
              size: 80,
            })}
            alt="Profile"
          />
        </div>
      </div>
      {!isLoading && !isError && (
        <Modal open={opened} control={controlModal}>
          <AddTeamMember
            control={controlModal}
            users={unAssignedUsers}
            team={team}
            email={email}
          />
        </Modal>
      )}
      {!isLoading && !isError && (
        <Modal open={openedDetails} control={controlDetailsModal}>
          <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <TeamDetails
              control={controlDetailsModal}
              team={team}
            />
          </div>
        </Modal>
      )}
    </>
  );
}

export default React.memo(Team);

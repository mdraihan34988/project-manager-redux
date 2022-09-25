import moment from "moment";
import React, { useState } from "react";
import getAvatar from "gravatar-url";
import getColor from "../../utils/getColor";
import { useSelector } from "react-redux";
import { ItemTypes } from "../../utils/ItemTypes";
import { useDrag } from "react-dnd";
import Modal from "../Modal/Modal";
import DeleteProject from "./DeleteProject";
import ProjectDetails from "./ProjectDetails";
import { selectFilter } from "../../features/filter/filterSelectors";

function ProjectCard({ project = {}, team = {}, user = {}, teams = [] }) {
  const { text } = useSelector(selectFilter) || {};
  const { TeamColor, TeamName, Users } = team || {};
  const { id, ProjectTitle, timestamp, CreatedBy, ProjectStatus } =
    project || {};
  const { email } = user || {};
  const [opened, setOpened] = useState(false);
  const [openedDetails, setOpenedDetails] = useState(false);
  const specificUser = Users.find((user) => user.email === CreatedBy);

  const controlDetailsModal = () => {
    setOpenedDetails((prevState) => !prevState);
  };

  const controlDeleteModal = () => {
    setOpened((prevState) => !prevState);
  };

  let color = null;

  if (TeamColor) {
    color = getColor(TeamColor);
  }

  const checkSearchTitle = () => {
    let title = ProjectTitle.toLowerCase();
    let filterText = text.toLowerCase();

    return title.includes(filterText) && filterText?.length > 0;
  };

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes[ProjectStatus?.toUpperCase()],
      item: project,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [project]
  );

  return (
    <>
      <div
        className={`relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 ${
          checkSearchTitle() && "blink-message"
        }`}
        // blink-message
        draggable="true"
        id={id}
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          fontSize: 25,
          fontWeight: "bold",
          cursor: "move",
        }}
      >
        <button
          className={`m-2 absolute top-0 ${(ProjectStatus === "Backlog" && email === CreatedBy) ? "right-5" : "right-0"} flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex`}
          onClick={controlDetailsModal}
        >
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
            <path
              fillRule="evenodd"
              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        {ProjectStatus === "Backlog" && email === CreatedBy && (
          <button className="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex ">
            <svg className="w-4 h-4 cursor-pointer text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="3"  strokeLinecap="round"  strokeLinejoin="round" onClick={controlDeleteModal}>  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
          </button>
        )}
        <span
          className={`flex items-center h-6 px-3 text-xs font-semibold ${
            color && color
          } rounded-full`}
        >
          {TeamName}
        </span>
        <h4 className="mt-3 text-sm font-medium">{ProjectTitle}</h4>
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
      <Modal open={opened} control={controlDeleteModal}>
        <DeleteProject
          control={controlDeleteModal}
          project={project}
          teams={teams}
        />
      </Modal>
      <Modal open={openedDetails} control={controlDetailsModal}>
        <ProjectDetails
          control={controlDetailsModal}
          project={project}
          team={team}
        />
      </Modal>
    </>
  );
}

export default React.memo(ProjectCard);

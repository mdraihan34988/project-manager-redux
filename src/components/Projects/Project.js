import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../../utils/ItemTypes";
import Error from "../ui/Error";
import ProjectCard from "./ProjectCard";

function Project({
  control,
  teams = [],
  user = {},
  isLoading = true,
  isError = false,
  error = "",
  byTypeProjects = [],
  updateProject,
  type
}) {
  
  let content = null;

  if (isLoading) {
    content = <div className="m-2 text-center">Loading...</div>;
  } else if (!isLoading && isError) {
    content = (
      <li className="m-2 text-center">
        <Error message={error?.data} />
      </li>
    );
  } else if (!isLoading && !isError && byTypeProjects?.length === 0) {
    content = <div className="m-2 text-center">No {type} Projects found!</div>;
  } else if (!isLoading && !isError && byTypeProjects?.length > 0) {
    content = byTypeProjects
      .slice()
      .sort((a, b) => b.timestamp - a.timestamp)
      .map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          team={teams.find((t) => t.id === project.TeamId)}
          user={user}
          teams={teams}
        />
      ));
  }

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept:  Object.values(ItemTypes).filter(item => {return item !== type}),
      drop: (item) =>
        updateProject({
          id: item.id,
          data: {
            ...item,
            ProjectStatus: type,
          },
          teams,
        }),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );

  return (
    <>
      <div
        className={`flex flex-col flex-shrink-0 w-72 ${
          isOver && "border-solid border-4 border-indigo-600 rounded-xl"
        }`}
        ref={drop}
      >
        <div className="flex items-center flex-shrink-0 h-10 px-2">
          <span className="block text-sm font-semibold">{type}</span>
          <span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
            {byTypeProjects?.length}
          </span>
          { type === ItemTypes.BACKLOG && <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              onClick={control}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </button>}
        </div>
        <div className="flex flex-col p-2 overflow-auto">{content}</div>
      </div>
    </>
  );
}

export default Project;

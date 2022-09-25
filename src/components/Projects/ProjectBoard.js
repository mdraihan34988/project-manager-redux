import React, { useState } from "react";
import Modal from "../Modal/Modal";
import Error from "../ui/Error";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  useGetProjectsQuery,
  useUpdateProjectMutation,
} from "../../features/projects/projectsApi";
import AddProject from "./AddProject";
import { ItemTypes } from "../../utils/ItemTypes";
import Project from "./Project";

function ProjectBoard({ teams = [], user = {} }) {
  const {
    data: Projects,
    isLoading,
    isError,
    error,
  } = useGetProjectsQuery({ teams }) || {};
  const [updateProject] = useUpdateProjectMutation();

  const [opened, setOpened] = useState(false);

  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  let content = null;

  if (isLoading) {
    content = <div className="m-2 text-center">Loading...</div>;
  } else if (!isLoading && isError) {
    content = (
      <li className="m-2 text-center">
        <Error message={error?.data} />
      </li>
    );
  } else if (!isLoading && !isError && Projects?.length >= 0) {
    content = (
      <>
        <DndProvider backend={HTML5Backend}>
          {
            Object.values(ItemTypes).map((type) => (
              <Project
                control={controlModal}
                teams={teams}
                user={user}
                isLoading={isLoading}
                isError={isError}
                error={error}
                byTypeProjects={ Projects.filter(
                  (project) => project.ProjectStatus === type
                )}
                updateProject={updateProject}
                type={type}
                key={type}
              />
            ))}
        </DndProvider>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
        {content}
        <div className="flex-shrink-0 w-6"></div>
      </div>
      {!isLoading && !isError && (
        <Modal 
          open={opened}
          control={controlModal}
        >
          <AddProject
            control={controlModal}
            teams={teams}
            user={user}
          />
        </Modal>
      )}
    </>
  );
}

export default ProjectBoard;

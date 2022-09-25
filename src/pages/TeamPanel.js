import React, { useState } from "react";
import Teams from "../components/Teams/Teams";
import Modal from "../components/Modal/Modal";
import AddTeam from "../components/Teams/AddTeam";

function TeamPanel() {
  const [opened, setOpened] = useState(false);
  console.log("team panel")
  const controlModal = () => {
    setOpened((prevState) => !prevState);
  };

  return (
    <>
      <div className="px-10 mt-6 flex justify-between">
        <h1 className="text-2xl font-bold">Teams</h1>
        <button className="flex items-center justify-center w-6 h-6 ml-auto text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={controlModal}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
      <Teams />
      <Modal open={opened} control={controlModal}>
        <AddTeam
          control={controlModal}
        />
      </Modal>
    </>
  );
}

export default TeamPanel;

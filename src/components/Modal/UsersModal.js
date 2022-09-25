import React, { useState } from "react";
import { useUpdateTeamMutation } from "../../features/teams/teamsApi";

function UsersModal({ open, control, users, team }) {
  const [updateTeam] = useUpdateTeamMutation();
  const [newAssignedMembers, setNewAssignedMembers] = useState([]);

  const handleChange = (e) => {
    let checkedId = parseInt(e.target.id);
    let checkedUser = users.find((user) => checkedId === user.id);

    if (e.target.checked) {
      if (!newAssignedMembers.find((user) => checkedId === user.id)) {
        setNewAssignedMembers((prev) => {
          return [...prev, checkedUser];
        });
      }
    } else if (!e.target.checked) {
      if (newAssignedMembers.find((user) => checkedId === user.id)) {
        setNewAssignedMembers((prev) => {
          return prev.filter((user) => user.id !== checkedId);
        });
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newUser = [...team.Users, ...newAssignedMembers];
    let newUserList = "";
    newUserList += newUser.map((u) => `${u.email}`).join("-");
    updateTeam({
      id: team.id,
      data: {
        ...team,
        UserList: newUserList,
        Users: newUser,
      },
    });
    control();
  };

  let content = null;

  if (users?.length > 0) {
    content = users.map((user) => (
      <div key={user?.id} className="flex items-center justify-center p-2">
        <input
          id={user?.id}
          type="checkbox"
          value=""
          onChange={handleChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor={user?.id}
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {user?.name} ({user?.email})
        </label>
      </div>
    ));
  } else {
    content = <span>No Members Left to Assign!</span>;
  }

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-2 text-center text-xl font-extrabold text-gray-900">
            Add Members to{" "}
            <span style={{ color: "red" }}>{team?.TeamName}</span> team
          </h2>
          <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
            <div
              className="rounded-md shadow-sm -space-y-px overflow-auto"
              style={{ height: 200 }}
            >
              {content}
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Add Members
              </button>
            </div>

            {/* <Error message="There was an error" /> */}
          </form>
        </div>
      </>
    )
  );
}

export default UsersModal;

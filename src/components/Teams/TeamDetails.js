import moment from "moment";
import React from "react";
import getColor from "../../utils/getColor";

function TeamDetails({ control, team = {} }) {
  const {
    id,
    TeamName,
    TeamDescription,
    TeamColor,
    timestamp,
    Users,
    CreatedBy,
  } = team || {};

  let color = null;

  if (TeamColor) {
    color = getColor(TeamColor);
  }

  let members = null;

  if (Users?.length === 0) {
    members = <span>No Members</span>;
  }
  if (Users?.length > 0) {
    members = Users.map((user, index) => (
      <span className="m-1 font-bold" key={user.id}>
        {index + 1}. {user.name} ({user.email})
      </span>
    ));
  }

  return (
    <>
      <div className="rounded-md shadow-sm -space-y-px">
        <div className="m-1">
          <span
            className={`flex items-center h-6 px-3 text-lg font-semibold rounded-full ${
              color && color
            }`}
          >
            {TeamName} ({id})
          </span>
        </div>
        <div className="m-2">
          <label>Description : {TeamDescription}</label>
        </div>
        <div className="m-2">
          <label>
            Created By : {CreatedBy}{" "}
            <span className="font-bold">({moment(timestamp).fromNow()})</span>
          </label>
        </div>
        <div className="m-2">
          <label>Members : {members}</label>
        </div>
      </div>
      <button
        type="button"
        className="group relative w-full flex justify-center my-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
        onClick={control}
      >
        Close
      </button>
    </>
  );
}

export default TeamDetails;

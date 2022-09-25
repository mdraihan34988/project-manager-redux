import moment from "moment";
import React from "react";
import TeamDetails from "../Teams/TeamDetails";

function ProjectDetails({ project = {}, team = {}, control }) {
  const { id, ProjectTitle, timestamp, CreatedBy, ProjectStatus } =
    project || {};

  return (
    <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
      <h2 className="mt-2 text-center text-lg font-extrabold text-gray-900">
        Project {id} ({ProjectStatus})
      </h2>
      <div className="rounded-md shadow-sm -space-y-px">
        <div className="m-1">
          <label>Title : {ProjectTitle}</label>
        </div>
        <div className="m-1">
          <label>
            Created By : {CreatedBy} ({moment(timestamp).fromNow()})
          </label>
        </div>
      </div>
      <TeamDetails control={control} team={team} />
    </div>
  );
}

export default ProjectDetails;

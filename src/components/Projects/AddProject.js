import { useState } from "react";
import { useAddProjectMutation } from "../../features/projects/projectsApi";
import { ItemTypes } from "../../utils/ItemTypes";
import CancelButton from "../ui/CancelButton";

function AddProject({ control, user = {}, teams = [] }) {
  const [addProject] = useAddProjectMutation();
  const [title, setTitle] = useState("");
  const [team, setTeam] = useState("");

  const resetForm = () => {
    setTitle("");
    setTeam("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      ProjectTitle: title,
      TeamId: parseInt(team),
      timestamp: new Date().getTime(),
      CreatedBy: user.email,
      ProjectStatus: ItemTypes.BACKLOG,
    };
    addProject({ data, teams });

    resetForm();
    control();
  };

  return (
    <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
      <h2 className="mt-2 text-center text-xl font-extrabold text-gray-900">
        Add Project
      </h2>
      <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="title" className="sr-only">
              Project Title
            </label>
            <textarea
              id="title"
              name="title"
              type="text"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
              placeholder="Project Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <select
              id="color"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
              required
            >
              <option value="">
                Choose a team
              </option>
              {teams?.map((team) => (
                <option
                  key={team.id}
                  value={team.id}
                >{`${team.id} -- ${team.TeamName}`}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
          >
            Add Project
          </button>
          <CancelButton control={control} />
        </div>

        {/* <Error message="There was an error" /> */}
      </form>
    </div>
  );
}

export default AddProject;

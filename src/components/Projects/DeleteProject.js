import { useState } from "react";
import { useDeleteProjectMutation } from "../../features/projects/projectsApi";
import CancelButton from "../ui/CancelButton";
import ClipBoardCopy from "../ui/ClipBoardCopy";

function DeleteProject({
    control,
    project = {},
    teams = []
}) {

  const { id, ProjectTitle, ProjectStatus } = project || {};
  const [deleteProject] = useDeleteProjectMutation();

  const [title, setTitle] = useState("");

  const resetForm = () => {
    setTitle("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteProject({ id, status: ProjectStatus, teams });
    resetForm();
    control();
  };

  return (
    <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
        <h2 className="mt-2 text-center text-xl font-extrabold text-gray-900">
        Delete Project
        </h2>
        <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
        <input type="hidden" name="remember" value="true" />
        <div className="rounded-md shadow-sm -space-y-px">
            <div>
            <label htmlFor="title" className="">
                Please type <b>{ProjectTitle}</b> <ClipBoardCopy copyText={ProjectTitle} />  to confirm.
            </label>
            <input
                id="title"
                name="title"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                placeholder="Type Project Title to Confirm Delete"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            </div>
        </div>

        <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 disabled:opacity-25"
              disabled={!(ProjectTitle === title)}
            >
              Delete Project
            </button>
            <CancelButton control={control}/>
        </div>

        {/* <Error message="There was an error" /> */}
        </form>
    </div>
  )
}

export default DeleteProject
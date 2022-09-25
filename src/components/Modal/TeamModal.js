import { useState } from "react";
import { useSelector } from "react-redux";
import { useAddTeamMutation } from "../../features/teams/teamsApi";

export default function Modal({ open, control }) {
  const { user } = useSelector(selectAuthenticatedUser) || {};
  const [addTeam] = useAddTeamMutation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");

  const resetForm = () => {
    setName("");
    setDescription("");
    setColor("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTeam({
      data: {
        TeamName: name,
        TeamDescription: description,
        TeamColor: color,
        Users: [user],
        UserList: `${user.email}`,
        timestamp: new Date().getTime(),
        CreatedBy: user.email,
      },
    });
    resetForm();
    control();
  };

  return (
    open && (
      <>
        <div
          onClick={control}
          className="fixed w-full h-full inset-0 z-10 bg-black/50 cursor-pointer"
        ></div>
        <div className="rounded w-[400px] lg:w-[600px] space-y-8 bg-white p-10 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
          <h2 className="mt-2 text-center text-xl font-extrabold text-gray-900">
            Add Team
          </h2>
          <form className="mt-2 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Team Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Team name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="description" className="sr-only">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  type="description"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div>
                {/* <label
                  for="color"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                >
                  Select a color
                </label> */}
                <select
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                  required
                >
                  <option selected value="">
                    Choose a team color
                  </option>
                  <option value="green">Green</option>
                  <option value="red">Red</option>
                  <option value="blue">Blue</option>
                  <option value="yellow">Yellow</option>
                  <option value="violet">Violet</option>
                  <option value="purple">Purple</option>
                  <option value="fuchsia">Fuchsia</option>
                  <option value="pink">Pink</option>
                  <option value="rose">Rose</option>
                  <option value="indigo">Indigo</option>
                  <option value="sky">Sky</option>
                  <option value="cyan">Cyan</option>
                  <option value="teal">Teal</option>
                  <option value="lime">Lime</option>
                  <option value="emerald">Emerald</option>
                </select>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                Add Team
              </button>
            </div>

            {/* <Error message="There was an error" /> */}
          </form>
        </div>
      </>
    )
  );
}

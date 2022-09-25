import { apiSlice } from "../api/apiSlice";

export const projectsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: ({ teams }) => {
        let queryString = "";

        if (teams?.length > 0) {
          queryString += teams.map((team) => `TeamId=${team.id}`).join("&");
          queryString += `&_sort=timestamp&_order=desc`;
        } else {
          queryString += "_limit=0";
        }

        return {
          url: `/projects?${queryString}`,
          method: "Get",
        };
      },
    }),
    addProject: builder.mutation({
      query: ({ data }) => ({
        url: "/projects",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const teams = arg?.teams;

        try {
          const projectResponse = await queryFulfilled;

          if (projectResponse?.data?.id) {
            // update conversation cache pessimistically start
            dispatch(
              apiSlice.util.updateQueryData(
                "getProjects",
                { teams },
                (draft) => {
                  ;
                  draft.push(projectResponse?.data);
                }
              )
            );
          }
        } catch (err) {}
      },
    }),
    updateProject: builder.mutation({
      query: ({ id, data, teams }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const teams = arg?.teams;

        const pathResult = dispatch(
          apiSlice.util.updateQueryData("getProjects", { teams }, (draft) => {
            const draftproject = draft.find((t) => parseInt(t.id) === arg.id);
            if (draftproject.id) {
              draftproject.ProjectStatus = arg?.data?.ProjectStatus;
            }
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          pathResult.undo();
        }
      },
    }),
    deleteProject: builder.mutation({
      query: ({ id, teams }) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        const teams = arg?.teams;
        const pathResult = dispatch(
          apiSlice.util.updateQueryData("getProjects", { teams }, (draft) => {
            return draft.filter(
              (project) => !(arg?.id === parseInt(project.id))
            );
          })
        );
        try {
          await queryFulfilled;
        } catch (err) {
          pathResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;

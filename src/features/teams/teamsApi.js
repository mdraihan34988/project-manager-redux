import { apiSlice } from "../api/apiSlice";

export const teamsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTeams: builder.query({  
            query: (email) =>
                `/teams?UserList_like=${email}&_sort=timestamp&_order=desc`,
        }),
        addTeam: builder.mutation({  
            query: ({ data }) => ({
                url: "/teams",
                method: "POST",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                
                try {
                    const teamResponse = await queryFulfilled;
            
                    if (teamResponse?.data?.id) {
                        
                        // update conversation cache pessimistically start
                        dispatch(
                            apiSlice.util.updateQueryData(
                                "getTeams",
                                arg.data.CreatedBy,
                                (draft) => {
                                    draft.push(teamResponse?.data)
                                }
                            )
                        );
                    }
                } catch(err) {
                    
                }
            },
        }),
        updateTeam: builder.mutation({  
            query: ({ id, data, email }) => ({
                url: `/teams/${id}`,
                method: "PUT",
                body: data,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                
                const pathResult =  dispatch(
                    apiSlice.util.updateQueryData(
                        "getTeams",
                        arg.email,
                        (draft) => {
                            const draftTeam = draft.find(t => parseInt(t.id) === arg.id);
                            if(draftTeam.id) {
                                draftTeam.Users = arg.data.Users;
                                draftTeam.UserList = arg.data.UserList;

                            }
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch(err) {
                    pathResult.undo();
                }
            },
        }),

    }),
});

export const { useGetTeamsQuery, useAddTeamMutation, useUpdateTeamMutation } = teamsApi;

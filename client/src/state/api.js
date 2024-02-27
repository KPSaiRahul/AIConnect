/* Redux tool kit is a way to abstract out all the complex boilerplate into smaller bits, Redux tool kit query allows us to make simple api calls
    and store it in our redux store
*/

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}),
    reducerPath: "main",
    tagTypes: [],
    endpoints: (build) => ({
        postAiText : build.mutation({
            query: (payload) => ({
                url: "openai/text",
                method: "POST",
                body: payload
            })
        }),
        postAiCode: build.mutation({
            query: (payload) => ({
              url: "openai/code",
              method: "POST",
              body: payload,
            }),
          }),
        postAiAssist: build.mutation({
            query: (payload) => ({
              url: "openai/assist",
              method: "POST",
              body: payload,
            }),
          }),
    }),
    
});

export const {
    usePostAiTextMutation, usePostAiCodeMutation, usePostAiAssistMutation,
} = api;
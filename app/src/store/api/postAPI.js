import { api } from "./base";

const postAPI = api.injectEndpoints({
    endpoints: (build) => ({
        addPost: build.mutation({
            query: (postData) => ({
                url: '/posts/',
                method: 'POST',
                body: postData,
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }),
            invalidatesTags: ["Posts"]
        }),
        getCategories: build.query({
            query: () => '/categories/',
        }),
        getPosts: build.query({
            query: () => '/posts/',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Posts', id })),
                        { type: 'Posts' },
                    ]
                    : [{ type: 'Posts' }]
        }),
        getPost: build.query({
            query: (postId) => `/posts/${postId}`
        }),
        getPostComments: build.query({
            query: (postId) => `/posts/comments/${postId}`,
            providesTags: (result, _, id) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Comments', id })),
                        { type: 'Comments', id: id }
                    ]
                    : [{ type: 'Comments', id: id }]
        }),
        addComment: build.mutation({
            query: (commentData) => ({
                url: '/posts/comments/',
                method: 'POST',
                body: commentData,
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }),
            invalidatesTags: (result) => [{ type: 'Comments', id: result.post }]
        })
    })
});

export const { useAddPostMutation, useGetCategoriesQuery, useGetPostsQuery, useGetPostQuery, useGetPostCommentsQuery, useAddCommentMutation } = postAPI;
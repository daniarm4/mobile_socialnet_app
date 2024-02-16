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
            query: (page) => `/posts/?page=${page}`,
            providesTags: (result) => 
                result
                    ? [
                        ...result.results.map(({ id }) => ({ type: 'Posts', id })),
                        { type: 'Posts' },
                    ]
                    : [{ type: 'Posts' }],
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName
            },
            merge: (currentCacheData, responseData) => {
                currentCacheData.results.push(...responseData.results);
            },
            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg
            }
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
        }),
        likePost: build.mutation({
            query: (likeData) => ({
                url: '/posts/like/',
                method: 'POST',
                body: likeData
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const postID = arg.post_id;
                const patchResult = dispatch(
                    api.util.updateQueryData(
                        'getPosts', undefined, (draft) => {
                            draft.results = draft.results.map(post => {
                                if (post.id === postID) {
                                    if (post.is_liked) {
                                        post.is_liked = false;
                                        post.total_likes -= 1;
                                    }
                                    else {
                                        post.is_liked = true;
                                        post.total_likes += 1;
                                    }
                                }
                                return post; 
                            })
                            return draft;
                        }
                    )
                )
                try {
                    await queryFulfilled;
                }
                catch {
                    patchResult.undo();
                }
            }
        })
    })
});

export const { 
    useAddPostMutation, 
    useGetCategoriesQuery, 
    useGetPostsQuery, 
    useGetPostQuery, 
    useGetPostCommentsQuery, 
    useAddCommentMutation,
    useLikePostMutation
} = postAPI;

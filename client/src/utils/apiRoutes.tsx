 const host:string=import.meta.env.VITE_HOST_URL

 export const registerRoute=`${host}/auth/register`
 export const loginRoute=`${host}/auth/login`

 export const getAllPosts=`${host}/journey`

 export const getUserInfo=`${host}/user`

 export const getUserVotedPosts=`${host}/user/votes`
 
 export const getMapPosts=`${host}/journey/map`

 export const getPostsByLocation=`${host}/journey/get-posts?location=`

 export const newPost=`${host}/journey/create`
 export const deletePost=`${host}/journey/delete-post/`

 export const upVote=`${host}/journey/up-vote/`
 export const downVote=`${host}/journey/down-vote/`

 export const updateProfile=`${host}/user/update-profile`
 const host:string='http://localhost:5000/api'

 export const registerRoute=`${host}/auth/register`
 export const loginRoute=`${host}/auth/login`

 export const getAllPosts=`${host}/journey`

 export const getUserInfo=`${host}/user`

 export const getMapPosts=`${host}/journey/map`

 export const newPost=`${host}/journey/create`

 export const upVote=`${host}/journey/up-vote/`
 export const downVote=`${host}/journey/down-vote/`
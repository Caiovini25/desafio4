import { SET_POSTS, CREATING_POST, POST_CREATED } from './actionTypes'
import { setMessage } from './message'
import axios from 'axios'

export const addPost = post => {
    return (dispatch, getState) => {
        dispatch(creatingPost())

        axios({
            url: 'uploadImage',
            baseURL: 'https://us-central1-facsgram.cloudfunctions.net',
            method: 'post',
            data: {
                image: post.image
            }
        })
            .catch(err => {
                dispatch(setMessage({
                    title: 'Falha',
                    text: 'Falha não esperada ocorreu!'
                }))
            })
            .then(resp => {
                axios.post(`/posts.json?auth=${getState().user.token}`, { ...post })
                    .catch(err => {
                        dispatch(setMessage({
                            title: 'Erro',
                            text: err
                        }))
                    })
                    .then(res => {
                        dispatch(fetchPosts())
                        dispatch(postCreated())
                    })
            })
    }
}

export const addComment = payload => {
    return (dispatch, getState) => {
        axios.get(`/posts/${payload.postId}.json`)
            .catch(err => {
                dispatch(setMessage({
                    title: 'Falha',
                    text: 'Falha não esperada ocorreu!'
                }))
            })
            .then(res => {
                const comments = res.data.comments || []
                comments.push(payload.comment)

                axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`, { comments })
                    .catch(err => {
                        dispatch(setMessage({
                            title: 'Falha',
                            text: 'Falha não esperada ocorreu!'
                        }))
                    })
                    .then(res => {
                        dispatch(fetchPosts())
                    })
            })
    }
}

export const setPosts = posts => {
    return {
        type: SET_POSTS,
        payload: posts
    }
}

export const fetchPosts = () => {
    return dispatch => {
        axios.get('/posts.json')
            .catch(err => {
                dispatch(setMessage({
                    title: 'Falha',
                    text: 'Falha inesperada ocorreu!'
                }))
            })
            .then(res => {
                const rawPosts = res.data
                let posts = []

                for(let key in rawPosts) {
                    posts = [...posts, { ...rawPosts[key], id: key }]
                }

                dispatch(setPosts(posts.reverse()))
            })
    }
}

export const creatingPost = () => {
    return {
        type: CREATING_POST
    }
}

export const postCreated = () => {
    return {
        type: POST_CREATED
    }
}
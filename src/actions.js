import fetch from 'cross-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

function receivePosts(subreddit, json) {
 
  return {
    type: RECEIVE_POSTS,
    subreddit,
    //posts: json.data.children.map(child => child.data),
    posts: json.users,
    receivedAt: Date.now()
  }
}

/* //local
function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
   // return fetch(`https://www.reddit.com/r/${subreddit}.json`)
   //return fetch(`https://jsonplaceholder.typicode.com/users/`)
   return fetch(`http://localhost:3000/following`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}
*/

// live
function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestPosts(subreddit))
   // return fetch(`https://www.reddit.com/r/${subreddit}.json`)
   //return fetch(`https://jsonplaceholder.typicode.com/users/`)
     return fetch(`https://api.github.com/users/octocat/repos`)
  //  return fetch(`https://api.twitter.com/1.1/friends/list.json?screen_name=twitterapi`,{
  //   headers: {
  //     'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANld9wAAAAAANoe8Qi3tqJqAf5Uy6u5CUIHlmcg%3D3A19F5UkpTYXY6NF1xuZ0iFKSIxUpC0kKG6sbd91AEf0smu8fb' 
  //   }
  //  }
  //  )
      .then(response => response.json())
      .then(json => dispatch(receivePosts(subreddit, json)))
  }
}

function shouldFetchPosts(state, subreddit) {
  
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}
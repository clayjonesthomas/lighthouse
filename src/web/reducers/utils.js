export function getUniquePosts(newPosts, oldPosts){
  let uniquePosts = []
  newPosts.forEach(newPost => {
    let addToPosts = true

    oldPosts.forEach(oldPost => {
      if(newPost.key === oldPost.key) {
        addToPosts = false
      }
    })

    if(addToPosts)
      uniquePosts.push(newPost)
  })
  return uniquePosts
}
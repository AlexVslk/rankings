const contentfulFetch = async (query) => {
  const url = 'https://graphql.contentful.com/content/v1/spaces/' + '7nazxz33277c'

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + '-go2NZ40hWgEl0Bj2ub3J3obyxT6gZOFegkV028UK9s',
    },
    body: JSON.stringify({ query }),
  })
  return response
}

export default contentfulFetch

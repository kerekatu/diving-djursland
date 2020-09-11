async function fetchAPI(url) {
  const response = await fetch(`http://localhost:1337/${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const result = await response.json()

  if (result.errors) {
    console.error(result.errors)
    throw new Error('Failed to fetch from API')
  }

  // https://dev.to/ryyppy/reason-records-nextjs-undefined-and-getstaticprops-5d46
  const json = JSON.parse(JSON.stringify(result))

  return json
}

export async function getNewestTrips() {
  const data = await fetchAPI('trips' + '?_sort=date:ASC')

  return data
}

export async function getAllData(collection, sort = '?_sort=date:DESC') {
  const data = await fetchAPI(collection + sort)

  return data
}

export async function getPopularData(collection) {
  const data = await fetchAPI(collection)

  return data
}

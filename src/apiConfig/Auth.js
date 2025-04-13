export const baseUrl='https://jsonplaceholder.typicode.com'

export const getUserListUrl=(page,limit)=>`${baseUrl}/posts?_page=${page}&limit=${limit}`
export const getUserdetailList=(id)=>`${baseUrl}/posts/${id}`

import { fetchConsts } from './FetchConstants'

export const UserFetches = {
    fetchUser: (data) => {
                return fetch(fetchConsts.API + '/login', {
                    method: 'POST',
                    headers: fetchConsts.HEADERS,
                    body: JSON.stringify({ user: data })
                })
                .then(response => response.json())
    }
    ,

    fetchCreateUser: (data) => {
                return fetch(fetchConsts.API + '/users', {
                    method: 'POST',
                    headers: fetchConsts.HEADERS,
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
            }
}


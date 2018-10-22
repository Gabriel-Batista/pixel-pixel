import { fetchConsts } from './FetchConstants'

export const UserFetches = {
    fetchUser: (data) => {
                return fetch(fetchConsts.API + '/login', {
                    method: 'POST',
                    headers: fetchConsts.HEADERS,
                    body: JSON.stringify({ user: data })
                })
                .then(response => response.json())
    },
    fetchCreateUser: (data) => {
                return fetch(fetchConsts.API + '/users', {
                    method: 'POST',
                    headers: fetchConsts.HEADERS,
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
    },
    fetchPersistUser: (token) => {
        return fetch(fetchConsts.API + '/persist', {
            method: 'GET',
            headers: {
                ...fetchConsts, Authorization: localStorage.getItem("token")
            }
        })
        .then(res => res.json())
    }


}


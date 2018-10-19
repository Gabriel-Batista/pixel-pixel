const API = "http://localhost:3000"
const HEADERS = {
    "Content-type": "application/json",
    "Accepts": "application/json"
}

export const UserFetches = {
    fetchUser: (data) => {
                return fetch(API + '/login', {
                    method: 'POST',
                    headers: HEADERS,
                    body: JSON.stringify({ user: data })
                })
                .then(response => response.json())
            }
    ,

    fetchCreateUser: (data) => {
                return fetch(API + '/users', {
                    method: 'POST',
                    headers: HEADERS,
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
            }
}


import { fetchConsts } from './FetchConstants'
import { store } from '../index'

export const ProjectFetches = {
    fetchProjects: () => {
        return fetch(fetchConsts.API + '/users/' + store.getState().users.username + '/projects')
        .then(response => response.json())
    },
    fetchCreateProject: (data) => {
        return fetch(fetchConsts.API + '/projects', {
            method: 'POST',
            headers: fetchConsts.HEADERS,
            body: JSON.stringify(data)
        })
        .then(res => {
            console.log(res.json())
        })
    }
}



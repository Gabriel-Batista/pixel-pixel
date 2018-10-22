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
    },
    fetchProjectFrames: (projectId) => {
        return fetch(fetchConsts.API + '/projects/' + projectId + '/frames/')
        .then(res => res.json())
        .then(res => {
            let frames = {}
            res.forEach(frame => {
                frames[frame.local_id] = {id: frame.local_id, history: [], base64: frame.base64}
            })
            return frames
        })
    },
    fetchUpdateProject: (data) => {
        return fetch(fetchConsts.API + '/projects' + `/${data.projectId}`, {
            method: 'PATCH',
            headers: fetchConsts.HEADERS,
            body: JSON.stringify(data)
        })
        .then(res => res.json())
    },
    fetchDeleteFrame: (id) => {
        return fetch(fetchConsts.API + '/frames' + `/${id}`, {
            method: 'DELETE',
            headers: fetchConsts.HEADERS
        })
            .then(res => res.json())
    }
}



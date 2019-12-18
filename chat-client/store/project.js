import {
    set
} from '@/utils/action'

export const state = () => {
    return {
        api: {
            project: '/project'
        },
        projectList: [],
        taskList: []
    }
}

export const mutations = {
    SET_PROJECT_LIST: set('projectList'),
    SET_TASK_LIST: set("taskList")
}

export const actions = {
    async getProjectListByUserId({ state, commit }, id) {
        const res = { isSuccess: false }
        const { project } = state.api

        try {
            const data = await this.$axios.$get(`${project}/users/${id}/projects`)

            commit('SET_PROJECT_LIST', data.results)
            res.isSuccess = true
        } catch (err) {
            console.log('login', err)
        }
        return res
    },

    async getTaskListByProjectId({ state, commit }, id) {
        const res = { isSuccess: false }
        const { project } = state.api

        try {
            const data = await this.$axios.$get(`${project}/tasks`, {
                params: {
                    project_id: id,
                    paging: 0
                }
            })

            commit('SET_TASK_LIST', data)
            res.isSuccess = true
        } catch (err) {
            console.log('login', err)
        }
        return res
    }

}
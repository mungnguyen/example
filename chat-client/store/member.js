import {
    set
} from '@/utils/action'

export const state = () => {
    return {
        api: {
            department: '/department',
            project: '/project',
            userinfo: "/userinfo"
        },
        memberList: []
    }
}

export const mutations = {
    SET_MEMBER_LIST: set('memberList')
}

export const actions = {
    async getProjectMember({ state, commit }, projectId) {
        const res = { isSuccess: false }
        const { project, userinfo } = state.api

        try {
            const data = await this.$axios.$get(`${project}/projects/${projectId}/members`)

            if (data.results) {
                const listId = data.results.map(item => item.user_id)
                const listIdString = listId.join()
                const listUser = await this.$axios.$get(`${userinfo}/user/getMultiUserInfos`, {
                    params: {
                        listUserId: listIdString
                    }
                })
                commit('SET_MEMBER_LIST', listUser)
            }

            // commit('SET_MEMBER_LIST', data.results)
            res.isSuccess = true
        } catch (err) {
            console.log('getProjectMember', err)
        }
        return res
    },

    async getDepartmentMember({ state, commit }, departmentId) {
        const { department } = state.api

        try {
            const data = await this.$axios.$get(`${department}/Members/departments/${department}`)
            if (data) {
                const listId = data.map(item => item.user)
                const listIdString = listId.join()
                const listUser = await this.$axios.$get(`${userinfo}/user/getMultiUserInfos`, {
                    params: {
                        listUserId: listIdString
                    }
                })
                commit('SET_MEMBER_LIST', listUser)
            }

        } catch (err) {
            console.log('login', err)
        }
        return null
    }
}
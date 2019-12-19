import { set } from '@/utils/action'

export const state = () => {
    return {
        api: {
            group: '/api/group'
        },
        groupList: []
    }
}

export const mutations = {
    SET_ROOM_LIST: set('groupList')
}

export const actions = {
    async getAllGroup({ state, commit }, userId) {
        const { group } = state.api

        try {
            const data = await this.$axios.$get(`${group}/${userId}`)

            commit('SET_ROOM_LIST', data)
        } catch (err) {
            console.log('login', err)
        }
    },
}
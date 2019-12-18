import {
    set
} from '@/utils/action'

export const state = () => {
    return {
        api: {
            procedural: '/procedural'
        },
        proceduralList: []
    }
}

export const mutations = {
    SET_PROCEDURAL_LIST: set('proceduralList')
}

export const actions = {
    async getProceduralListByUserId({ state, commit }, id) {
        const res = { isSuccess: false }
        const { procedural } = state.api

        try {
            const data = await this.$axios.$get(`${procedural}/api/procedure-task/implemented-by-user/${id}`)

            commit('SET_PROCEDURAL_LIST', data)
            res.isSuccess = true
        } catch (err) {
            console.log('getProceduralListByUserId', err)
        }
        return res
    },

}
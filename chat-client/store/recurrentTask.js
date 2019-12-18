import {
    set
} from '@/utils/action'

export const state = () => {
    return {
        api: {
            recurrent: '/recurrent/api'
        },
        recurrentList: []
    }
}

export const mutations = {
    SET_RECURRENT_LIST: set('recurrentList')
}

export const actions = {
    async getRecurrentListByUserId({ state, commit }, id) {
        const res = { isSuccess: false }
        const { recurrent } = state.api

        try {
            const data = await this.$axios.$get(`${recurrent}/users/${id}`)

            commit('SET_RECURRENT_LIST', data)
            res.isSuccess = true
        } catch (err) {
            console.log('getRecurrentListByUserId', err)
        }
        return res
    },

}
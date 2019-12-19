import {
    set, add
} from '@/utils/action'

export const state = () => {
    return {
        api: {
            chat: '/chat'
        },
        messageList: [],
    }
}

export const mutations = {
    SET_MESSAGE_LIST: set('messageList'),
    ADD_MESSAGE: add("messageList"),

}

export const actions = {
    async getMessageListByGroupId({ state, commit }, id) {
        const { chat } = state.api
        const res = { isSuccess: false }

        try {
            const { data } = await this.$axios.$get(`${chat}/group/${id}`);

            if (data) {
                commit("SET_MESSAGE_LIST", data)
                res.isSuccess = true
            }
        } catch (err) {
            console.log("getMessageListByGroupId", err)
        }

        return res
    },

    async getGroupList({ state, commit }) {
        const { chat } = state.api

        try {
            const data = await this.$axios.$get(`${chat}/group_all`);

            return data
        } catch (err) {
            console.log("getGroupList", err)
        }

        return null
    },

    addMessage({ state, commit }, message) {
        const _message = JSON.parse(message)
        console.log("acto123", _message)
        if (_message.type === "message") {
            commit("ADD_MESSAGE", { newEl: _message.data, toTopOfList: false })
        }
    }
}
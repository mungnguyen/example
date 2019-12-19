import {
    set
} from '@/utils/action'

export const state = () => {
    return {
        api: {
            department: '/department'
        },
        department: {}
    }
}

export const mutations = {
    SET_DEPARTMENT(state, department) {
        state.department = department
    },
}

export const actions = {
    async getDepartmentByUserId({ state, commit }, memberId) {
        const { department } = state.api

        try {
            const data = await this.$axios.$get(`${department}/Members/${memberId}/?member=${memberId}`)
            if (data) {
                const _department = await this.$axios.$get(`${department}/Departments/${data.depart}?member=${memberId}`)
                if (_department) {
                    commit("SET_DEPARTMENT", _department)
                }
            }

        } catch (err) {
            console.log('login', err)
        }
    }
}
import * as types from '../mutation-types'

// state
export const state = {
    modal: {
        currentModal: 'login',
        isOpen: false,
    }
}

// getters
export const getters = {
    modal: state => state.modal,
}

// mutations
export const mutations = {
    [types.CHANGE_MODAL] (state, { currentModal }) {
        state.modal.currentModal = currentModal
    },
    [types.OPEN_MODAL] (state) {
        state.modal.isOpen = true
        document.body.style.overflow = 'hidden'
    },
    [types.CLOSE_MODAL] (state) {
        state.modal.isOpen = false
        document.body.style.overflow = ''
    }
}

// actions
export const actions = {
    changeModal ({ commit }, payload) {
        commit(types.CHANGE_MODAL, payload)
    },
    openModal ({ commit }, payload) {
        commit(types.OPEN_MODAL, payload)
    },
    closeModal ({ commit }, payload) {
        commit(types.CLOSE_MODAL, payload)
    },
}
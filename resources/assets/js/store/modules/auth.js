import axios from 'axios'
import * as Config from '../../config'
import * as types from '../mutation-types'

// state
export const state = {
  user: null,
  token: localStorage.getItem('token')
}

// getters
export const getters = {
  user: state => state.user,
  token: state => state.token,
  check: state => state.user !== null
}

// mutations
export const mutations = {
  [types.SAVE_TOKEN] (state, { token, remember }) {
    state.token = token
    localStorage.setItem('token', token);
  },

  [types.FETCH_USER_SUCCESS] (state, { user }) {
    state.user = user
  },

  [types.FETCH_USER_FAILURE] (state) {
    state.token = null
      localStorage.removeItem('token');
  },

  [types.LOGOUT] (state) {
    state.user = null
    state.token = null

    localStorage.removeItem('token');
  },

  [types.UPDATE_USER] (state, { user }) {
    state.user = user
  }
}

// actions
export const actions = {
  saveToken ({ commit, dispatch }, payload) {
    commit(types.SAVE_TOKEN, payload)
  },

  async fetchUser ({ commit }) {
    try {
      const { data } = await axios.get(Config.apiPath + 'user')

      commit(types.FETCH_USER_SUCCESS, { user: data })
    } catch (e) {
      commit(types.FETCH_USER_FAILURE)
    }
  },

  updateUser ({ commit }, payload) {
    commit(types.UPDATE_USER, payload)
  },

  removeUser({ commit }) {
    commit(types.LOGOUT)
  },

  async logout ({ commit }) {
    try {
      await axios.post(Config.apiPath + 'logout')
    } catch (e) { }

    commit(types.LOGOUT)
  },

  /*async fetchOauthUrl (ctx, { provider }) {
    const { data } = await axios.post(`/api/oauth/${provider}`)

    return data.url
  }*/
}

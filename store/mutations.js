export default {

  ON_AUTH_STATE_CHANGED(state, payload) {
    state.authChanged += 1
    state.user = payload
  },
}

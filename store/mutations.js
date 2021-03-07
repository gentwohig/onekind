export default {
  ON_AUTH_STATE_CHANGED(state, payload) {
    state.user = payload
  },
}

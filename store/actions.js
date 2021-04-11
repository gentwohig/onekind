export default {
  onAuthStateChangedAction({ commit }, { authUser, claims }) {
    if (process.client)
      if (!authUser) {
        console.log('heer')
        // claims = null
        // perform logout operations
        commit('ON_AUTH_STATE_CHANGED', null)
      } else {
        this.$fire.firestore
          .collection('users')
          .doc(authUser.uid)
          .onSnapshot((res) => {
            commit('ON_AUTH_STATE_CHANGED', {
              ...res.data(),
              uid: authUser.uid,
            })
          })
        // Do something with the authUser and the claims object...
      }
  },
  updateUserLevel({ state }, increment) {
    increment = this.$fireModule.firestore.FieldValue.increment(increment)
    this.$fire.firestore
      .collection('users')
      .doc(state.user.uid)
      .update({ level: increment })
  },
}

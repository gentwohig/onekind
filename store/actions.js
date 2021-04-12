export default {
  onAuthStateChangedAction({ commit }, { authUser, claims }) {
    if (process.client)
      if (!authUser) {
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
  updateUserLevel({ }, params) {
    const increment = this.$fireModule.firestore.FieldValue.increment(params[0])
    this.$fire.firestore
      .collection('children')
      .doc(params[1])
      .update({ user_points: increment })
  },
}

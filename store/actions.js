export default {
  // firebase authentication listener to update user state
  onAuthStateChangedAction({ commit }, { authUser, claims }) {
    if (process.client)
      if (!authUser) {
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
      }
  },
  // accepts params which contains points to increment and child id and updates child's user_points 
  updateUserLevel({ }, params) {
    const increment = this.$fireModule.firestore.FieldValue.increment(params[0])
    this.$fire.firestore
      .collection('children')
      .doc(params[1])
      .update({ user_points: increment })
  },
}

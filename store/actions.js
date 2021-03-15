export default {
  onAuthStateChangedAction({ commit }, { authUser, claims }) {
    if (!authUser) {
      // console.log('heer')
      // claims = null
      // perform logout operations
      this.$router.push("/signup")
    } else {
      this.$fire.firestore
        .collection('users')
        .doc(authUser.uid)
        .get()
        .then((res) => {
          commit('ON_AUTH_STATE_CHANGED', { ...res.data(), uid: authUser.uid })
        })
        .catch((err) => {
          console.log(err)
        })
      // Do something with the authUser and the claims object...
    }
  },
}

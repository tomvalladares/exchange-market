import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {
		userId: 100,
		email: '',
		name: 'Ramón'
	},
  }),
  
  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated
  },
  
  actions: {
    setUser(userData) {
      this.user = userData
      this.isAuthenticated = true
    },
    
    
  }
}) 
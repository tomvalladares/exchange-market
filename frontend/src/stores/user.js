import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: null
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
    
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
    
    logout() {
      this.user = null
      this.isAuthenticated = false
      this.token = null
      localStorage.removeItem('token')
    },
    
    async login(credentials) {
      try {
        // TODO: Implement actual API call
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
        
        if (!response.ok) throw new Error('Login failed')
        
        const data = await response.json()
        this.setUser(data.user)
        this.setToken(data.token)
        return true
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    }
  }
}) 
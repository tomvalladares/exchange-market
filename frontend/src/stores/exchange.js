import { defineStore } from 'pinia'

export const useExchangeStore = defineStore('exchange', {
  state: () => ({
    rates: {},
    baseCurrency: 'USD',
    selectedCurrency: 'EUR',
    amount: 0,
    loading: false,
    error: null,
    recentTransactions: []
  }),

  getters: {
    convertedAmount: (state) => {
      if (!state.rates[state.selectedCurrency]) return 0
      return state.amount * state.rates[state.selectedCurrency]
    },
    
    availableCurrencies: (state) => {
      return Object.keys(state.rates)
    }
  },

  actions: {
    async fetchRates() {
      this.loading = true
      this.error = null
      try {
        // TODO: Replace with actual API endpoint
        const response = await fetch(`/api/exchange/rates?base=${this.baseCurrency}`)
        if (!response.ok) throw new Error('Failed to fetch rates')
        
        const data = await response.json()
        this.rates = data.rates
      } catch (error) {
        this.error = error.message
        console.error('Error fetching rates:', error)
      } finally {
        this.loading = false
      }
    },

    setBaseCurrency(currency) {
      this.baseCurrency = currency
      this.fetchRates()
    },

    setSelectedCurrency(currency) {
      this.selectedCurrency = currency
    },

    setAmount(amount) {
      this.amount = amount
    },

    async executeExchange() {
      if (!this.amount || !this.rates[this.selectedCurrency]) return false

      try {
        // TODO: Replace with actual API endpoint
        const response = await fetch('/api/exchange/execute', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fromCurrency: this.baseCurrency,
            toCurrency: this.selectedCurrency,
            amount: this.amount
          })
        })

        if (!response.ok) throw new Error('Exchange failed')

        const transaction = await response.json()
        this.recentTransactions.unshift(transaction)
        return true
      } catch (error) {
        console.error('Exchange error:', error)
        return false
      }
    }
  }
}) 
import { defineStore } from 'pinia'

export const useExchangeStore = defineStore('exchange', {
  state: () => ({
    exchange: {
		amount: 0,
		exchangeType: '',
		userId: 0,
		status: '',
		createdAt: '',
	}
  }),

  getters: {
	hasExchangeMatched() {
			return this.exchange.status === 'matched' && this.exchange.amount > 0 && !!this.exchange.matchedExchange.id
	},
	hasExchangePending() {
		return this.exchange.status === 'pending' && this.exchange.amount > 0 && this.exchange.exchangeType !== ''
	},
  },

  actions: {
	setExchange(exchange) {

		this.exchange = exchange
	},

	resetExchange() {
		this.exchange = {
			amount: 0,
			exchangeType: '',
			userId: 0,
			status: '',
			createdAt: '',
		}
	},
  }
}) 
/**
* Topbar component
*/

<script setup>
import { useExchangeStore } from '@/stores/exchange'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const exchangeStore = useExchangeStore()
const router = useRouter()

const exchangeTypeMap = {
    'cashTransfer': 'transferCash',
    'transferCash': 'cashTransfer'
  }

const showDevTools = ref(false)

// Handle keypress event
const handleKeyPress = (event) => {
	if (event.key === 'd') {
		showDevTools.value = !showDevTools.value
	}
}

// Add and remove event listeners
onMounted(() => {
	window.addEventListener('keypress', handleKeyPress)
})

onUnmounted(() => {
	window.removeEventListener('keypress', handleKeyPress)
})

async function resetExchange() {
	try {
		const response = await fetch('http://localhost:3000/api/exchange/reset', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		console.log('Exchange reset successfully')
		// reset exchange store
		exchangeStore.resetExchange()

	} catch (error) {
		console.error('Error resetting exchange:', error)
	}
}

async function createMatch() {
	try {

		if (!exchangeStore.exchange.amount) {
			throw new Error('No exchange found')
		}

		// Create exchange data with pending amount from store
		const randomExchange = {
			amount: exchangeStore.exchange.amount,
			exchangeType: exchangeTypeMap[exchangeStore.exchange.exchangeType], // Use opposite type
			userId: Math.floor(Math.random() * 100).toString()
		}

		const response = await fetch('http://localhost:3000/api/exchange', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(randomExchange)
		})

		const data = await response.json()
		
		if (!response.ok) {
			throw new Error(data.error || 'Error creating random exchange')
		}

		console.log('Random exchange created:', data)

		// refresh view
		window.location.reload()

	} catch (error) {
		console.error('Error creating random exchange:', error)
	}
}
</script>

<template lang="pug">
nav.topbar
	.topbar-container
		router-link.topbar-logo(to="/")
			img(src="@/assets/logo.svg", alt="Logo")

	.dev-tools-container(v-if="showDevTools")
		button.tool-button(@click="resetExchange") Reset
		button.tool-button(@click="createMatch") Create Match
</template>

<style lang="stylus" scoped>
.topbar
	width 100%
	height var(--topbar-height)
	padding var(--spacing-l) var(--spacing-m)

.topbar-container
	margin 0 auto

	.topbar-logo
		height 40px
		img
			height 40px
			width auto

.dev-tools-container
	position absolute
	z-index 1000
	top var(--topbar-height)
	left 0
	padding var(--spacing-m)

	.tool-button
		background-color var(--color-grey-100)
		border 1px solid var(--color-grey-200)
		border-radius var(--radius-m)
		padding var(--spacing-xs)
		cursor pointer
		font 700 var(--font-size-xs)/1 var(--font-sans)
		color var(--color-grey-800)
		&:hover
			background-color var(--color-grey-300)
</style>

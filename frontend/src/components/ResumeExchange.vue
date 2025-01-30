<script setup>
import { ref } from 'vue'
import { useExchangeStore } from '@/stores/exchange'

const exchangeStore = useExchangeStore()

const CHANGE_TYPE = {
	cashTransfer: 'Efectivo a Transferencia',
	transferCash: 'Transferencia a Efectivo'
}

const name = ref('Ramón')
const userId = ref()
const showConfirmModal = ref(false)
const form = ref({
	amount: 0,
	exchangeType: 'cashTransfer'
})

function handleConfirm() {
	console.log('submitting form')
	// set form in store
	exchangeStore.setExchange(form.value)
	// Submit the form
	submitForm()
}


// send to api for save
async function submitForm() {
	try {
		// fetch post to api local
		const response = await fetch('http://localhost:3000/api/exchange', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(form.value)
		})

		const data = await response.json()
		
		if (!response.ok) {
			throw new Error(data.error || 'Error creating exchange')
		}

		// Close modal and reset form on success
		showConfirmModal.value = false
		form.value = {
			amount: 0,
			exchangeType: 'cashTransfer'
		}

		console.log('Exchange created:', data)
	} catch (error) {
		console.error('Error:', error)
		// Here you could show an error message to the user
	}
}

</script>

<template lang="pug">
section.resume-exchange-view

	.header-container
		//- TODO: add input for name, from USER DB
		h1.g-title Hola{{ `, ${name}` }}!
		p.g-paragraph Tienes publicada la transacción para cambiar tu dinero


	.exchange-container
		.exchange-card
			.amount-wrapper
				p.exchange-amount ${{ exchangeStore.exchange.amount }}
				span.exchange-currency MXN
			p.exchange-type de {{ CHANGE_TYPE[exchangeStore.exchange.exchangeType] }}


	.disclaimer-container
		p.disclaimer-text Estamos buscando a otro usuario que haga match con el cambio que buscas. Te notificaremos cuando lo encontremos.
</template>


<style scoped lang="stylus">
.resume-exchange-view
	position relative
	display grid
	gap var(--spacing-3xl)
	align-items start
	grid-template-rows auto 1fr
	height calc(100vh - var(--topbar-height))
	padding var(--spacing-2xl) var(--spacing-m) var(--spacing-l)
	overflow-x hidden

	.exchange-container
		display block
		width 100%

		.exchange-card
			width 100%
			background-color var(--color-grey-100)
			padding var(--spacing-m)
			border-radius var(--radius-m)
			border 1px solid var(--color-grey-200)

			.amount-wrapper
				position relative
				display flex
				justify-content space-between
				align-items end

				.exchange-amount
					font 400 var(--font-size-3xl)/1.15 var(--font-sans)
					color var(--color-grey-800)

				.exchange-currency
					font 400 var(--font-size-s)/1.15 var(--font-sans)
					color var(--color-grey-600)

			.exchange-type
				margin var(--spacing-s) 0 0
				font 500 var(--font-size-s)/1.15 var(--font-sans)
				color var(--color-grey-500)

	.disclaimer-container
		background-color var(--color-grey-100)
		padding var(--spacing-m)
		border-radius var(--radius-m)
		border 1px solid var(--color-grey-200)

		.disclaimer-text
			font 400 var(--font-size-s)/1.15 var(--font-sans)
			color var(--color-grey-500)

	.header-container
		display grid
		align-self start
		height min-content
		width 100%
		gap var(--spacing-m)

	.form-container
		align-self start
		display flex
		flex-direction column
		justify-content space-between
		min-height 100%

		.inputs-container
			display grid
			gap var(--spacing-3xl)
			align-items start
			align-content start
			height 100%

		.input-wrapper
			position relative
			display grid

			.input-container
				position relative
				width 100%

				.money-symbol
					position absolute
					left 0
					top 50%
					transform translateY(-50%)
					font 400 var(--font-size-2xl)/1.15 var(--font-sans)
					color var(--color-grey-600)
				
				.currency-symbol
					position absolute
					right 0
					bottom 0
					transform translateY(-50%)
					font 500 var(--font-size-s)/1.15 var(--font-sans)
					color var(--color-grey-800)

		.label
			font 400 var(--font-size-s)/1.15 var(--font-sans)
			color var(--color-grey-500)

		input
			height 100%
			width 100%
			padding 0 var(--spacing-l)
			border none
			border-bottom 1px solid var(--color-border)

		input[type="number"]
			font 500 var(--font-size-3xl)/1.15 var(--font-sans)
			text-align center
			-moz-appearance textfield
			&::-webkit-outer-spin-button,
			&::-webkit-inner-spin-button
				-webkit-appearance none
				margin 0

		input:focus
			outline none
			border-bottom 2px solid var(--color-black)

		select
			width 100%
			padding var(--spacing-s)
			// border-radius var(--radius-m)
			background none
			border none
			border-bottom 1px solid var(--color-border)
			font 600 var(--font-size-m)/1.15 var(--font-sans)

		button
			align-self end
			align-content end

	.confirm-modal
		position fixed
		z-index 100
		left 0
		right 0
		top 50%
		transform translateY(-50%)
		background-color var(--color-white)
		padding var(--spacing-l) var(--spacing-m)
		margin 0 var(--spacing-m)
		border-radius var(--radius-m)
		border 1px solid var(--color-border)

		.g-paragraph
			margin var(--spacing-l) 0

		.actions-container
			display grid
			grid-template-columns 1fr 1fr
			gap var(--spacing-m)
			width min-content
			margin var(--spacing-xl) auto 0

			.g-btn
				width 100%
				padding var(--spacing-m) var(--spacing-l)

	.confirm-sheet
		position fixed
		z-index 0
		bottom 0
		left 0
		right 0
		top 0
		background-color rgba(0, 0, 0, 0.5)

</style> 

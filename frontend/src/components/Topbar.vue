/**
* Topbar component
*/

<template lang="pug">
nav.topbar
	.topbar-container
		router-link.topbar-logo(to="/")
			img(src="@/assets/logo.svg", alt="Logo")
</template>

<style lang="stylus" scoped>
.topbar
  width 100%
  height 70px
  padding var(--spacing-l) var(--spacing-m)

.topbar-container
	margin 0 auto

	.topbar-logo
		height 40px
		img
			height 40px
			width auto
</style>
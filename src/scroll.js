let container

export default {
	data() {
		return {
			scrollTop: 0
		}
	},
	watch: {
		$route() {
			this.setScrollTop()
		}
	},
	methods: {
		setScrollTop() {
			container.scrollTop = this.scrollTop
		}
	},
	mounted() {
		container = document.querySelector('.content')
		this.setScrollTop()
	},
	beforeRouteLeave(to, from ,next) {
    this.scrollTop = container.scrollTop
    next()
	}
}
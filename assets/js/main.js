const app = new Vue({
    el: '#app',
    data: {
        showInputName: true,
        showGame: false,
        inputName: '',
        playerName: ''

    },
    methods: {
        setPlayersName() {
            this.playerName = this.inputName
            this.inputName = ''
            this.showInputName = false
            this.showGame = true
        },
    }

});

// Vue.component('fish-item', {
//     props: ['index', 'fish'],
//     data: function () {
//         return {

//         }
//     },
//     template: `<div @click='clickToFish()'></div>`,

//     methods: {
//         clickToFish() {
//             app.clickFish(this.index)
//         },
//     }
// });

const app = new Vue({
    el: '#app',
    data: {
        showInputName: true,
        showGame: true,
        inputName: '',
        playerName: '',
        gameField: { height: 600, width: 1000 },
        timer: 60,
        timerActive: '',
        score: 0,
        id: 0,
        fishes: [],
        limit: 10,
    },
    computed: {
        gameFieldHeight() {
            return this.gameField.height + 'px'
        },
        gameFieldWidth() {
            return this.gameField.width + 'px'
        }
    },
    methods: {
        reset() {
            this.timerStop()
            this.showInputName = true,
                this.showGame = true,
                this.inputName = '',
                this.playerName = '',
                this.gameField = { height: 600, width: 1000 },
                this.timer = 60,
                this.score = 0,
                this.id = 0,
                this.fishes = [],
                this.limit = 10
        },
        getRandomInt(max) {
            return Math.floor(Math.random() * max);
        },
        setPlayersName() {
            this.playerName = this.inputName
            this.inputName = ''
            this.showInputName = false
            this.showGame = true
        },
        timerStart() {
            this.timerActive = setInterval(() => {
                this.timer = this.timer - 1
                if (this.fishes.length < this.limit) { this.summonFish() }

                if (this.timer == 0) {
                    this.endGame(this.timerActive)
                }
            }, 1000);

        },
        endGame() {
            this.fishes = []
            this.timerStop()

        },
        timerStop() {
            return clearInterval(this.timerActive)
        },
        startGame() {
            this.reset()
            this.timerStart()
        },
        summonFish() {
            this.id++
            let fish = {
                id: this.id,
                type: 'green_fish',
                top: this.getRandomInt(this.gameField.height - 100),
                left: this.getRandomInt(this.gameField.width - 200),
                coup: Math.random() < 0.5,
                px: 'px'
            }
            this.fishes.push(fish)
            // fish = fishes[fishes.length-1]
            this.moveFish(fish)
        },
        clickFish(index) {
            if (this.timer == 0) { return false }
            this.fishes.splice(index, 1)
            this.score += 100
        },
        moveFish(fish) {
            let spped = this.getRandomInt(50)
            setInterval(() => {
                if (fish.left === 0) {
                    fish.coup = false
                }
                if (fish.left === this.gameField.width - 120) fish.coup = true
                if (fish.coup) {
                    fish.left -= 1
                } else {
                    fish.left += 1
                }
            }, spped)
        }

    }

});

const app = new Vue({
    el: '#app',
    data: {
        showInputName: true,
        showGame: false,
        inputName: '',
        playerName: '',
        gameField: { height: 600, width: 1000 },
        timer: 60,
        timerActive: '',
        score: 0,
        id: 0,
        fishes: [],
        fishesTypes: ['red_fish', 'golden_fish', 'green_fish'],
        limit: 10,
        results: [],
    },
    computed: {
        gameFieldHeight() {
            return this.gameField.height + 'px'
        },
        gameFieldWidth() {
            return this.gameField.width + 'px'
        },
        sortResults() {
            let sort = this.results.sort((prev, next) => next.score - prev.score).slice(0, 10);

            for (let i = 0; i < this.results.length; i++) {
                if (this.results[i].background == 'LightBlue' && i > 9) {
                    sort[9] = this.results[i]
                    break;
                }
            }
            return sort
        }
    },
    methods: {
        clearCurrentScore() {
            for (let i = 0; i < this.results.length; i++) {
                if (this.results[i].background == 'LightBlue') {
                    this.results[i].background = ''
                }
            }
        },
        setScore(speed, max = 300) {
            return (Math.round((speed * max / speed ** 1.2) / 10) * 10)
        },
        getRandomInt(max, min = 0) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        },
        reset() {
            this.timerStop()
            this.showGame = true,
                this.inputName = '',
                this.gameField = { height: 600, width: 1000 },
                this.timer = 60,
                this.score = 0,
                this.id = 0,
                this.fishes = [],
                this.limit = 10
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
                doubleFish = Math.random() < 0.5
                if (this.fishes.length < this.limit) { if (doubleFish) { this.summonFish() } this.summonFish() }

                if (this.timer == 0) {
                    this.endGame(this.timerActive)
                }
            }, 1000);
        },
        endGame() {
            this.timerStop()
            this.results.push({
                playerName: this.playerName,
                score: this.score,
                background: 'LightBlue'
            })
        },
        timerStop() {
            return clearInterval(this.timerActive)
        },
        startGame() {
            this.reset()
            this.clearCurrentScore()
            this.timerStart()
        },
        summonFish() {
            this.id++
            let fish = {
                id: this.id,
                type: this.fishesTypes[this.getRandomInt(this.fishesTypes.length)],
                top: this.getRandomInt(this.gameField.height - 100),
                left: this.getRandomInt(this.gameField.width - 200),
                height: 50,
                coup: Math.random() < 0.5,
                px: 'px',
                transition: '0.1s',
            }
            if (fish.type == 'golden_fish') { fish.width = 80; fish.speed = this.getRandomInt(30, 15); fish.score = this.setScore(fish.speed) }
            if (fish.type == 'red_fish') { fish.width = 65; fish.speed = this.getRandomInt(15, 5); fish.score = this.setScore(fish.speed) }
            if (fish.type == 'green_fish') { fish.width = 65; fish.speed = this.getRandomInt(5, 1); fish.score = this.setScore(fish.speed) }

            setTimeout(() => fish.transition = `0.25s`, 10);
            setTimeout(() => fish.width = fish.width * 2, 10);
            setTimeout(() => fish.height = fish.height * 2, 10);
            setTimeout(() => fish.transition = `0.1s`, 250);

            this.fishes.push(fish)
            this.moveFish(fish)
        },
        clickFish(index) {
            if (this.timer == 0) { return false }
            this.score += this.fishes[index].score

            setTimeout(() => this.fishes[index].transition = `0.1s`, 10);
            setTimeout(() => this.fishes[index].img = `url('assets/img/bubbles.png')`, 10);
            setTimeout(() => this.fishes.splice(index, 1), 100);
        },
        moveFish(fish) {
            setInterval(() => {
                if (fish.left === 0) { fish.coup = false }
                if (fish.left === this.gameField.width - fish.width) { fish.coup = true }
                (fish.coup) ? fish.left -= 1 : fish.left += 1
            }, fish.speed)
        }
    }
});

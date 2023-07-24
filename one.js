const game = (function () {
    let playerBalls = 5;
    let botBalls = 5;

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getPlayerGuess() {
        let maxGuess = Math.min(playerBalls, 5); // Ограничиваем ввод числа от 1 до количества имеющихся шариков (максимум 5)
        let guess = +prompt(`Введите число от 1 до ${maxGuess}:`);
        if (isNaN(guess) || guess < 1 || guess > maxGuess) {
            alert("Некорректный ввод! Попробуйте еще раз.");
            return getPlayerGuess(); // Рекурсивно запускаем функцию снова для корректного ввода
        }
        return guess;
    }

    function playRound() {
        let playerGuess = getPlayerGuess();
        let botGuess = getRandomInt(1, 5);
        let totalGuess = playerGuess + botGuess;

        console.log(`Игрок загадал: ${playerGuess}`);
        console.log(`Бот угадал: ${botGuess}`);

        if (totalGuess % 2 === 0) {
            // Если сумма шариков четная, бот угадал
            console.log("Бот угадал!");
            botBalls += totalGuess;
            playerBalls -= playerGuess;
        } else {
            // Если сумма шариков нечетная, бот не угадал
            console.log("Бот не угадал!");
            botBalls -= botGuess;
            playerBalls += totalGuess;
        }

        // Проверяем, чтобы количество шариков не превышало 10
        if (playerBalls > 10) {
            playerBalls = 10;
        }

        if (botBalls > 10) {
            botBalls = 10;
        }

        console.log(`У игрока осталось шариков: ${playerBalls}`);
        console.log(`У бота осталось шариков: ${botBalls}`);

        if (playerBalls <= 0 || botBalls <= 0) {
            // Проверка на окончание игры
            console.log(
                playerBalls <= 0 ? "Игрок проиграл!" : "Игрок победил!"
            );
            return;
        } else {
            playRound(); // Рекурсивно запускаем следующий раунд
        }
    }

    return {
        startGame: function () {
            console.log("Игра начинается!");
            playRound();
        },
    };
})();

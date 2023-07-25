// game.js
const game = (function () {
    // Функция для генерации случайного числа от min до max (включительно)
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // Замыкание для хранения количества шариков у игрока и бота
    let playerBalls = 5;
    let botBalls = 5;

    // Функция, которая запускает игру
    function playGame() {
        while (playerBalls > 0 && botBalls > 0) {
            // Шаг 1: Игрок загадывает число и вводит его в prompt
            const playerGuess = prompt(
                `У вас ${playerBalls} шариков. Введите число от 1 до ${playerBalls}:`
            );

            // Проверка на отмену игры
            if (playerGuess === null) {
                alert("Вы решили выйти из игры.");
                return;
            }

            // Проверка на правильность ввода числа
            const playerGuessNumber = parseInt(playerGuess);
            if (
                isNaN(playerGuessNumber) ||
                playerGuessNumber < 1 ||
                playerGuessNumber > playerBalls
            ) {
                alert("Пожалуйста, введите корректное число.");
                continue;
            }

            // Шаг 2: Бот рандомно угадывает чётное или нечётное количество шариков
            const botGuess = getRandomInt(1, botBalls);

            // Шаг 3 и 4: Проверяем, угадал ли бот, и обновляем количество шариков
            if (botGuess % 2 === playerGuessNumber % 2) {
                alert(`Бот угадал! Берет ${playerGuessNumber} шариков.`);
                botBalls += playerGuessNumber;
                playerBalls -= playerGuessNumber;
            } else {
                alert(`Бот не угадал! Вы берете ${botGuess} шариков.`);
                playerBalls += botGuess;
                botBalls -= botGuess;
            }

            // Выводим текущее количество шариков у игрока и бота
            alert(
                `У вас: ${playerBalls} шариков, У бота: ${botBalls} шариков.`
            );
        }

        // Шаг 5: Определяем победителя
        if (playerBalls <= 0) {
            alert("Вы проиграли! У вас закончились шарики.");
        } else {
            alert("Поздравляем, вы победили! У бота закончились шарики.");
        }
    }

    return {
        startGame() {
            // Запускаем игру при загрузке страницы
            playGame();
        },
    };
})();

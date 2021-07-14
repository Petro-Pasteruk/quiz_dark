// Функція перемикання питань
function toggleQuestions (question) {
    const allQuestions = document.querySelectorAll(".quiz__question");
    for (let i = 0; i < allQuestions.length; i++) {
        if (allQuestions[i] === question) {
            if (allQuestions[i+1]) {
                allQuestions[i+1].classList.remove("hidden");
            }
        }
    }
}

// Функція сповіщення якщо правильна відповідь
function notificationCorrectAnswer (question) {
    question.classList.add("hidden");
    document.querySelector(".correct-answer").classList.remove("hidden");
    setTimeout(() => {
        document.querySelector(".correct-answer").classList.add("hidden");
    }, 1500);

    toggleQuestions(question);
}

// Функція сповіщення якщо не правильна відповідь
function notificationNotCorrectAnswer (question, notificationText) {
    question.classList.add("hidden");
    document.querySelector(".wrong-answer").classList.remove("hidden");
    document.querySelector(".wrong-answer").querySelector(".container").innerHTML = "Wrong. <br/>" + "Correct answer: " + notificationText;
    setTimeout(() => {
        document.querySelector(".wrong-answer").classList.add("hidden");
    }, 3000);

    toggleQuestions(question);
}

// Функція яка відповідає за функціонал вікторин
function functionalQuizzes (nextBtn, counterCorrectAnswer, counterWrongAnswer) {
    nextBtn.addEventListener("click", function () {
        nextBtn.parentElement.parentElement.querySelectorAll(".quiz__question").forEach(question => {
            if (!question.classList.contains("hidden")) {
                let rightAnswer = question.querySelector(".right-answer").parentElement.querySelector(".quiz__checkbox").value.trim();

                question.querySelectorAll(".quiz__checkbox").forEach(checkbox => {
                    if (checkbox.checked) {
                        if (checkbox.value.trim() === rightAnswer) {
                            nextBtn.parentElement.querySelector(".quiz__progress-bar").appendChild(document.createElement("div"));
                            notificationCorrectAnswer(question);
                            counterCorrectAnswer++;
                        } else {
                            nextBtn.parentElement.querySelector(".quiz__progress-bar").appendChild(document.createElement("div"));
                            notificationNotCorrectAnswer(question, rightAnswer);
                            counterWrongAnswer++;
                        }
                    }
                });
            }
        });

        if (counterCorrectAnswer + counterWrongAnswer === nextBtn.parentElement.parentElement.querySelectorAll(".quiz__question").length) {
            document.querySelector(".quiz-statistics__correct").textContent = "Correct answers: " + counterCorrectAnswer;
            document.querySelector(".quiz-statistics__wrong").textContent = "Wrong answers: " + counterWrongAnswer;
            nextBtn.parentElement.parentElement.classList.add("hidden");
            document.querySelector(".quiz-statistics").classList.remove("hidden");
        }
    });
}

// Підключений клік на айтеми, який імітує клік на чекбокси
document.querySelectorAll(".quiz__answer").forEach(item => {
    item.addEventListener("click", function () {
        item.querySelector(".quiz__checkbox").click();
    });
});

// Зробив перехід на головну по кнопці
document.querySelector(".quiz-statistics__home-btn").addEventListener("click", function () {
    location.reload();
});

//  Підключення кнопок до вікторин, і також виклик функції яка відповідає за функціонал вікторин
const
    quizButtons = document.querySelectorAll(".main-window__button"),
    quizzes = document.querySelectorAll(".quiz");

for (let i = 0; i < quizButtons.length; i++) {
    quizButtons[i].addEventListener("click", function () {
        let
            counterCorrectAnswer = 0,
            counterWrongAnswer = 0;

        document.querySelector(".main-window").classList.add("hidden");
        quizzes[i].classList.remove("hidden");
        quizzes[i].querySelectorAll(".quiz__question").forEach((item, index) => {
            if (index !== 0) {
                item.classList.add("hidden");
            }
        });
        functionalQuizzes(quizzes[i].querySelector(".quiz__next-btn"), counterCorrectAnswer, counterWrongAnswer);
    });
}
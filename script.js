
let currentTheme = "sky";

function selectTheme(theme) {
    currentTheme = theme;

    document.body.classList.remove(
        "theme-sky",
        "theme-pink",
        "theme-green",
        "theme-purple"
    );

    document.body.classList.add("theme-" + theme);

    document.querySelectorAll(".theme-btn").forEach(function(button) {
        button.classList.remove("selected");
    });

    const selectedButton = document.querySelector(
        '[onclick="selectTheme(\'' + theme + '\')"]'
    );

    if (selectedButton) {
        selectedButton.classList.add("selected");
    }

    const themeNames = {
        sky: "Sky Blue",
        pink: "Pink",
        green: "Green",
        purple: "Purple"
    };

    document.getElementById("selectedMessage").textContent =
        themeNames[theme] + " theme selected!";
}

function startQuiz() {
    document.getElementById("themePage").hidden = true;
    document.getElementById("quizPage").hidden = false;
}

function goBack() {
    document.getElementById("quizPage").hidden = true;
    document.getElementById("themePage").hidden = false;
}

const questions = [
    {
        question: "1. What is Doraemon's favourite food?",
        options: ["Pizza 🍕", "Dorayaki 🥞", "Burger 🍔", "Ice Cream 🍦"],
        answer: 1
    },
    {
        question: "2. Who is Doraemon's best friend?",
        options: ["Gian", "Suneo", "Nobita", "Dekisugi"],
        answer: 2
    },
    {
        question: "3. What is Nobita's favourite activity?",
        options: ["Sleeping 😴", "Running", "Swimming", "Studying"],
        answer: 0
    },
    {
        question: "4. Which gadget helps Doraemon travel anywhere?",
        options: ["Bamboo Copter", "Anywhere Door", "Small Light", "Time Cloth"],
        answer: 1
    },
    {
        question: "5. What does Nobita value most in friendship?",
        options: ["Money", "Fame", "Care and support 💙", "Gadgets"],
        answer: 2
    },
    {
        question: "6. What is Doraemon's colour?",
        options: ["Red", "Blue", "Green", "Pink"],
        answer: 1
    },
    {
        question: "7. Who often bullies Nobita?",
        options: ["Gian", "Shizuka", "Doraemon", "Dorami"],
        answer: 0
    },
    {
        question: "8. What does the Anywhere Door do?",
        options: ["Makes food", "Changes size", "Takes you to places", "Stops time"],
        answer: 2
    },
    {
        question: "9. What makes a strong friendship?",
        options: ["Trust 🤝", "Fighting", "Lying", "Ignoring"],
        answer: 0
    },
    {
        question: "10. Who always helps Nobita?",
        options: ["Only Gian", "Doraemon 💙", "Only Suneo", "Nobody"],
        answer: 1
    }
];

let currentQuestion = 0;
let currentScore = 0;
let answered = false;

function showQuestion() {
    answered = false;

    const q = questions[currentQuestion];
    document.getElementById("question").textContent = q.question;
    document.getElementById("result").textContent = "";
    document.getElementById("score").textContent =
        "Question " + (currentQuestion + 1) + " / " + questions.length;

    const answerButtons = document.querySelectorAll(".answers button");

    answerButtons.forEach((button, index) => {
        button.textContent = q.options[index];
        button.disabled = false;
        button.style.background = "";
        button.onclick = () => checkAnswer(index);
    });

    document.getElementById("nextBtn").hidden = true;
}

function checkAnswer(answer) {
    if (answered) return;

    answered = true;
    const q = questions[currentQuestion];
    const result = document.getElementById("result");

    if (answer === q.answer) {
        currentScore++;
        result.textContent = "🎉 Correct answer! Well done, Nobita!";
        result.style.color = "green";
    } else {
        result.textContent =
            "😊 Not quite! Correct answer: " + q.options[q.answer];
        result.style.color = "red";
    }

    document.querySelectorAll(".answers button").forEach(button => {
        button.disabled = true;
    });

    document.getElementById("score").textContent =
        "Your Score: " + currentScore + " / " + questions.length;

    document.getElementById("nextBtn").hidden = false;
    document.getElementById("nextBtn").textContent =
        currentQuestion === questions.length - 1
            ? "See My Result 💙"
            : "Next Question ➜";
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showFinalResult();
    }
}


function showFinalResult() {
    document.getElementById("question").textContent =
        "💙 Your Friendship Result 💙";

    document.querySelector(".answers").hidden = true;

    const result = document.getElementById("result");
    const greeting = document.getElementById("friendshipGreeting");
    const greetingTitle = document.getElementById("greetingTitle");
    const greetingMessage = document.getElementById("greetingMessage");

    if (currentScore === 10) {
        result.textContent = "10/10 — Perfect Friendship! 🥰";
        greetingTitle.textContent = "💙 Best Friends Forever! 💙";
        greetingMessage.textContent =
            "Doraemon and Nobita maadhiri namma friendship-um forever! 🫂";
    } else if (currentScore === 9) {
        result.textContent = "9/10 — Amazing Friendship! 🎉";
        greetingTitle.textContent = "🌟 Super Bestie! 🌟";
        greetingMessage.textContent =
            "Oru answer miss aanaalum, friendship-la nee superstar! 💙";
    } else if (currentScore === 8) {
        result.textContent = "8/10 — Wonderful Friendship! 💖";
        greetingTitle.textContent = "🤗 Amazing Friends! 🤗";
        greetingMessage.textContent =
            "Care, trust, support — idhu dhaan real friendship!";
    } else if (currentScore >= 5) {
        result.textContent = currentScore + "/10 — Great Try! 💙";
        greetingTitle.textContent = "🌈 Friendship Forever! 🌈";
        greetingMessage.textContent =
            "Innum konjam try pannu, Nobita! Un friendship special!";
    } else {
        result.textContent = currentScore + "/10 — Keep Trying! 🌟";
        greetingTitle.textContent = "🫶 Friends Always! 🫶";
        greetingMessage.textContent =
            "Score vida friendship mukkiyam! Try again, Nobita!";
    }

    greeting.hidden = false;
    document.getElementById("score").textContent =
        "Quiz Completed! 🎉";

    document.getElementById("nextBtn").hidden = true;
}
function startQuiz() {
    document.getElementById("themePage").hidden = true;
    document.getElementById("quizPage").hidden = false;

    const backgrounds = {
        sky: "blue dora.jpg",
        pink: "pink dora.jpg",
        green: "green dora.jpg",
       purple: "purple dora.jpg"
       };

    const quizPage = document.getElementById("quizPage");

    quizPage.style.backgroundImage =
        `url("${backgrounds[currentTheme]}")`;
    quizPage.style.backgroundSize = "cover";
    quizPage.style.backgroundPosition = "center";
    quizPage.style.backgroundRepeat = "no-repeat";

    currentQuestion = 0;
    currentScore = 0;

    document.querySelector(".answers").hidden = false;
    document.getElementById("friendshipGreeting").hidden = true;

    showQuestion();
}

function goBack() {
    document.getElementById("quizPage").hidden = true;
    document.getElementById("themePage").hidden = false;
}


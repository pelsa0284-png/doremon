
let currentTheme = "sky";
let currentQuestion = 0;
let currentScore = 0;
let answered = false;

function showNamePage() {
    document.getElementById("themePage").hidden = true;

    document.querySelector(".name-image-card").style.backgroundImage =
        `url("name-${currentTheme}.png")`;

    document.getElementById("namePage").hidden = false;
}

function continueToQuiz() {
    const name = document.getElementById("playerName").value.trim();

    if (name === "") {
    
        alert("Please enter your name!");
        return;
    }

    document.getElementById("quizPage").querySelector("p").textContent =
        pendingSharedQuiz
            ? "Let's see how well you know " + pendingSharedQuiz.friendName + "!"
            : "Let's check our friendship, " + name + "!";
    document.querySelector("#quizPage h1").textContent = pendingSharedQuiz
        ? pendingSharedQuiz.creator + "'s Friendship Quiz 💌"
        : "💙 Doraemon Friends Quiz 💙";

    startQuiz();
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
let activeQuestions = questions;
let pendingSharedQuiz = null;

// Theme selection
function selectTheme(theme) {
    currentTheme = theme;
    

    document.body.classList.remove(
        "theme-sky",
        "theme-pink",
        "theme-green",
        "theme-purple"
    );

    document.body.classList.add("theme-" + theme);

    document.querySelectorAll(".theme-btn").forEach(button => {
        button.classList.remove("selected");
    });

    const selectedButton = document.querySelector(
        `[onclick="selectTheme('${theme}')"]`
    );

    if (selectedButton) {
        selectedButton.classList.add("selected");
    }

    const message = document.getElementById("selectedMessage");

    if (message) {
        const names = {
            sky: "Sky Blue",
            pink: "Pink",
            green: "Green",
            purple: "Purple"
        };

        message.textContent = names[theme] + " theme selected!";
    }
}

// Start quiz

 // Start quiz
function startQuiz() {
    document.getElementById("themePage").hidden = true;
    document.getElementById("namePage").hidden = true;
    document.getElementById("quizPage").hidden = false;
    activeQuestions = pendingSharedQuiz
        ? pendingSharedQuiz.questions
        : questions;

    const backgrounds = {
        sky: "question-blue.png",
        pink: "question-pink.png",
        green: "question-green.png",
        purple: "question-purple.png"
    };

    const quizPage = document.getElementById("quizPage");

    quizPage.style.backgroundImage =
        `url("${backgrounds[currentTheme]}")`;
    quizPage.style.backgroundSize = "100% 100%";
    quizPage.style.backgroundPosition = "center";
    quizPage.style.backgroundRepeat = "no-repeat";

    currentQuestion = 0;
    currentScore = 0;

    document.querySelector(".answers").hidden = false;
   
    showQuestion();
}

// Display question
function showQuestion() {
    answered = false;

    const q = activeQuestions[currentQuestion];

    document.getElementById("question").textContent = q.question;
    document.getElementById("result").textContent = "";
    document.getElementById("score").textContent =
        "Question " + (currentQuestion + 1) + " / " + activeQuestions.length;

    const answerButtons = document.querySelectorAll(".answers button");

    answerButtons.forEach((button, index) => {
        button.textContent = q.options[index];
        button.disabled = false;
        button.classList.remove("is-correct", "is-wrong");
        button.onclick = () => checkAnswer(index);
    });

    document.getElementById("nextBtn").hidden = true;
}

// Check answer and show colours
function checkAnswer(answer) {
    if (answered) return;

    answered = true;

    const q = activeQuestions[currentQuestion];
    const result = document.getElementById("result");
    const answerButtons = document.querySelectorAll(".answers button");

    answerButtons.forEach((button, index) => {
        button.disabled = true;

        if (index === q.answer) {
            button.classList.add("is-correct");
        } else if (index === answer) {
            button.classList.add("is-wrong");
        }
    });

    if (answer === q.answer) {
        currentScore++;
        result.textContent = "";
    } else {
        result.textContent = "";
    }

    document.getElementById("score").textContent =
        "Your Score: " + currentScore + " / " + activeQuestions.length;

    const nextBtn = document.getElementById("nextBtn");

    nextBtn.hidden = false;
    nextBtn.textContent =
        currentQuestion === activeQuestions.length - 1
            ? "See Result"
            : "Next";
}

// Next question
function nextQuestion() {
    if (currentQuestion < activeQuestions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        showFinalResult();
    }
}

// Final friendship result

function applyScoreThemeBackground() {
    const scorePage = document.getElementById("scorePage");
    const scoreBackgrounds = {
        sky: "scoreblue.png",
        pink: "scorepink.png",
        green: "scoregreen.png",
        purple: "scorepurple.png"
    };

    const selectedImage = scoreBackgrounds[currentTheme] || scoreBackgrounds.sky;

    scorePage.style.backgroundImage = `url("${selectedImage}")`;
    scorePage.style.backgroundSize = "100% 100%";
    scorePage.style.backgroundPosition = "center";
    scorePage.style.backgroundRepeat = "no-repeat";
    scorePage.style.backgroundColor = "transparent";
}

function showFinalResult() {
    document.getElementById("quizPage").hidden = true;
    const scorePage = document.getElementById("scorePage");
    scorePage.hidden = false;

    applyScoreThemeBackground();

    document.getElementById("finalScore").textContent =
        currentScore + " / " + activeQuestions.length;

    let message = "";

    if (currentScore === 10) {
        message = "Perfect Friendship! 🥰 Best Friends Forever!";
    } else if (currentScore >= 8) {
        message = "Amazing Friendship! 💙 You are a super bestie!";
    } else if (currentScore >= 5) {
        message = "Great Try! 🌈 Keep your friendship strong!";
    } else {
        message = "Friendship is more important than marks! 🫂";
    }

    document.getElementById("scoreMessage").textContent = message;
    document.getElementById("friendshipQuote").textContent = getFriendshipQuote(currentScore);
}

function getFriendshipQuote(score) {
    if (score === 10) {
        return "Un friendship en life-ku kidaicha azhagaana gift!\n" +
            "Eppovum ippadiye sirichu, sandhoshama,\nserndhu iruppom!";
    }
    if (score === 9) {
        return "Namma friendship-ku score thevai illa!\n" +
            "Un kooda irukkura ovvoru nimishamum\nspecial dhaan!";
    }
    if (score === 8) {
        return "8/10 super! Namma friendship innum\n" +
            "azhagaana memories create pannattum!\nEppovum friends-aa iruppom!";
    }
    return "Score eppadi irundhaalum, un friendship\n" +
        "romba special! Sirichu, sandhoshama,\nserndhu iruppom!";
}


// Back to themes

function goBack() {
    document.getElementById("quizPage").hidden = true;
    document.getElementById("scorePage").hidden = true;
    document.getElementById("greetingPage").hidden = true;
    document.getElementById("createQuizPage").hidden = true;
    document.getElementById("themePage").hidden = false;
    document.getElementById("quizPage").querySelector("h1").textContent = "💙 Doraemon Friends Quiz 💙";
    activeQuestions = questions;

    document.getElementById("letterContent").hidden = true;
    document.getElementById("createQuizBtn").hidden = true;
    document.getElementById("greetingPage").classList.remove("is-opening");
    const envelopeButton = document.getElementById("envelopeBtn");
    envelopeButton.disabled = false;
    envelopeButton.setAttribute("aria-expanded", "false");
    document.getElementById("giftHint").textContent = "Tap the gift to open your surprise!";

    currentQuestion = 0;
    currentScore = 0;
    answered = false;

    document.querySelector(".answers").hidden = false;
}

function showGreetingPage() {
    document.getElementById("scorePage").hidden = true;
    document.getElementById("greetingPage").hidden = false;
}

const friendQuizQuestionTemplates = [
    {
        question: "What is {name}'s favourite memory with us?",
        choices: ["Our first meeting", "A fun day out", "Celebrating together", "A special conversation"]
    },
    {
        question: "What does {name} enjoy doing with me most?",
        choices: ["Watching a movie", "Talking and laughing", "Playing a game", "Going for a walk"]
    },
    {
        question: "Which place would {name} choose for a fun day together?",
        choices: ["The beach", "A park", "A shopping trip", "A cosy movie night at home"]
    },
    {
        question: "What is {name}'s favourite snack to share?",
        choices: ["Popcorn", "Chocolate", "Ice cream", "Chips"]
    },
    {
        question: "What always makes {name} laugh?",
        choices: ["Silly jokes", "Funny stories", "Our shared memories", "Cute animal videos"]
    },
    {
        question: "Which song would {name} pick for us?",
        choices: ["A happy dance song", "A favourite movie song", "A relaxing song", "A song we both know"]
    },
    {
        question: "What does {name} like most about our friendship?",
        choices: ["We can trust each other", "We have fun together", "We help each other", "We share our thoughts"]
    },
    {
        question: "What would {name} choose for our next adventure?",
        choices: ["A picnic", "A day trip", "A game night", "Trying something new"]
    },
    {
        question: "Which game does {name} enjoy playing with me?",
        choices: ["A board game", "A quiz game", "A video game", "A word game"]
    },
    {
        question: "What would be a perfect friendship gift for {name}?",
        choices: ["A handmade card", "A favourite treat", "A photo of us", "A fun day together"]
    }
];

let activeFriendQuiz = [];
let friendQuizQuestionIndex = 0;
let friendQuizScore = 0;

function renderFriendQuizQuestions() {
    const friendName = document.getElementById("quizFriendName").value.trim() || "your friend";
    const container = document.getElementById("friendQuizQuestions");
    container.replaceChildren();

    friendQuizQuestionTemplates.forEach(function(template, questionIndex) {
        const card = document.createElement("section");
        card.className = "friend-question-card";

        const heading = document.createElement("h2");
        heading.textContent = "Question " + (questionIndex + 1);
        card.appendChild(heading);

        const questionLabel = document.createElement("label");
        questionLabel.textContent = "Question";
        const questionInput = document.createElement("textarea");
        questionInput.maxLength = 180;
        questionInput.rows = 2;
        questionInput.required = true;
        questionInput.dataset.question = "true";
        questionInput.value = template.question.replaceAll("{name}", friendName);
        questionLabel.appendChild(questionInput);
        card.appendChild(questionLabel);

        const choices = document.createElement("fieldset");
        choices.className = "friend-choices";
        const legend = document.createElement("legend");
        legend.textContent = "Choices — select the correct answer";
        choices.appendChild(legend);

        template.choices.forEach(function(choice, choiceIndex) {
            const row = document.createElement("div");
            row.className = "friend-choice-row";

            const radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "correctChoice" + questionIndex;
            radio.value = String(choiceIndex);
            radio.setAttribute("aria-label", "Question " + (questionIndex + 1) +
                ", choice " + (choiceIndex + 1) + " is correct");
            radio.required = choiceIndex === 0;

            const answerInput = document.createElement("input");
            answerInput.type = "text";
            answerInput.className = "friend-choice-input";
            answerInput.maxLength = 70;
            answerInput.placeholder = "Choice " + (choiceIndex + 1);
            answerInput.required = true;
            answerInput.value = choice;

            row.append(radio, answerInput);
            choices.appendChild(row);
        });

        card.appendChild(choices);
        container.appendChild(card);
    });
}

function generateFriendQuizQuestion() {
    renderFriendQuizQuestions();
    document.getElementById("quizShareStatus").textContent =
        "10 personalized questions are ready. Choose the correct answer for each question.";
}

function showCreateQuizPage() {
    document.getElementById("themePage").hidden = true;
    document.getElementById("namePage").hidden = true;
    document.getElementById("quizPage").hidden = true;
    document.getElementById("scorePage").hidden = true;
    document.getElementById("greetingPage").hidden = true;
    document.getElementById("createQuizPage").hidden = false;
    document.getElementById("quizBuilder").hidden = false;
    document.getElementById("friendChallenge").hidden = true;
}

function createFriendQuiz(event) {
    event.preventDefault();
    const form = document.getElementById("friendQuizForm");
    if (!form.reportValidity()) {
        return;
    }

    const creator = document.getElementById("quizCreatorName").value.trim();
    const friendName = document.getElementById("quizFriendName").value.trim();
    const status = document.getElementById("quizShareStatus");
    const quiz = Array.from(document.querySelectorAll(".friend-question-card")).map(function(card, index) {
        return {
            question: card.querySelector("[data-question]").value.trim(),
            choices: Array.from(card.querySelectorAll(".friend-choice-input")).map(function(input) {
                return input.value.trim();
            }),
            answer: Number(card.querySelector('input[name="correctChoice' + index + '"]:checked').value)
        };
    });
    const baseUrl = new URL(window.location.href);
    baseUrl.search = "";
    baseUrl.hash = "";
    baseUrl.searchParams.set("friendQuiz", "1");
    baseUrl.searchParams.set("from", creator);
    baseUrl.searchParams.set("for", friendName);
    baseUrl.searchParams.set("quiz", JSON.stringify(quiz));
    const shareUrl = baseUrl.href;
    document.getElementById("quizShareLink").value = shareUrl;
    document.getElementById("quizShareLinkPanel").hidden = false;
    document.getElementById("quizLinkHelp").textContent =
        baseUrl.protocol === "http:" || baseUrl.protocol === "https:"
            ? "Copy this link and send it to your friend."
            : "This is a local file link and only works on this computer. Publish the page online, then create the quiz again to get a shareable web link.";
    const shareText = creator + " made a friendship quiz for " + friendName + "!\n\n" +
        quiz.map(function(item, questionIndex) {
            return (questionIndex + 1) + ". " + item.question + "\n" +
                item.choices.map(function(option, index) {
                    return "   " + String.fromCharCode(65 + index) + ". " + option;
                }).join("\n");
        }).join("\n\n");

    if (baseUrl.protocol === "http:" || baseUrl.protocol === "https:") {
        shareFriendQuiz(shareText + "\n\nOpen your quiz: " + shareUrl, shareUrl, status);
        return;
    }

    shareFriendQuiz(
        shareText + "\n\nTo share an interactive quiz link, first publish this page online.",
        "",
        status
    );
}

async function copyFriendQuizLink() {
    const status = document.getElementById("quizShareStatus");
    const link = document.getElementById("quizShareLink").value;
    if (!link) {
        status.textContent = "Create your quiz first to get its link.";
        return;
    }

    if (!/^https?:$/.test(new URL(link).protocol)) {
        status.textContent = "This is only a local computer link. Publish the page online to get a link your friend can open.";
        return;
    }

    try {
        await navigator.clipboard.writeText(link);
        status.textContent = "Quiz link copied. Paste and send it to your friend!";
    } catch (error) {
        console.error("Could not copy the friend quiz link:", error);
        status.textContent = "Could not copy the link. Select it and copy it manually.";
    }
}

async function shareFriendQuiz(shareText, shareUrl, status) {
    try {
        if (navigator.share) {
            await navigator.share({
                title: "A friendship quiz for you",
                text: shareText,
                url: shareUrl || undefined
            });
            status.textContent = shareUrl
                ? "Quiz share options opened. Send the link to your friend!"
                : "Quiz shared. Publish this page online to create an interactive link.";
            return;
        }

        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(shareText);
        } else {
            const temporaryTextArea = document.createElement("textarea");
            temporaryTextArea.value = shareText;
            temporaryTextArea.setAttribute("readonly", "");
            temporaryTextArea.style.position = "fixed";
            temporaryTextArea.style.left = "-9999px";
            document.body.appendChild(temporaryTextArea);
            temporaryTextArea.select();
            const copied = document.execCommand("copy");
            temporaryTextArea.remove();
            if (!copied) {
                throw new Error("The browser did not allow copying the quiz.");
            }
        }
        status.textContent = shareUrl
            ? "Quiz link copied. Paste and send it to your friend!"
            : "Quiz text copied. Publish this page online to share an interactive quiz link.";
    } catch (error) {
        if (error.name === "AbortError") {
            status.textContent = "Sharing cancelled. Your quiz is still here to share.";
            return;
        }
        console.error("Could not share the friend quiz:", error);
        status.textContent = "Could not share the quiz. Please try copying it again.";
    }
}

function loadSharedFriendQuiz() {
    const params = new URLSearchParams(window.location.search);
    if (params.get("friendQuiz") !== "1") {
        return;
    }

    let quiz;
    try {
        if (params.has("quiz")) {
            quiz = JSON.parse(params.get("quiz"));
        } else {
            const choices = JSON.parse(params.get("choices") || "");
            quiz = [{
                question: params.get("question") || "",
                choices: choices,
                answer: Number(params.get("answer"))
            }];
        }
    } catch (error) {
        console.error("Shared quiz data is invalid:", error);
        return;
    }

    const creator = (params.get("from") || "Your friend").slice(0, 30);
    const friendName = (params.get("for") || "").slice(0, 30);
    if (!Array.isArray(quiz) || quiz.length !== 10 &&
        !(quiz.length === 1 && params.has("question")) ||
        quiz.some(function(item) {
            return !item || typeof item.question !== "string" || !item.question.trim() ||
                !Array.isArray(item.choices) || item.choices.length !== 4 ||
                item.choices.some(function(choice) {
                    return typeof choice !== "string" || !choice.trim();
                }) || !Number.isInteger(item.answer) || item.answer < 0 || item.answer > 3;
        })) {
        return;
    }

    pendingSharedQuiz = {
        creator: creator,
        friendName: friendName || "you",
        questions: quiz.map(function(item) {
            return {
                question: item.question,
                options: item.choices,
                answer: item.answer
            };
        })
    };
    const welcome = document.getElementById("sharedQuizWelcome");
    welcome.textContent = creator + " made a " + quiz.length +
        "-question friendship quiz" +
        (friendName ? " for " + friendName : "") +
        "! Choose a theme, enter your name, and start the quiz. 💌";
    welcome.hidden = false;
}

function showFriendQuizQuestion() {
    const question = activeFriendQuiz[friendQuizQuestionIndex];
    const questionElement = document.getElementById("friendChallengeQuestion");
    const choices = document.getElementById("friendChallengeChoices");
    const result = document.getElementById("friendChallengeResult");
    const nextButton = document.getElementById("friendChallengeNext");
    document.getElementById("friendChallengeProgress").textContent =
        "Question " + (friendQuizQuestionIndex + 1) + " of " + activeFriendQuiz.length;
    questionElement.textContent = question.question;
    questionElement.hidden = false;
    choices.hidden = false;
    choices.replaceChildren();
    result.textContent = "";
    nextButton.hidden = true;

    question.choices.forEach(function(option, index) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = option;
        button.addEventListener("click", function() {
            Array.from(choices.children).forEach(function(choiceButton, choiceIndex) {
                choiceButton.disabled = true;
                if (choiceIndex === question.answer) {
                    choiceButton.classList.add("is-correct");
                } else if (choiceIndex === index) {
                    choiceButton.classList.add("is-wrong");
                }
            });
            if (index === question.answer) {
                friendQuizScore++;
                result.textContent = "Correct! 🎉";
            } else {
                result.textContent = "Nice try! The correct answer is " +
                    question.choices[question.answer] + ". 💙";
            }
            nextButton.textContent = friendQuizQuestionIndex === activeFriendQuiz.length - 1
                ? "See your score ➜"
                : "Next question ➜";
            nextButton.hidden = false;
        });
        choices.appendChild(button);
    });
}

function nextFriendQuizQuestion() {
    friendQuizQuestionIndex++;
    if (friendQuizQuestionIndex >= activeFriendQuiz.length) {
        document.getElementById("friendChallengeProgress").textContent = "Quiz complete!";
        document.getElementById("friendChallengeQuestion").textContent =
            "You scored " + friendQuizScore + " out of " + activeFriendQuiz.length + "! 💙";
        document.getElementById("friendChallengeChoices").hidden = true;
        document.getElementById("friendChallengeResult").textContent =
            friendQuizScore === activeFriendQuiz.length
                ? "Amazing! You know your friend so well! 🌟"
                : "Thanks for playing! Friendship grows with every memory together. 💕";
        document.getElementById("friendChallengeNext").hidden = true;
        return;
    }
    showFriendQuizQuestion();
}


function openLetter() {
    const greetingPage = document.getElementById("greetingPage");
    const envelopeButton = document.getElementById("envelopeBtn");
    if (envelopeButton.disabled) {
        return;
    }

    envelopeButton.disabled = true;
    envelopeButton.setAttribute("aria-expanded", "true");
    greetingPage.classList.add("is-opening");
    document.getElementById("giftHint").textContent = "Opening your surprise...";

    window.setTimeout(function() {
        document.getElementById("letterContent").hidden = false;
        document.getElementById("giftHint").textContent = "A little friendship gift, just for you!";
        document.getElementById("createQuizBtn").hidden = false;
    }, 500);
}

document.getElementById("friendQuizForm").addEventListener("submit", createFriendQuiz);
document.getElementById("generateFriendQuestionBtn").addEventListener("click", generateFriendQuizQuestion);
document.getElementById("copyQuizLinkBtn").addEventListener("click", copyFriendQuizLink);
document.getElementById("friendChallengeNext").addEventListener("click", nextFriendQuizQuestion);
renderFriendQuizQuestions();
loadSharedFriendQuiz();

let number = 0;
let score = 0;
let noOfQuestions=dataStore.length;

/*Method for Starting the Quiz app*/
function startQuiz() {
	const isFeedBack = false;
	$('.quiz').hide();
	$('.js-start-quiz').on('click', function() {
		$('.quiz').show();
		$('.start').hide();
		renderQuiz(number);
	});
}

/*Method for rendering elements*/
function renderQuiz(number) {
	let question = displayQuestion(number);
	let choices = displayChoice(number);
	let display = prepareQuestionChoicesHTML(question, choices, number);
	$('.js-finalScore').hide();

	$('.js-question-list').html(display);
	$('.questionStatus').text(`${++number}/${noOfQuestions}`);
}

function displayQuestion(number) {
	return dataStore[number].question;
}

function displayChoice(number) {
	let choiceArray = [];
	choiceArray = dataStore[number].choices;
	let choices = prepareChoices(choiceArray);
	return choices;
}

/*Preparing list of choices*/
function prepareChoices(choiceArray) {
	let choiceList = choiceArray.map(
		choice => `<label for="${choice}" class="options"><input type="radio" id="${choice}" name="option" required value="${choice}"><span>${choice}</span>
  </label>`
	);
	//join("") => converts array elements to string
	let choicesList = choiceList.join('');
	return choicesList;
}

/*Appending question and choices */
function prepareQuestionChoicesHTML(question, choicesList, number) {
	let final = '';
	let questionNumber = number + 1;
	const display = `<fieldset><legend class="question">${questionNumber}). ${question}</legend><label id="chooseOption">Choose an option</label>`.concat(choicesList);
	final = display.concat(`</fieldset><input type="submit" role="button" class="button js-question-result" value="Check Answer"/>`);
	return final;
}

//Receive textual feedback about their answer. If they were incorrect, they should be told the correct answer.
function checkAnswer() {
	$('.js-form').on('submit', function(event) {
		event.preventDefault();
		$('.js-question-list').hide();
		const userSelection = $("input[name='option']:checked").val();
		let message = displayAnswer(userSelection);
		$('.js-result').html(message);
		$('.js-result').show();
	});
}

function displayAnswer(userSelection) {
	const image = `<img src=${dataStore[number]
		.img} class="image" alt="An image"/>`;
	const appendNextButton = `${image}<input type="button" class="button js-question" value="Next"/>`;
	let feedBackButton = `${image}<input type="button" class="button js-feedback" value="Get Final Score"/>`;
	let message = getMessage(userSelection, appendNextButton, feedBackButton);
	return message;
}

function getMessage(userSelection, appendNextButton, feedBackButton) {
	const successMessage = `<p class="feedback pass">Bingo!</p>`;
	const failureMessage = `<p class="feedback fail">Sorry, the correct answer is : ${dataStore[
		number
	].answer}</p>`;
	if (dataStore[number].answer === userSelection) {
		score += 1;
		message = number < 9
			? successMessage.concat(appendNextButton)
			: successMessage.concat(feedBackButton);
	} else {
		message = number < 9
			? failureMessage.concat(appendNextButton)
			: failureMessage.concat(feedBackButton);
	}
	$('.score').text(`${score}/${noOfQuestions}`);
	return message;
}

/*Display the next question*/
function displayNextQuestion() {
	$('.mainPage').on('click', '.js-question', function() {
		$('.js-question-list').show();
		number += 1;
		$('.js-result').toggle(); 
		$('.js-feedback').toggle();
		renderQuiz(number);
	});
}

/*Provide feedback to user*/
function displayFeedBack() {
	$('.mainPage').on('click', '.js-feedback', function() {
		let message = (score <= 7)? `${score} <p class="travelJunkie fail">Never Mind,Go pack your bags and explore the world!</span></p>`:`${score}<p class="travelJunkie pass">You did great! Can we assume you are a walking encyclopedia?</p></span>`;
		$('.js-result').hide();
		$('.js-finalScore').html(
			`<p class="finalResult">Your score is : ${message}<img src ="images/travel_junkie.png" class="image" alt = "Go explore the World!"/><input type="button" class= "button js-restart" value="Restart Quiz">`
		);
		$('.js-finalScore').show();
	});
}

/*Restart the quiz when user presses Restart Quiz button*/
function restartQuiz() {
	$('.mainPage').on('click', '.js-restart', function() {
		resetDefaultValues();
		renderQuiz(number);
	});
}

function resetDefaultValues() {
	number = 0;
	score = 0;
	$('.questionStatus').text(`${number}/${noOfQuestions}`);
	$('.score').text(`${score}/${noOfQuestions}`);
	$('.js-finalScore').hide();
	$('.js-question-list').show();
	$('.quiz').show();
	$('.start').hide();
}

function worldQuiz() {
	startQuiz();
	checkAnswer();
	displayNextQuestion();
	displayFeedBack();
	restartQuiz();
}

$(worldQuiz);

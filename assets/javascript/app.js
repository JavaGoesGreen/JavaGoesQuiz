/* 
GAME STRUCTURE:
===============
01. The game starts when the player hits the START button.
02. Once the game starts the is a clock countdown.
03. The time given is the total time to finish the whole game.
04. The game ends if the time runs out, Game Over.
05. The player can only guess one answer per question.
06. Include the timer so the player can see it.
07. All the questions are displayed at once.
08. There is a DONE button at the end, if the user is finished before the timer stops.
*/

//IMPORTANT!
$(document).ready(function(){

// GLOBAL VARIABLES
// ================

	//Define all global variables and objects
	var currentQuestion; 
	var correctAnswer; 
	var incorrectAnswer; 
	var unanswered; 
	var seconds; 
	var time; 
	var answered; 
	var userSelect;
	var messages = {
		correct: "Repuesta correcta, ¡choca esos cinco!",
		incorrect: "Has fallado, lechón... pero no llores ¡y a por la siguiente!",
		endTime: "¡Se te ha acabado el tiempo! ¿No has aprendido nada de gestión del tiempo en Softskills?",
		finished: "FIN <br> ¿Cómo te habrá ido?"
	};

	//All questions inside an array of objects
	var triviaQuestionsVerdes = [
		{	question: "Cuantos gramos de cO2 genera por segundo una simple busqueda por internet??",
			answerList: [	"0,02",
						"0,10",
						"0,0000001",
						"5",
						"Ninguna de las anteriores"],
			answer: 0,
			image: "assets/images/giphy (3).gif",
			answerText: "Una simple búsqueda en Internet genera 0,02 gramos de CO2 por segundo."
		},

		{	question: "Cuantas toneladas de objetos tecnologicos son desechados en el mundo cada?",
			answerList: [	"20 a 100",
						"20 a 50",
						"1 a 100",
						"5 a 6",
						"100 a 1000"],
			answer: 1,
			image: "assets/images/giphy (3).gif",
			answerText: " En la actualidad alrededor de 20 a 50 toneladas de objetos tecnológicos son desechados en el mundo cada año y solamente el 12.5% del e-waste es reciclado."
		},

		{	question: "Las tecnologias verdes, tambien denominadas como?",
			answerList: [	"A - Tecnologías pink",
						"B - Tecnologías basuras",
						"C - Tecnologías ecológicas",
						"D - Tecnologías no contaminantes",
						"C y D son correctas"],
			answer: 4,
			image: "assets/images/giphy (3).gif",
			answerText: "Las tecnologías verdes, también denominadas tecnologías no contaminantes o ecológicas."
		},

		{	question: "El origen de la tecnología verde comenzo sobre los años?",
			answerList: [	"20",
						"60",
						"90",
						"50",
						"20 a.c"],
			answer: 1,
			image: "assets/images/Q4_Jenna.gif",
			answerText: "Como parte del emprendimiento social y de las tendencias globales más marcadas, encontramos el concepto “Tecnologías Verdes” que tiene su origen en el “Movimiento verde” mundial de los años 60’s"
		},

		{	question: "Hoy en día la tecnología verde se está desarrollando en todo el contiente de?",
			answerList: [	"Latinoamerica y Europa",
						"Asia",
						"Norteamérica",
						"Africa.",
						"Argentina"],
			answer: 0,
			image: "assets/images/Q5_NBC.jpg",
			answerText: "Hoy en día la tecnología verde se está desarrollando en toda Latinoamérica y en el continente Europeo"
		},

		{	question: "Cuales son los beneficios de la tecnologia verde?",
			answerList: [	"Ayuda a revertir daños",
						"Vestirte de verde",
						"Cabello verde",
						"Reducir",
						"Calentamiento global"],
			answer: 0,
			image: "assets/images/Q6_Liz.gif",
			answerText: "Ayuda a revertir los daños causados por el mal empleo de los recursos naturales por parte de hombre"
		},

		{	question: "Indica ejemplo de tecnología verde",
			answerList: [	"Plantas",
						"Compost",
						"Lapiz verde",
						"Nuevas Ideas Solares",
						"Donald Trump"],
			answer: 3,
			image: "assets/images/Q7_Grizz.gif",
			answerText: "La utilización de módulos fotovoltáicos y colectores térmicos para la recolección de energía del solar en forma de fotones, ya es bastante famoso."
		},		

		{	question: "¿Qué es Sustentabilidad??",
			answerList: [ "Un proceso",
						"Una moda",
						"Un baile",
						"Un estilo de vida",
						"Un conjunto de acciones"],
			answer: 0,
			image: "assets/images/Q8_OrangeKids.jpg",
			answerText: "La sustentabilidad es en realidad “un proceso” que tiene por objetivo encontrar el equilibrio entre el medio ambiente y el uso de los recursos"
		},		

		{	question: "Señala una afirmacion de sustentabilidad?",
			answerList: [	"Hot dogs",
						"Es de color verde",
						"Es organica",
						"Piensa en grande",
						"Es amigable tanto como para tu empresa como para el planeta"],
			answer: 4,
			image: "assets/images/Q9_Food.gif",
			answerText: "In the show's pilot, Liz is attempting to buy a hot dog before work. A fellow commuter tries to jump the line, then Liz buys $150 worth of hot dogs to make a point."
		},		

		{	question: "Ventajas de ser una empresa sustentable?",
			answerList: [	"Dañan al medio ambiente",
						"favorecen la supervivencia del negocio ",
						"Te tratan como Hulk",
						"recilas tus lagrimas",
						"Ninguna de las anteriores"],
			answer: 1,
			image: "assets/images/Q10_MikeDexter.gif",
			answerText: "Facilidades que favorecen la supervivencia del negocio mediante la administración responsable de los recursos naturales."
		},		

	];
	var triviaQuestionsGeneral = [
			{	question: "¿Cuál es el nombre del río más largo del mundo?",
			answerList: [	"Río Nilo",
						"Río Amazonas",
						"Río Danubio",
						"Río Sena",
						"Río Tajo"],
			answer: 1,
			image: "https://3.bp.blogspot.com/-5unHNmktRa0/VuSWxPrTqxI/AAAAAAAABgM/I4tkVb5N5c8sw7zqhuFVwaRQ94KIhp93Q/s1600/Cascadas-Rio-67839.gif",
			answerText: "Obviamente es el Amazonas"
		},

			{	question: " ¿Cuál es el océano más grande del mundo?",
			answerList: [	"Océano Pacífico",
						"Océano Artico",
						"Océano Índico",
						"Océano Antártico",
						"Océano Atlántico"],
			answer: 0,
			image: "https://www.elagoradiario.com/wp-content/uploads/2020/06/giphy.gif",
			answerText: "Obviamente es el Pacífico"
		},
		{	question: "¿Cuál es el país más grande del mundo?",
			answerList: [	"India",
						"Canadá",
						"El Vaticano",
						"China",
						"Rusia"],
			answer: 4,
			image: "https://i.pinimg.com/originals/30/56/cd/3056cd0f750e19a01c0803b15d471c12.gif",
			answerText: "El Papa lo aprueba"
		},
		{	question: "¿Cuál es el país que tiene forma de bota?",
			answerList: [	"España",
						"Italia",
						"Honduras",
						"El Vaticano",
						"Noruega"],
			answer: 1,
			image: "http://www.gisandbeers.com/wp-content/uploads/2019/03/PangeaDEM-timelapse.gif",
			answerText: "Antes todos los países juntos parecían una bota, ¿verdad?"
		},

		{	question: "¿Cuál es el país más poblado de la tierra?",
			answerList: [	"Estados Unidos",
						"Rusia",
						"Lituania",
						"China",
						"El Vaticano"],
			answer: 3,
			image: "https://media1.tenor.com/images/c252263e1de05acaef9651da37def390/tenor.gif?itemid=11194694",
			answerText: "¿Están diciendu 'Buu' o 'Buu.. ena respuesta'?"
		},
		{	question: "¿Cuál es la ciudad de los rascacielos?",
			answerList: [	"Hong Kong",
						"Tokio",
						"Ciudad del Vaticano",
						"Madriz",
						"New York"],
			answer: 4,
			image: "http://4.bp.blogspot.com/-cpm73OS0J-k/Ujx5DJA0h5I/AAAAAAABHWY/zuz8RfTGA04/s1600/El+Empire+State+de+NYC.gif",
			answerText: "No sé qué poner"
		},

		{	question: "¿En qué país se encuentra ubicada la Casa Rosada?",
			answerList: [	"Argentina",
						"Chile",
						"Mexico",
						"España",
						"Francia"],
			answer: 0,
			image: "https://i.pinimg.com/originals/82/8a/e7/828ae70ba58437e063744f20ab93f624.gif",
			answerText: "Casa (de la pantera) Rosada"
		},

		{	question: "¿Cuál es el primer elemento de la Tabla periódica?",
			answerList: [	"Helio",
						" Argón",
						"Hidrógeno",
						"Radón",
						"Wolframio"],
			answer: 2,
			image: "https://agwavsrealidad.files.wordpress.com/2018/05/source.gif?w=349&h=196",
			answerText: "Elemental, querido Watson."
		},		

		{	question: "¿Cuál es el ave voladora más grande del mundo?",
			answerList: [	"Buitre",
						"Periquito",
						"Halcón",
						"Condor Andino",
						"Águila real"],
			answer: 3,
			image: "https://media3.giphy.com/media/3o6MbkKMdyg03uo78Q/source.gif",
			answerText: "El ave voladora más grande del mundo en la actualidad es el condor andino."
		},		

		{	question: "¿En qué año murió Kurt Cobain?",
			answerList: [	"1996",
						"1994",
						"1998",
						"2021",
						"2000"],
			answer: 1,
			image: "http://cdn.mediotiempo.com/uploads/media/2019/02/20/un-dia-como-hoy-de.gif",
			answerText: "¿Estás seguro de que murió? Mira detrás de ti."
		}	

	];

// FUNCTIONS
// =========

	//This hides the game area on page load
	$("#gameCol").hide();
	
	//This captures user click on start button to create a new game
	$("#startBtn").on("click", function(){
		$("#start").hide();
		newGame();
	});

	//This function sets up the page for a new game emptying all areas and showing game area
	function newGame(){
		$("#gameCol").show();
		$("#finalMessage").empty();
		$("#correctAnswers").empty();
		$("#incorrectAnswers").empty();
		$("#unanswered").empty();
		$("#gif").hide();
		$("#gifCaption").hide();
		correctAnswer = 0;
		incorrectAnswer = 0;
		unanswered = 0;
		console.log((document.getElementById("categoria").value));
		if ((document.getElementById("categoria").value) == "verde"){
			triviaQuestions = triviaQuestionsVerdes;
		} else if ((document.getElementById("categoria").value) == "general") {
			triviaQuestions = triviaQuestionsGeneral;
		} else {
			triviaQuestions = triviaQuestionsGeneral.concat(triviaQuestionsVerdes);
		}
		newQuestion();
	}

	//This function displays the next question
	function newQuestion(){
		$("#message").empty();
		$("#correctedAnswer").empty();
		$("#gif").hide();
		$("#gifCaption").hide();
		answered = true;
		
		//This function displays the new question
		if(currentQuestion){triviaQuestions.splice(currentQuestion-1, 1);}
		currentQuestion = Math.round(Math.random()*(triviaQuestions.length-1));
		console.log(triviaQuestions);
		$("#currentQuestion").html("Pregunta " + ((parseInt(correctAnswer)+parseInt(incorrectAnswer)+parseInt(unanswered))+1) + " de " +  ((document.getElementById("limite").value)));
		$(".question").html(triviaQuestions[currentQuestion].question);

		//This function displays the new questions's answer options in multiple choice type
		for(var i = 0; i <= 5; i++){

			var choices = $("<div>");
			choices.text(triviaQuestions[currentQuestion].answerList[i]);
			choices.attr({"data-index": i });
			choices.addClass("thisChoice");
			$(".answerList").append(choices);
		}

		//This sets the timer
		countdown();

		//When user clicks on n answer this will pause the time and display the correct answer to the question 
		$(".thisChoice").on("click",function(){
				userSelect = $(this).data("index");
				clearInterval(time);
				answerPage();
			});
		}

	//This function is for the timer countdown
	function countdown(){
		seconds = 15;
		$("#timeLeft").html("00:" + seconds);
		answered = true;
		//Sets a delay of one second before the timer starts
		time = setInterval(showCountdown, 1000);
	}

	//This function displays the countdown
	function showCountdown(){
		seconds--;

		if(seconds < 10) {
			$("#timeLeft").html("00:0" + seconds);	
		} else {
			$("#timeLeft").html("00:" + seconds);	
		}
		
		if(seconds < 1){
			clearInterval(time);
			answered = false;
			answerPage();
		}
	}

	//This function takes the user to the answer page after the user selects an answer or timer runs out
	function answerPage(){
		$("#currentQuestion").empty();
		$(".thisChoice").empty(); //Clears question page
		$(".question").empty();
		$("#gif").show();
		$("#gifCaption").show();

		var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
		var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

		//This adds the gif that corresponds to this quesiton
		var gifImageLink = triviaQuestions[currentQuestion].image;
		var newGif = $("<img>");
		newGif.attr("src", gifImageLink);
		newGif.addClass("gifImg");
		$("#gif").html(newGif);

		//STILL TO DO
		//This adds a line of text below the gif that talks about why the answer is correct.
		var gifCaption = triviaQuestions[currentQuestion].answerText;
			newCaption = $("<div>");
			newCaption.html(gifCaption);
			newCaption.addClass("gifCaption");
			$("#gifCaption").html(newCaption);
		
		//This checks to see if user choice is correct, incorrect, or unanswered
		if((userSelect == rightAnswerIndex) && (answered === true)){
			correctAnswer++;
			$('#message').html(messages.correct);
		} else if((userSelect != rightAnswerIndex) && (answered === true)){
			incorrectAnswer++;
			$('#message').html(messages.incorrect);
			$('#correctedAnswer').html('La respuesta correcta era: ' + rightAnswerText);
		} else{
			unanswered++;
			$('#message').html(messages.endTime);
			$('#correctedAnswer').html('La respuesta correcta era: ' + rightAnswerText);
			answered = true;
		}
		
		// Limitar el número de preguntas con la variable limitePreguntas
		if((parseInt(correctAnswer)+parseInt(incorrectAnswer)+parseInt(unanswered)) == ((document.getElementById("limite").value))){
			setTimeout(scoreboard, 6000);
		} else{
			currentQuestion++;
			setTimeout(newQuestion, 6000);
		}	
	}

	//This fucntion displays all the game stats
	function scoreboard(){
		$('#timeLeft').empty();
		$('#message').empty();
		$('#correctedAnswer').empty();
		$('#gif').hide();
		$("#gifCaption").hide();

		$('#finalMessage').html(messages.finished);
		$('#totalQuestions').html("Total questions: "+(parseInt(correctAnswer)+parseInt(incorrectAnswer)+parseInt(unanswered)));
		$('#correctAnswers').html("Correct Answers: " + correctAnswer);
		$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
		$('#unanswered').html("Unanswered: " + unanswered);
		$('#startOverBtn').addClass('reset');
		$('#startOverBtn').show();
		$('#startOverBtn').html("PLAY AGAIN");
	}

// MAIN PROCESS
//=============

}); //IMPORTANT!
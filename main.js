$(function(){
	// INITIAL VARIABLES
	// Issues with media in smart-phones
	var buzzer = new Audio("buzzer.mp3"),
		// Let's keep the counts in seconds.
		count = parseInt($("#timeNum").html())*60,
		count2 = parseInt($("#breakNum").html())*60,
		counter, counter2;

	// SESSION TIMER
	// - Button
	$("#deductFive").click(function(){
		// Minimum of 5 minutes - 300 seconds.
		if(count>300){
			// Keep the track from the original in minutes.
			count= parseInt($("#timeNum").html());
			count-=5;
			$("#timeNum").html(count);
			// Stick at seconds
			count*=60;
			// Display the countdown using the mm:ss format.
			minFormat(count, "#countDown1");
		}
		//PreventDefault to avoid jumps to the top - kinda reloading.
		event.preventDefault();
	});
	// + Button
	$("#addFive").click(function(){
		count= parseInt($("#timeNum").html());
		count+=5;
		$("#timeNum").html(count);
		count*=60;
		minFormat(count, "#countDown1");
		event.preventDefault();
	});

	// BREAK TIMER
	// - Button
	$("#deductFiveBreak").click(function(){
		if(count2>300){
			count2= parseInt($("#breakNum").html());
			count2-=5;
			$("#breakNum").html(count2);
			count2*=60;
			minFormat(count2, "#countDown2");
		}
		event.preventDefault();
	});
	// + Button
	$("#addFiveBreak").click(function(){
		count2= parseInt($("#breakNum").html());
		count2+=5;
		$("#breakNum").html(count2);
		count2*=60;
		minFormat(count2, "#countDown2");
		event.preventDefault();
	});


	// START THE POMODORO
	$("#start").click(function(){
		// Disable buttons for the session when it's counting down.
		$("#deductFive, #addFive").prop('disabled', true);
		// Hide/show buttons
		$("#start, #break, #countDown2").hide();
		$("#pause").show();
		// Make bigger fonts
		$("#countDown1").css("font-size","90px");
		// Start firs counter to run every second. Check timer function!
		counter = setInterval(timer, 1000);
		event.preventDefault();
	});

	
	// TIMER FUNCTION
	function timer(){
		// keep tracking every second (1000 ms).
		count -=1;
		// When the countdown reaches zero, play the buzzer and stop the counter.
		if (count===0) {
			buzzer.play();
			clearInterval(counter);
			// Time to start the second counter.
			counter2 = setInterval(breakTimer, 1000);
		}
		// Keep displaying the track.
		$("#countDown1").html(count);
		// Always same format.
		minFormat(count, "#countDown1");
		
	}

	// BREAK TIMER FUNCTION
	function breakTimer(){
		// When the break time starts, display only the break timer.
		$("#break, #countDown2").show();
		$("#session, #countDown1").hide();
		// counter1 is gonna be hidden but this new size will show up later.
		$("#countDown1").css("font-size","30px");
		$("#countDown2").css("font-size","90px");
		// Every second, 1 second less for the count2. Keep tracking it!
		count2-=1;
		if(count2===0){
			// Same than Timer Function
			clearInterval(counter2);
			buzzer.play();
			// Time to leave how everything was at the beginning.
			$("#countDown2").css("font-size","30px");
			setTimeout(reset,1000);
			// We could reload the page like below but we want to keep the last settings.
			// setTimeout(location.reload.bind(location), 1000);
		}
		$("#countDown2").html(count2);
		minFormat(count2, "#countDown2");
	}
	
	// RESET FUNCTION
	function reset(){
		count = parseInt($("#timeNum").html())*60;
		count2 = parseInt($("#breakNum").html())*60;
		minFormat(count, "#countDown1");
		minFormat(count2, "#countDown2");
		$("button").prop('disabled', false);
		$("#pause").hide();
		$("#start, #session, #countDown1").show();
	}

	// TIME FORMAT
	// mm:ss
	function minFormat(count, countDown){
		if(count%60 >= 10){
			$(countDown).html(Math.floor(count/60) + ":" + count%60);
		} else{
			$(countDown).html(Math.floor(count/60) + ":0" + count%60);
		}
	}

	// PAUSE/PLAY THE POMODORO
	// Tic when the counter is running.
	// Tac when the counter2 is running.
	var tic = true;
	var tac = true;
	$("#pause").click(function() {
		if(count>0){
			if(tic){
				clearInterval(counter);
				$("button").prop('disabled', false);
				tic = false;
			} else{
				counter = setInterval(timer, 1000);
				$("#deductFive, #addFive").prop('disabled', true);
				tic = true;
			}
		} else{
			if(tac){
				clearInterval(counter2);
				tac = false;
			} else{
				counter2 = setInterval(breakTimer, 1000);
				tac = true;
			}
		}
		event.preventDefault();
	});

})
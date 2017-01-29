$(document).ready(function(){
		var started = false;
		var counter = '';
		var startBreak = '';
		var timesup = $('#timesup')[0];

		$('.remainingTime').html($('#worktime')[0].innerText + ' Minutes');

		$('#breakminus').on('click',function(){
			var breaktime = $('#breaktime')[0].innerText;
			if (breaktime > 1) breaktime--;
			$('#breaktime').html(breaktime);
		});

		$('#breakplus').on('click',function(){
			var breaktime = $('#breaktime')[0].innerText;
			breaktime++;
			$('#breaktime').html(breaktime);
		});

		$('#workminus').on('click',function(){
			var worktime = $('#worktime')[0].innerText;
			if (worktime > 1) worktime--;
			$('#worktime').html(worktime);
			$('.remainingTime').html(worktime+ ' Minutes');
		});
		
		$('#workplus').on('click',function(){
			var worktime = $('#worktime')[0].innerText;
			worktime++;
			$('#worktime').html(worktime);
			$('.remainingTime').html(worktime+' Minutes');
		});

		$('.clockOuter').on('click', function(){

			if (started == false) {
				started = true;
				worktime = parseInt($('#worktime').html() * 60);
				breaktime = parseInt($('#breaktime').html() * 60);
				counter = setInterval(workTimer, 1000);

			function workTimer(){

				$('.clockOuter').removeClass('spinner-2');
				$('.clockOuter').addClass('spinner-1');
				$('.currentMode').html('Work');
				$('#breakminus, #breakplus, #workminus,#workplus').hide();
				$('.clockOuter').css('border','2px #329F5B dashed');
				worktime -= 1;
				minute = parseInt(worktime / 60 );
				second = worktime % 60 > 9 ? parseInt(worktime % 60) :'0'+ (worktime % 60)
				$('.remainingTime').html(  minute + ':'+ second );
				if (worktime === 0){
					timesup.load();
					timesup.play();
					clearInterval(counter);
					startBreak = setInterval(breakTimer, 1000);	
					worktime = parseInt($('#worktime').html() * 60);
					breaktime = parseInt($('#breaktime').html() * 60);
				}
				function breakTimer(){	
					$('.clockOuter').removeClass('spinner-1');
					$('.clockOuter').addClass('spinner-2');
					$('.currentMode').html('Break');
					$('.clockOuter').css('border','2px #80aaff dashed')
					
					breaktime -=1;
					minute = parseInt(breaktime/60);
					second = breaktime % 60 > 9 ? parseInt(breaktime % 60) :'0'+ (breaktime % 60);
				$('.remainingTime').html(  minute + ':'+ second );
					if(breaktime === 0){
						timesup.load();
						timesup.play();
						clearInterval(startBreak);
						counter = null;
						counter = setInterval(workTimer, 1000);
						worktime = parseInt($('#worktime').html() * 60);
						breaktime = parseInt($('#breaktime').html() * 60);
					}
				}
			}} else {
					started = false;
					clearInterval(counter);
					counter = null;
					clearInterval(startBreak);
					startBreak = null;
					$('.clockOuter').removeClass('spinner-2');
					$('.clockOuter').removeClass('spinner-1');
					$('#breakminus, #breakplus, #workminus,#workplus').show();
					$('.currentMode').html('Start');
					$('.remainingTime').html($('#worktime')[0].innerText + ' Minute(s)');

			}
		} //click done

		)
	})
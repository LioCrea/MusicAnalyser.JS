	var audio = new Audio();
	audio.src = 'Tobu - Mesmerize [NCS Release].mp3';
	audio.controls = true;
	audio.loop = false;
	audio.autoplay = true;
	audio.sound = '0';
	audio.playbackRate = 1; // has to be < 4!
	var canvas1, ctx1, canvas2, ctx2, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;
	
	
	var waveform = []; // tableau des frequences
	var k=0; // index des frequences
	
	window.addEventListener("load", initMp3Player, false);
	
		function initMp3Player(){
			document.getElementById('audio_box').appendChild(audio);
			context = new AudioContext(); 
			analyser = context.createAnalyser();
			canvas1 = document.getElementById('analyser_render');
			ctx1 = canvas1.getContext('2d');
			
			source = context.createMediaElementSource(audio); 
			source.connect(analyser);
			analyser.connect(context.destination);
			frameLooper();
			}
			
		function frameLooper(){
			window.requestAnimationFrame(frameLooper);
			fbc_array = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(fbc_array);
			ctx1.clearRect(0, 0, canvas1.width, canvas1.height); // Clear the canvas
			ctx1.fillStyle = 'white'; // Color of the bars		

			var total = 0;
			for (var i = 0; i < fbc_array.length; i++) {
				total += fbc_array[i] << 0;
			}
	
				bars = 100;
				for (var i = 0; i < bars; i++) {
					bar_x = i*3;
					bar_width = 2;
					bar_height = -(fbc_array[i] / 2);
						if(-bar_height>100){
							drawLinearGradientTarget();
						}else{
							drawLinearGradientNotTarget(); // ctx1.fillStyle = 'white'; 
						}
					ctx1.fillRect(bar_x, canvas1.height, bar_width, bar_height);
				}
		}
		
		function drawLinearGradientTarget(){
			var linGrad,
			linGrad	= ctx1.createLinearGradient(0,0,0,150);
			linGrad.addColorStop(0, '#e74c3c');
			linGrad.addColorStop(1, '#fff');
			ctx1.fillStyle= linGrad;
		}
		function drawLinearGradientNotTarget(){
			var linGrad,
			linGrad	= ctx1.createLinearGradient(0,0,0,150);
			linGrad.addColorStop(0.25, '#34495e');
			linGrad.addColorStop(1, '#fff');
			ctx1.fillStyle= linGrad;
		}		

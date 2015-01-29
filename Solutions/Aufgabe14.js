$(document).ready(function() {
	//Versteckt das 2.und 3. div
	var divs = $('body > div'),
		ran = 0,
		remaining = 0,
		pulse,
		trials = 0,
		passed = 0;
	
	//Click auf Startbutton festlegen
	$('#startbutton').click(startGame);
	
	//Click auf Endbutton festlegen
	$('#endbutton').click(function() {
		showDiv(0);//Start-Div anzeigen
		$('#guess').children().each(function(i,v) { if(i) $(v).remove(); }); //Alle bis auf 1. Element entfernen
	}).click(); //Click gleich ausführen - Wollen diese Anzeige am Anfang!
	
	$('#guess').change(function() {
		if($(this).val() * 1 === ran) //Falls richtig geraten wurde
			endGame(true); //Beenden (Sieg!)
		else { //Ansonsten
			$(this)[0].selectedIndex = 0; //Index zurücksetzen
			setTrials(trials + 1); //Anzahl der Versuche erhöhen
		}
	});
	
	function setTrials(n) {
		trials = n; //Neu setzen
		$('#trials').html('<strong>' + n + '</strong>. Versuch'); //Ausgeben
	}
	
	function setTime(n) {
		remaining = n; //Neu setzen
		$('#remaining').html('Noch <strong>' + n + '</strong> Sekunden');	//Ausgeben
	}

	function showDiv(index) {
		divs.each(function(i,v) { //Durch alle divs gehen
			if(i !== index)  //Und wenn i ungleich dem übergebenen Index ist
				$(v).hide();//Verstecken
			else
				$(v).show();//ansonsten zeigen
		});
	}
	
	function startGame() {
		showDiv(1);//2. Div anzeigen
		
		var min = $('#min').val() * 1, //Minimum und Maximum auslesen
			max = $('#max').val() * 1;
		
		passed = 0; //Alle Werte (zurück-)setzen
		setTrials(1);
		setTime($('#zeit').val() * 1);
		ran = Math.floor(Math.random() * (max - min) + min);//Zufallszahl setzen
		
		pulse = setInterval(function() { //Pulse-Setzen mit Methode:
			remaining--;
			passed++;
			
			if(remaining) //Wenn noch Zeit übrig ist
				setTime(remaining); //Zeit neu setzen
			else
				endGame(false); //Sonst mit Niederlage beenden
		}, 1000); //Immer im Sekundentakt pulsen
		
		for(var i = min; i <= max; i++) { //Hier fügen wie Optionen zur Select-Box hinzu
			$('<option/>').text(i).appendTo('#guess');
		}
	}
	
	function endGame(victory) { //Spiel wird beendet mit Sieg oder Niederlage
		showDiv(2);
		clearInterval(pulse);
		
		if(victory) //Entsprechende Ausgabe
			$('#ergebnis').text('Sie haben gewonnen! Sie haben dies mit ' + trials + ' Versuchen und in ' + passed + ' Sekunden erreicht.');
		else
			$('#ergebnis').text('Sie haben leider verloren. Sie haben es ' + trials + ' mal versucht.');
	}
});
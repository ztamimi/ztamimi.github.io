window.onload = function() {
  
	var plusBtn = document.getElementById("plusBtn");
	var minusBtn = document.getElementById("minusBtn");
	var muteBtn = document.getElementById("muteBtn");
	var volumeHdn = document.getElementById("volumeHidden");

	var volChangeEvt = new Event('volChangeEvt');

	volumeHdn.value = 100;
	
	enableBtns();

	plusBtn.addEventListener("click", increaseVol, false);
	minusBtn.addEventListener("click", decreaseVol, false);
	volumeHdn.addEventListener("volChangeEvt", volChange, false);
	
	function increaseVol() {
		console.log("increase volume");
		if (volumeHdn.value < 100) 
			volumeHdn.value = parseInt(volumeHdn.value) + 1;

		volumeHdn.dispatchEvent(volChangeEvt);
		enableBtns();		
	}

	function decreaseVol() {
		console.log("decrease volume");
		if (volumeHdn.value > 0) 
			volumeHdn.value -= 1;
		
		volumeHdn.dispatchEvent(volChangeEvt);
		enableBtns();	
	}
	
	function enableBtns() {
		if (volumeHdn.value <= 0) 
			minusBtn.disabled = true;
		else
			minusBtn.disabled = false;
		
		if (volumeHdn.value >= 100) 
			plusBtn.disabled = true;
		else
			plusBtn.disabled = false;		
	}

    //////////////////////////////////////////////////////////
    
    var peer = new Peer({key: 'kedqlhnjgzknjyvi'});

    var connection = null;

    peer.on('open', function(id) {
        console.log('My peer ID is: ' + id);
        document.getElementById('myIdTxt').value = id;
    });
    
    peer.on('connection', connect);

    function connect(conn) {
        document.getElementById('otherIdTxt').value = conn.peer;
        document.getElementById('otherIdTxt').disabled = true;
        connection = conn;
    
    
    connection.on('open', function() {
        connection.on('data', function(data) {
            console.log("other: " + data);
	    volumeHdn.value = data;
	    enableBtns();
        });   
    });
    
    };
        
    function volChange() {
        console.log("you: " + volumeHdn.value);
	if (connection)
            connection.send(volumeHdn.value);
    };

    document.getElementById('connectBtn').addEventListener("click", function() {
        var otherId = document.getElementById('otherIdTxt').value;
        if (!otherId) {
            //console.log('provide other peer id');
        }
        else {
            connection = peer.connect(otherId);
            connect(connection);
        }
    });
};


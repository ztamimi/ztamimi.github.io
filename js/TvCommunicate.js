window.onload = function() {

	var videoCtrl = document.getElementById("videoCtrl");
	
	videoCtrl.addEventListener("volumechange", volChange, false);
	  
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
            document.getElementById('videoCtrl').volume = data/100.0;
        });   
    });
    
    };
        
    function volChange() {
	console.log("volume has changed: " + videoCtrl.volume);
	if (connection)
            connection.send(parseInt(videoCtrl.volume * 100.0));
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


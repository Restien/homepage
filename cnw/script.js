//elements
var xp = document.getElementById("xp"); 
var health = document.getElementById("health");
var defense = document.getElementById("defense");
var attack = document.getElementById("attack");
var strength = document.getElementById("strength");
var dexterity = document.getElementById("dexterity");
var intelligence = document.getElementById("intelligence");
var perception = document.getElementById("perception");
var charisma = document.getElementById("charisma");

var cname = document.getElementById("cname");
var race = document.getElementById("race");
var alignment = document.getElementById("alignment");

var spab = document.getElementById("spab");
var inv = document.getElementById("inv");
var other = document.getElementById("other");

//previous values
var php = 10;
var pdef = 0;
var patt = 0;
var pstr = 0;
var pdex = 0;
var pint = 0;
var pcha = 0;
var pper = 0;

health.addEventListener("change", function() {
    changed(php, health.value, 1);
});
defense.addEventListener("change", function() {
    changed(pdef, defense.value, 4);
});
attack.addEventListener("change", function() {
    changed(patt, attack.value, 4);
});
strength.addEventListener("change", function() {
    changed(pstr, strength.value, 2);
});
dexterity.addEventListener("change", function() {
    changed(pdex, dexterity.value, 2);
});
intelligence.addEventListener("change", function() {
    changed(pint, intelligence.value, 2);
});
perception.addEventListener("change", function() {
    changed(pper, perception.value, 2);
});
charisma.addEventListener("change", function() {
    changed(pcha, charisma.value, 2);
});

function save()
{
	php = parseInt(health.value);
    pdef = parseInt(defense.value);
    patt = parseInt(attack.value);
    pstr = parseInt(strength.value);
    pdex = parseInt(dexterity.value);
    pint = parseInt(intelligence.value);
    pper = parseInt(perception.value);
    pcha = parseInt(charisma.value);
}

function changed(oldv, newv, changeval) {
	var pnew = parseInt(newv);
	var pold = parseInt(oldv);
	var pchange = parseInt(changeval);
	
	//console.log(pnew + " " + pold + " " + ((pold-pnew)*pchange));
	xp.value = parseInt(xp.value)+((pold-pnew)*pchange);
	save();
}

let saveFile = () => {
			
			spabt = spab.value.replace(/(\r\n|\n|\r)/gm, "");
			invt = inv.value.replace(/(\r\n|\n|\r)/gm, "");
			othert = other.value.replace(/(\r\n|\n|\r)/gm, "");

			
            // This variable stores all the data.
            let data = "\r" + cname.value + "\r\n" + race.value + "\r\n" + alignment.value + "\r\n" + xp.value + "\r\n" + health.value + "\r\n" + defense.value + "\r\n" + attack.value + 
			"\r\n" + strength.value + "\r\n" + dexterity.value + "\r\n" + intelligence.value + "\r\n" + perception.value + "\r\n" + charisma.value + 
			"\r\n" + spabt + "\r\n" + invt + "\r\n" + othert;
			
            //console.log(data); //printing form data into the console
            // Convert the text to BLOB.
            const textToBLOB = new Blob([data], { type: "text/plain" });
            var filename = new Date();
            var month =new Date(); //months from 1-12
            month = month.getMonth();

            var day = new Date();
            var day = day.getUTCDate();

            var year = new Date();
            var year = year.getUTCFullYear();

            newdate = year + "/" + month + "/" + day;
            const sFileName = filename; // The file to save the data.

            let newLink = document.createElement("a");
            newLink.download = "charakter " + newdate;

            if (window.webkitURL != null) {
                newLink.href = window.webkitURL.createObjectURL(textToBLOB);
            } else {
                newLink.href = window.URL.createObjectURL(textToBLOB);
                newLink.style.display = "none";
                document.body.appendChild(newLink);
            }

            newLink.click();
        };

document.getElementById('inputfile').addEventListener('change', function(event) {
    var file = event.target.files[0]; // Greife auf die ausgewählte Datei zu
    
    var reader = new FileReader(); // Erstelle einen FileReader
    
    reader.onload = function(event) {
        var contents = event.target.result; // Der Inhalt der Datei wird hier gespeichert
        var lines = contents.split('\n'); // Teile den Inhalt in Zeilen auf
        
        // Jetzt kannst du mit den Zeilen arbeiten
        /*for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            console.log("Zeile " + i + ": " + line);
            
            // Hier kannst du die Zeile in Variablen umwandeln und weiterverarbeiten
        }*/
        
        cname.value = lines[0];
		race.value = lines[1];
        alignment.value = lines[2];
		xp.value = parseInt(lines[3]);
		health.value = parseInt(lines[4]);
		defense.value = parseInt(lines[5]);
		attack.value = parseInt(lines[6]);
		strength.value = parseInt(lines[7]);
		dexterity.value = parseInt(lines[8]);
		intelligence.value = parseInt(lines[9]);
		perception.value = parseInt(lines[10]);
		charisma.value = parseInt(lines[11]);
		spab.value = lines[12];
		inv.value = lines[13];
        other.value = lines[14];
    };
    
    // Lies die Datei als Text
    reader.readAsText(file);
});
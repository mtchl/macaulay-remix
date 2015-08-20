var fs = require("fs");

var maxId = 148984;
var titleMap = {};
var uniques = [];



function loadFile(idx){

	var path = "items/" + Math.floor(idx/10000) + "/" + idx + ".json";

	fs.readFile(path, 'utf-8', function (err, fileContents) {
		if (idx%1000 == 0) console.log(idx);
		if (err){
			//console.log(err);
			if (idx < maxId) loadFile(idx+1); // keep trying
			return;
		} 
			
		rec = JSON.parse(fileContents);
		var titleterms = rec.title.toLowerCase().match(/\S+/g);

		titleterms.forEach(function(t){
			if (titleMap[t]){
				titleMap[t].items.push(idx);
			} else {
				titleMap[t] = {term: t, items: []};
			}
		});
		

		if (idx < maxId){ 
			loadFile(idx+1);
		} else {
			out = Object.keys(titleMap).map(function(k){ return titleMap[k]});
			out = out.sort(function(a,b){
				return b.items.length - a.items.length;
			})

			out = out.slice(0,500); // only the top terms
			out.forEach(function(t){

				t.items.forEach(function(tt){
					if (uniques.indexOf(tt) == -1) uniques.push(tt);
				});

				t.relatedterms = [];

				out.forEach(function(c){
					for(var ti=0; ti<c.items.length; ti++){
		        		if (t.items.indexOf(c.items[ti]) > -1){
		        			t.relatedterms.push(c.term);
		        			break;
		        		}
			        }
				})

				console.log (t.term + " - " + t.items.length);
			});
			console.log (uniques.length + " items linked");
			saveData(out);
		}
	});
}


function saveData(array){
	console.log("saving");
	var outputFilename = 'mcaulay-titleterms.json';
	fs.writeFile(outputFilename, JSON.stringify(array, null, 0), function(err) {
	    if(err) {
	      console.log(err);
	    } else {
	      console.log("JSON saved to " + outputFilename);
	    }
	});
}


loadFile(1);
var nodes = {
appendTableHeaders: function(table, data) {
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.innerHTML = "";
    tr.appendChild(th);
    data.DB.forEach(function(value) {
		th = document.createElement("th");
		th.innerHTML = value.date;
		tr.appendChild(th);
    });
    table.appendChild(tr);
},

appendTd: function(tr, tdValue) {
    var td = document.createElement("td");
    td.innerHTML = tdValue;
    tr.appendChild(td);
},

appendTableData: function(table, data) {
    var tr;
    data.DB.forEach(function(element) {
		tr = document.createElement("tr");
		nodes.appendTd(tr, element.name);
		element.allPct.forEach(function(element) {
			nodes.appendTd(tr, logic.setEmotion(element.pct));
			table.appendChild(tr);
		});
      table.appendChild(tr);
    });
  }
}

var logic = {
	setEmotion: function(value){
		if(value !== ""){
			if(value >= 90){
				return value + "%<br /><img src='emotion/smiley-happy-48.gif' border='1'>";
			}else if(value >= 70){
				return value + "%<br /><img src='emotion/smiley-uncertain-48.gif' border='1'>";
			}else {
				return value + "%<br /><img src='emotion/smiley-sad-48.gif' border='1'>";
			}
		}else{
			return "No data"
		}
	}
}

function init() {
	var home = document.getElementById("home");
	var table = document.createElement("table");
	home.appendChild(table);
	nodes.appendTableHeaders(table, data);
	nodes.appendTableData(table, data);
}

window.addEventListener("load", init);
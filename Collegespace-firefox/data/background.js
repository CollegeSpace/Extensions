function getTimeDiff(date){
	var newDate = new Date(date);
	var time = newDate.getTime();
	var actulTime = new Date();
	var diffTime = Math.round(actulTime.getTime()/1000 - time/1000);
	return diffTime;
}

function fillResponse(result){
	var today_posts = document.getElementById("today");
	var last_week_posts = document.getElementById("last_week");
	var old_posts = document.getElementById("old_posts");
	var count_today = 0;
	for (var i = 0; i < result.length; i++) {
		var entry = result[i];
        var listItem = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute("href", entry.link);
        a.setAttribute("target", "_blank");
        a.appendChild(document.createTextNode(entry.title));
        listItem.appendChild(a);
		if(getTimeDiff(entry.date)<86400){
			var div = document.createElement("div");
			div.appendChild(listItem);
			today_posts.appendChild(div);
			count_today++;
		}
		else if(getTimeDiff(entry.date)<604800){
			var div = document.createElement("div");
			div.appendChild(listItem);
			last_week_posts.appendChild(div);
		}
		else{
			var div = document.createElement("div");
			div.appendChild(listItem);
			old_posts.appendChild(div);
		}
	}
	self.port.emit('count',count_today);
}

var xmlhttp = new XMLHttpRequest();
var url = "http://updates.collegespace.in/wp-json/posts?filter[posts]=10&filter[order]=DESC";
xmlhttp.open("GET", url, true);
xmlhttp.send();
xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
		var resp = JSON.parse(xmlhttp.responseText);
		fillResponse(resp);
	}
}
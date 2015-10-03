google.load("feeds", "1");

function translate(str){
	return str.replace("_"," ");
}

function getTimeDiff(date){
	var newDate = new Date(date);
	var time = newDate.getTime();
	var actulTime = new Date();
	var diffTime = Math.round(actulTime.getTime()/1000 - time/1000);
	return diffTime;
}

function initialize(){
	var feed = new google.feeds.Feed("http://updates.collegespace.in/feed/");
	feed.setNumEntries(10);
	var count_today = 0;
	feed.load(function(result) {
		if (!result.error) {
			var today_posts = document.getElementById("today");
			var last_week_posts = document.getElementById("last_week");
			var old_posts = document.getElementById("old_posts");
			var html = "<ul>";
			for (var i = 0; i < result.feed.entries.length; i++) {
				var entry = result.feed.entries[i];
				html = "<li>" + "<a href='" + entry.link + "' target='_blank'>" + entry.title + "</a></li>";
				if(getTimeDiff(entry.publishedDate)<86400){
					var div = document.createElement("div");
					div.innerHTML = html;
					today_posts.appendChild(div);
					count_today++;
				}
				else if(getTimeDiff(entry.publishedDate)<604800){
					var div = document.createElement("div");
					div.innerHTML = html;
					last_week_posts.appendChild(div);
				}
				else{
					var div = document.createElement("div");
					div.innerHTML = html;
					old_posts.appendChild(div);
				}
			}
			html += "</ul>";
			document.write(html);
			chrome.browserAction.setBadgeText({text:""+count_today});
		}
	});
}
google.setOnLoadCallback(initialize);
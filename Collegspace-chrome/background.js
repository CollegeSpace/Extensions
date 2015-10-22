// Load the Feed API with google.load(module, version, package), where:
// 	`module` calls the specific API module you wish to use on your page.
// 	`version` is the version number of the module you wish to load.
// 	`package` specifies the specific elements package you wish to load, in this case Feed.
google.load("feeds", "1");

/**
 * translate() - utility function to replace '_' with a space character
 * 
 * @param - str, string in which we want to replace the '_' with a space
 * 
 * @return - string with all '_' characters replaced with ' ' (spaces)
 */
function translate(str){
	return str.replace("_"," ");
}

/**
 * getTimeDiff() - function to calculate the time difference between the given time and the current time
 * 
 * @param - date, date from which we want to find the time difference of current date
 * 
 * @return - time difference(number of seconds) between the given time(passed as an argument) and the current time
 */
function getTimeDiff(date){
	var newDate = new Date(date);
	var time = newDate.getTime();
	var actulTime = new Date();
	var diffTime = Math.round(actulTime.getTime()/1000 - time/1000);
	return diffTime;
}

/**
 * initialize() - main callback function that's called whenever the popup page gets loaded
 * 		  It basically fetches the feed from wordpress website feed URL and shows according to their timestamp
 */
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

// event handler that's triggered whenever the chrome extension popup page gets loaded
google.setOnLoadCallback(initialize);

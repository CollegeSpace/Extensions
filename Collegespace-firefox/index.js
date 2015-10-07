var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");

var panel = panels.Panel({
    width: 350,
    height: 500,
    contentURL: self.data.url("panel.html"),
    contentScriptFile: self.data.url("background.js"),
    onHide: handleHide
});

var button = ToggleButton({
    id: "cs-button",
    label: "CollegeSpace",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
    },
    badge: 0,
    onReady: getBadge,
    onChange: handleChange
});

function getBadge(worker){
    console.log("Testing");
    worker.port.on('count', function(count) {
        button.badge = count;
    });
}

function handleChange(state) {
    if (state.checked) {
        panel.show({
            position: button
        });
    }
}

function handleHide() {
    button.state('window', {checked: false});
}
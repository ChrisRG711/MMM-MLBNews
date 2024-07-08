const NodeHelper = require("node_helper");
const fetch = require("node-fetch");

module.exports = NodeHelper.create({
    start: function() {
        console.log("Starting node helper for: " + this.name);
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === "FETCH_HEADLINES") {
            this.fetchHeadlines(payload);
        }
    },

    fetchHeadlines: function(config) {
        var self = this;
        fetch(config.endpoint)
            .then(response => response.json())
            .then(data => {
                self.sendSocketNotification("HEADLINES_FETCHED", data.articles.map(article => article.headline));
            })
            .catch(error => console.error('Fetching data failed:', error));
    }
});

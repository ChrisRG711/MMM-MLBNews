Module.register("MMM-HeadlineMarquee", {
    // Default module config
    defaults: {
        endpoint: 'https://example.com/News.json',
        speed: 100, // Speed of the marquee
        height: '50px', // Height of the marquee
        color: '#000000' // Text color of the marquee
    },

    start: function() {
        this.headlines = [];
        this.getData();
    },

    getStyles: function() {
        return ["MMM-HeadlineMarquee.css"];
    },

    getData: function() {
        var self = this;
        var urlApi = this.config.endpoint;
        fetch(urlApi)
            .then(response => response.json())
            .then(data => {
                self.headlines = data.articles.map(article => article.headline);
                self.updateDom();
            })
            .catch(error => console.error('Fetching data failed:', error));
    },

    getDom: function() {
        var wrapper = document.createElement("div");

        if (this.headlines.length === 0) {
            wrapper.innerHTML = "Loading headlines...";
            return wrapper;
        }

        var marquee = document.createElement("marquee");
        marquee.style.height = this.config.height;
        marquee.style.color = this.config.color;
        marquee.behavior = "scroll";
        marquee.direction = "left";
        marquee.scrollAmount = this.config.speed;
        marquee.innerText = this.headlines.join(' | ');

        wrapper.appendChild(marquee);
        return wrapper;
    }
});

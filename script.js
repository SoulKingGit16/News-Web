const API_KEY = "9bc7893821564f98afba5cb396f5e334";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function home() {
    window.location.reload();
}

async function fetchNews(query) {
    const req = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await req.json();
    bindData(data.articles);
}

function bindData(articles) {
    // const cardContainer = document.getElementById('card-container');
    // const newsTemplate = document.getElementById('news-template');
    const cardContainer = document.querySelector('#card-container');
    const newsTemplate = document.querySelector('#news-template');
    cardContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsTemplate.content.cloneNode(true); //DeepCloning...
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);

    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img")
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} • ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");//New Tab...
    });

}

let curSeclNav = null;

function onNavClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSeclNav?.classList.remove("active");
    curSeclNav = navItem;
    curSeclNav.classList.add("active");
}

// const searchBtn = document.getElementById('search-btn');
// const searchText = Document.getElementById('news-input');
const searchBtn = document.querySelector('#search-btn');
const searchText = Document.querySelector('#news-input');

searchBtn.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSeclNav?.classList.remove("active");
    curSeclNav = null;

})


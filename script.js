document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    const leftSide = document.querySelector('.left-side');
    const rightSide = document.querySelector('.right-side');
    const modal = document.getElementById('article-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeBtn = document.getElementsByClassName('close')[0];

    function syncScroll() {
        const scrollPercentage = this.scrollTop / (this.scrollHeight - this.clientHeight);
        const otherSide = this === leftSide ? rightSide : leftSide;
        otherSide.scrollTop = scrollPercentage * (otherSide.scrollHeight - otherSide.clientHeight);
    }

    leftSide.addEventListener('scroll', syncScroll);
    rightSide.addEventListener('scroll', syncScroll);

    // Load articles from local storage
    loadArticles();

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    const videoScroll = document.getElementById('video-scroll');
    
    function loadVideos() {
        const videos = JSON.parse(localStorage.getItem('videos')) || [];
        videoScroll.innerHTML = '';

        videos.forEach(video => {
            const videoElement = document.createElement('div');
            videoElement.className = 'video-item';
            videoElement.innerHTML = `
                <img src="${video.thumbnailUrl}" alt="${video.title}" style="width: 240px; height: 135px;">
                <h3>${video.title}</h3>
            `;
            videoElement.addEventListener('click', () => {
                window.open(video.videoUrl, '_blank');
            });
            videoScroll.appendChild(videoElement);
        });
    }

    loadVideos();
});

function loadArticles() {
    console.log('Loading articles');
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    console.log('Articles from localStorage:', articles);
    
    const mainImage = document.getElementById('main-image');
    const mainTitle = document.getElementById('main-title');
    const mainContent = document.getElementById('main-content');
    const smallArticles = document.querySelectorAll('.small-article');

    if (articles.length > 0) {
        displayMainArticle(articles[0]);
    }

    smallArticles.forEach((smallArticle, i) => {
        if (i < articles.length) {
            const article = articles[i];
            const image = smallArticle.querySelector('img');
            const title = smallArticle.querySelector('h2');
            const content = smallArticle.querySelector('p');

            image.src = article.imageUrl;
            title.textContent = article.title;
            content.textContent = article.content.substring(0, 100) + '...';
            smallArticle.setAttribute('data-index', i);
            
            smallArticle.addEventListener('click', function(event) {
                console.log('Article clicked:', i);
                if (event.target.closest('.right-side')) {
                    displayMainArticle(article);
                } else {
                    openModal(article);
                }
            });
        }
    });
}

function displayMainArticle(article) {
    const mainImage = document.getElementById('main-image');
    const mainTitle = document.getElementById('main-title');
    const mainContent = document.getElementById('main-content');

    mainImage.src = article.imageUrl;
    mainTitle.textContent = article.title;
    mainContent.textContent = article.content;

    // Scroll to the top of the left side
    document.querySelector('.left-side').scrollTop = 0;
}

function openModal(article) {
    const modal = document.getElementById('article-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');

    modalImage.src = article.imageUrl;
    modalTitle.textContent = article.title;
    modalContent.textContent = article.content;
    modal.style.display = "block";
}


document.addEventListener('DOMContentLoaded', function() {
    const articlesContainer = document.getElementById('articles-container');
    const articles = JSON.parse(localStorage.getItem('articles')) || [];

    articles.forEach((article, index) => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('article-item');
        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <img src="${article.imageUrl}" alt="Article Image" class="article-image" />
            <p>${article.content}</p>
        `;
        articlesContainer.appendChild(articleElement);
    });
});

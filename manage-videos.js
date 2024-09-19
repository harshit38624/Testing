document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-video-form');
    const videoList = document.getElementById('video-list');

    // Load existing videos
    loadVideos();

    // Add new video
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('video-title').value;
        const videoUrl = document.getElementById('video-url').value;
        const thumbnailUrl = document.getElementById('thumbnail-url').value;

        addVideo(title, videoUrl, thumbnailUrl);
        form.reset();
        loadVideos();
    });

    function addVideo(title, videoUrl, thumbnailUrl) {
        const videos = JSON.parse(localStorage.getItem('videos')) || [];
        videos.push({ title, videoUrl, thumbnailUrl });
        localStorage.setItem('videos', JSON.stringify(videos));
    }

    function loadVideos() {
        const videos = JSON.parse(localStorage.getItem('videos')) || [];
        videoList.innerHTML = '';

        videos.forEach((video, index) => {
            const videoElement = document.createElement('div');
            videoElement.className = 'video-item';
            videoElement.innerHTML = `
                <img src="${video.thumbnailUrl}" alt="${video.title}" style="width: 120px; height: 67px;">
                <span>${video.title}</span>
                <button onclick="editVideo(${index})">Edit</button>
                <button onclick="deleteVideo(${index})">Delete</button>
            `;
            videoList.appendChild(videoElement);
        });
    }

    window.editVideo = (index) => {
        const videos = JSON.parse(localStorage.getItem('videos')) || [];
        const video = videos[index];
        
        document.getElementById('video-title').value = video.title;
        document.getElementById('video-url').value = video.videoUrl;
        document.getElementById('thumbnail-url').value = video.thumbnailUrl;

        videos.splice(index, 1);
        localStorage.setItem('videos', JSON.stringify(videos));
        loadVideos();
    };

    window.deleteVideo = (index) => {
        const videos = JSON.parse(localStorage.getItem('videos')) || [];
        videos.splice(index, 1);
        localStorage.setItem('videos', JSON.stringify(videos));
        loadVideos();
    };
});
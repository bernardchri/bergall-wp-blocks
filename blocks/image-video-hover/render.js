document.addEventListener('DOMContentLoaded', function() {
    const videoElements = document.querySelectorAll('.image-video-hover__video');
    videoElements.forEach(video => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                    video.classList.add('is-visible');

                } else {
                    video.pause();
                    video.classList.add('is-hidden');

                }
            });
        }, { threshold: 0.5 });

        observer.observe(video);
    });
});
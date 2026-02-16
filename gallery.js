(() => {
    const grid = document.getElementById("gallery-grid");
    const sentinel = document.getElementById("gallery-sentinel");
    const status = document.getElementById("gallery-status");
    const lightbox = document.getElementById("gallery-lightbox");
    const lightboxImage = document.getElementById("lightbox-image");
    const lightboxClose = document.getElementById("lightbox-close");

    if (!grid || !sentinel || !status || !lightbox || !lightboxImage || !lightboxClose) {
        return;
    }

    const themes = ["city", "nature", "travel", "space", "minimal", "architecture", "ocean", "night"];
    let cursor = 0;
    let isLoading = false;

    function buildImageUrl(seed, width, height) {
        return `https://picsum.photos/seed/coldtbrew-${seed}/${width}/${height}`;
    }

    function createCard(index) {
        const seed = 1000 + index;
        const heights = [540, 680, 760, 620, 700, 580, 640, 720];
        const height = heights[index % heights.length];
        const theme = themes[index % themes.length];

        const card = document.createElement("article");
        card.className = "gallery-item";

        const button = document.createElement("button");
        button.className = "gallery-button";
        button.type = "button";

        const image = document.createElement("img");
        image.loading = "lazy";
        image.decoding = "async";
        image.alt = `${theme} gallery image ${index + 1}`;
        image.src = buildImageUrl(seed, 540, height);

        const caption = document.createElement("p");
        caption.className = "gallery-caption";
        caption.textContent = `Photo ${index + 1} · ${theme}`;

        button.appendChild(image);
        card.appendChild(button);
        card.appendChild(caption);

        button.addEventListener("click", () => {
            lightboxImage.src = buildImageUrl(seed, 1400, 1000);
            lightbox.classList.add("is-open");
            lightbox.setAttribute("aria-hidden", "false");
            document.body.style.overflow = "hidden";
        });

        return card;
    }

    function appendBatch(batchSize) {
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < batchSize; i += 1) {
            fragment.appendChild(createCard(cursor));
            cursor += 1;
        }

        grid.appendChild(fragment);
    }

    function loadMore() {
        if (isLoading) {
            return;
        }

        isLoading = true;
        status.textContent = "이미지를 불러오는 중...";

        window.setTimeout(() => {
            appendBatch(12);
            isLoading = false;
            status.textContent = "계속 스크롤하면 더 많은 이미지가 표시됩니다.";
        }, 200);
    }

    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                loadMore();
            }
        },
        { rootMargin: "1000px 0px" }
    );

    observer.observe(sentinel);

    function closeLightbox() {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        lightboxImage.src = "";
        document.body.style.overflow = "";
    }

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
            closeLightbox();
        }
    });

    appendBatch(16);
    status.textContent = "스크롤해서 이미지를 더 불러오세요.";
})();

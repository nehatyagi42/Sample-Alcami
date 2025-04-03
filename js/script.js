document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  const overlay = document.querySelector(".overlay");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = menu.classList.contains("active")
      ? "hidden"
      : "";
  });

  overlay.addEventListener("click", () => {
    hamburger.classList.remove("active");
    menu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  });
});

// Search Button Part

const searchBar = document.querySelector(".search-bar");
const flexLinks = document.querySelector(".flex.links");
const searchButton = document.querySelector(".srch-btn");

searchButton.addEventListener("click", () => {
  searchBar.classList.toggle("active");
  flexLinks.classList.toggle("active");
});

//Shop Part

const shopDropdown = document.querySelector(".shop-dropdown");
const shopMenu = document.querySelector(".shop-menu");

function shopClickHandler(e) {
  if (window.innerWidth <= 1024) {
    shopMenu.classList.toggle("active");
    e.stopPropagation();
  }
}

shopDropdown.addEventListener("click", shopClickHandler);

document.addEventListener("click", (e) => {
  if (!shopDropdown.contains(e.target) && !shopMenu.contains(e.target)) {
    shopMenu.classList.remove("active");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 1024) {
    shopMenu.classList.remove("active");
  }
});

// end search btton

//gallary start

const images = [
  "./assets/Elements1.png",
  "./assets/imgp1.png",
  "./assets/imgs1.png",
  "./assets/imgs2.png",
  "./assets/r1.png",
  "./assets/r2.png",
];

const previewContainer = document.getElementById("preview-container");
const prevArrow = document.getElementById("prev-arrow");
const nextArrow = document.getElementById("next-arrow");
const indicatorsContainer = document.getElementById("indicators");
const thumbnailsContainer = document.getElementById("thumbnails");

let currentIndex = 0;

function createPreviewImages() {
  previewContainer.innerHTML = "";
  images.forEach((img, index) => {
    const previewImage = document.createElement("img");
    previewImage.src = img;
    previewImage.classList.add("preview-image");
    if (index === currentIndex) previewImage.classList.add("active");
    previewContainer.appendChild(previewImage);
  });
}

function createIndicators() {
  indicatorsContainer.innerHTML = "";
  images.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.classList.add("indicator");
    if (index === currentIndex) indicator.classList.add("active");
    indicator.addEventListener("click", () => setActiveImage(index));
    indicatorsContainer.appendChild(indicator);
  });
}

function createThumbnails() {
  thumbnailsContainer.innerHTML = "";
  images.forEach((img, index) => {
    const thumbnail = document.createElement("img");
    thumbnail.src = img;
    thumbnail.classList.add("thumbnail");
    if (index === currentIndex) thumbnail.classList.add("active");
    thumbnail.addEventListener("click", () => setActiveImage(index));
    thumbnailsContainer.appendChild(thumbnail);
  });
}

function setActiveImage(index) {
  currentIndex = index;
  document.querySelectorAll(".preview-image").forEach((el, i) => {
    el.classList.toggle("active", i === currentIndex);
  });

  document.querySelectorAll(".indicator").forEach((el, i) => {
    el.classList.toggle("active", i === currentIndex);
  });

  document.querySelectorAll(".thumbnail").forEach((el, i) => {
    el.classList.toggle("active", i === currentIndex);
  });
}

createPreviewImages();
createIndicators();
createThumbnails();

prevArrow.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  setActiveImage(currentIndex);
});

nextArrow.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  setActiveImage(currentIndex);
});

// Product script

document.addEventListener("DOMContentLoaded", function () {
  const cartUrls = {
    original: {
      single: " https://www.drupal.org/project/dummy_link/git-instructions",
      double: "https://www.drupal.org/project/dummy_link/git-instructions",
      once: "https://www.drupal.org/project/dummy_link/git-instructions",
    },
    matcha: {
      single: "https://www.drupal.org/project/dummy_link/git-instructions",
      double: "https://www.drupal.org/project/dummy_link/git-instructions",
      once: "https://www.drupal.org/project/dummy_link/git-instructions",
    },
    cocoa: {
      single: "https://www.drupal.org/project/dummy_link/git-instructions",
      double: "https://www.drupal.org/project/dummy_link/git-instructions",
      once: "https://www.drupal.org/project/dummy_link/git-instructions",
    },
  };

  const subscriptionOptions = document.querySelectorAll(".subscription-option");

  function updateCartButton() {
    const selectedFlavor = document.querySelector(
      'input[name="flavor"]:checked'
    ).value;
    const selectedPurchase = document.querySelector(
      'input[name="purchase"]:checked'
    ).value;

    const cartButton = document.getElementById("add-to-cart-button");
    cartButton.href = cartUrls[selectedFlavor][selectedPurchase];
  }

  subscriptionOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const radioInput = this.querySelector('input[type="radio"]');
      radioInput.checked = true;

      subscriptionOptions.forEach((opt) => {
        opt.classList.remove("selected");
        const details = opt.querySelector(".subscription-details");
        details.classList.remove("visible");
      });

      this.classList.add("selected");

      const details = this.querySelector(".subscription-details");
      details.classList.add("visible");

      updateCartButton();
    });
  });

  const flavorRadios = document.querySelectorAll('input[name="flavor"]');
  flavorRadios.forEach((radio) => {
    radio.addEventListener("change", updateCartButton);
  });

  const purchaseRadios = document.querySelectorAll('input[name="purchase"]');
  purchaseRadios.forEach((radio) => {
    radio.addEventListener("change", updateCartButton);
  });

  document.getElementById("option-single").classList.add("selected");
  document.getElementById("single-details").classList.add("visible");
  updateCartButton();
});

// Percentage counter part
document.addEventListener("DOMContentLoaded", function () {
  const counterElements = document.querySelectorAll(".percentage-display");
  const counterContainer = document.querySelector(".counter-container");
  const animationDuration = 800;
  const framesPerSecond = 60;
  const totalFrames = (animationDuration / 1000) * framesPerSecond;

  let animationStarted = false;

  function animateCounter(element, targetPercentage) {
    let currentPercentage = 0;
    const incrementPerFrame = targetPercentage / totalFrames;
    let frame = 0;

    const interval = setInterval(() => {
      currentPercentage += incrementPerFrame;
      element.textContent =
        Math.min(Math.round(currentPercentage), targetPercentage) + "%";
      frame++;

      if (currentPercentage >= targetPercentage || frame >= totalFrames) {
        clearInterval(interval);
        element.textContent = targetPercentage + "%";
      }
    }, 1000 / framesPerSecond);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animationStarted) {
          animationStarted = true;
          counterElements.forEach((element) => {
            const targetPercentage = parseInt(element.textContent);
            animateCounter(element, targetPercentage);
          });
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  observer.observe(counterContainer);
});

//testimonial part
document.addEventListener("DOMContentLoaded", function () {
  const testimonials = [
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.",
      author: "John Doe",
      profession: "Marketing Director",
    },
    {
      text: "Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum.",
      author: "Jane Smith",
      profession: "CEO",
    },
    {
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      author: "Robert Johnson",
      profession: "Product Manager",
    },
    {
      text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
      author: "Sarah Williams",
      profession: "Designer",
    },
    {
      text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.",
      author: "Michael Brown",
      profession: "Developer",
    },
    {
      text: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi.",
      author: "Emily Davis",
      profession: "Marketing Specialist",
    },
    {
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat.",
      author: "Alex Miller",
      profession: "CTO",
    },
  ];

  const cardsContainer = document.querySelector(".testimonial-cards");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const indicatorsContainer = document.querySelector(".indicatorsT");

  let currentIndex = 0;
  let cardsPerView = getCardsPerView();

  function getCardsPerView() {
    if (window.innerWidth < 768) {
      return 1;
    } else if (window.innerWidth < 992) {
      return 2;
    } else {
      return 3;
    }
  }

  function createCards() {
    cardsContainer.innerHTML = "";
    testimonials.forEach((testimonial) => {
      const card = document.createElement("div");
      card.classList.add("card");

      const starsImg = document.createElement("img");
      starsImg.classList.add("stars-img");
      starsImg.src = "./assets/Stars.svg";
      starsImg.alt = "Five stars";

      const testimonialText = document.createElement("p");
      testimonialText.classList.add("testimonial-text");
      testimonialText.textContent = testimonial.text;

      const authorInfo = document.createElement("div");
      authorInfo.classList.add("author-info");

      const authorImg = document.createElement("img");
      authorImg.classList.add("author-img");
      authorImg.src = "./assets/th1.png";
      authorImg.alt = "Author";

      const authorDetails = document.createElement("div");
      authorDetails.classList.add("author-details");

      const authorName = document.createElement("span");
      authorName.classList.add("author-name");
      authorName.textContent = testimonial.author;

      const authorProfession = document.createElement("span");
      authorProfession.classList.add("author-profession");
      authorProfession.textContent = testimonial.profession;

      authorDetails.appendChild(authorName);
      authorDetails.appendChild(authorProfession);

      authorInfo.appendChild(authorImg);
      authorInfo.appendChild(authorDetails);

      card.appendChild(starsImg);
      card.appendChild(testimonialText);
      card.appendChild(authorInfo);

      cardsContainer.appendChild(card);
    });
  }

  function initCarousel() {
    createCards();
    updateLayout();

    prevBtn.addEventListener("click", prevSlide);
    nextBtn.addEventListener("click", nextSlide);

    let interval = setInterval(nextSlide, 5000);

    cardsContainer.addEventListener("mouseenter", () => {
      clearInterval(interval);
    });

    cardsContainer.addEventListener("mouseleave", () => {
      interval = setInterval(nextSlide, 5000);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    });

    window.addEventListener("resize", function () {
      const newCardsPerView = getCardsPerView();

      if (newCardsPerView !== cardsPerView) {
        cardsPerView = newCardsPerView;
        updateLayout();

        const maxIndex = getMaxSlideIndex();
        if (currentIndex > maxIndex) {
          currentIndex = maxIndex;
        }

        goToSlide(currentIndex);
      }
    });
  }

  function updateLayout() {
    const cardMargin = 30;
    const containerWidth = cardsContainer.parentElement.clientWidth;
    const totalMarginSpace = cardMargin * cardsPerView;
    const availableWidth = containerWidth - totalMarginSpace;
    const cardWidth = availableWidth / cardsPerView;

    const cardWidthPercent = (cardWidth / containerWidth) * 100;
    const cardMarginPercent = (cardMargin / 2 / containerWidth) * 100;

    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      card.style.flexBasis = `calc(${cardWidthPercent}% - ${cardMargin}px)`;
      card.style.minWidth = `calc(${cardWidthPercent}% - ${cardMargin}px)`;
      card.style.marginLeft = `${cardMarginPercent}%`;
      card.style.marginRight = `${cardMarginPercent}%`;
    });

    createIndicators();
  }

  function getMaxSlideIndex() {
    return Math.max(0, testimonials.length - cardsPerView);
  }

  function goToSlide(index) {
    const maxIndex = getMaxSlideIndex();

    if (index < 0) {
      index = 0;
    } else if (index > maxIndex) {
      index = maxIndex;
    }

    currentIndex = index;

    const cards = document.querySelectorAll(".card");
    const cardTotalWidth =
      cards[0].getBoundingClientRect().width +
      parseFloat(getComputedStyle(cards[0]).marginLeft) +
      parseFloat(getComputedStyle(cards[0]).marginRight);

    const translatePixels = cardTotalWidth * currentIndex;

    const containerWidth = cardsContainer.parentElement.clientWidth;
    const translatePercent = (translatePixels / containerWidth) * 100;

    cardsContainer.style.transform = `translateX(-${translatePercent}%)`;

    updateIndicators();
  }

  function nextSlide() {
    const maxIndex = getMaxSlideIndex();
    if (currentIndex < maxIndex) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(0);
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(getMaxSlideIndex());
    }
  }

  function createIndicators() {
    indicatorsContainer.innerHTML = "";
    const totalSlides = getMaxSlideIndex() + 1;

    for (let i = 0; i < totalSlides; i++) {
      const indicator = document.createElement("div");
      indicator.classList.add("indicatorT");
      if (i === 0) {
        indicator.classList.add("active");
      }
      indicator.dataset.index = i;
      indicatorsContainer.appendChild(indicator);

      indicator.addEventListener("click", function () {
        goToSlide(parseInt(this.dataset.index));
      });
    }
  }

  function updateIndicators() {
    const indicators = document.querySelectorAll(".indicatorT");
    indicators.forEach((ind, i) => {
      if (i === currentIndex) {
        ind.classList.add("active");
      } else {
        ind.classList.remove("active");
      }
    });
  }

  initCarousel();
});

//faq
const questions = document.querySelectorAll(".faq-question");

questions.forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.parentElement;
    item.classList.toggle("active");

    questions.forEach((q) => {
      if (q !== question && q.parentElement.classList.contains("active")) {
        q.parentElement.classList.remove("active");
      }
    });
  });
});

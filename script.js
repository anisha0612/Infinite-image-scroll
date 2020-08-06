M.AutoInit();

const imageContainer = document.querySelector(".image-container");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
const count = 30;

// check if all images are loaded
const imageLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
  }
};

const getImages = () => {
  const apiKey = "ucBVjzIC1qsRsBf7p0OTyCUG_nKeSB18QkzXZUoynFY";
  const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  axios
    .get(apiUrl)
    .then((result) => {
      displayImages(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const displayImages = (photos) => {
  let image = ``;
  imagesLoaded = 0;
  totalImages = photos.length;

  photos.forEach((photo) => {
    const img = document.createElement("img");
    const card = document.createElement("div");
    const cardImage = document.createElement("div");
    const cardReveal = document.createElement("div");
    cardImage.classList.add(
      "card-image",
      "waves-effect",
      "waves-block",
      "waves-light"
    );
    card.classList.add("card");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: "image",
    });
    img.classList.add("activator");
    cardImage.appendChild(img);
    cardReveal.classList.add("card-reveal");
    cardReveal.innerHTML = `
    <div class="content">
      <span class="card-title"><i class="material-icons right">close</i></span>
      <h3>Description : ${photo.alt_description}</h3>
      <p>Downloads : ${photo.downloads}</p>
      <p>Clicked on : ${photo.exif.model} ${photo.exif.make}</p>
      <a href=${photo.links.html} target="_blank">Go to the Image</a>
    </div>
    `;
    card.appendChild(cardImage);
    card.appendChild(cardReveal);
    img.addEventListener("load", imageLoaded);
    imageContainer.appendChild(card);
  });
};

// implement infinite scroll using scroll event listener -
// compare(window.scrollY + window.innerHeight) to document.body.offsetHeight(height including all images)
// to trigger the event before the end of content(before the bottom is reached)
// subtract 1000px from the offsetHeight

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getImages();
  }
});

getImages();

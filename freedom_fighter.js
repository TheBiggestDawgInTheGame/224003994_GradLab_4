document.addEventListener("DOMContentLoaded", () => {
  let picsContainer = document.getElementById("pics");
  let favoritesContainer = document.getElementById("favorites");
  let actionsList = document.getElementById("actions");

  let message1 = document.getElementById("selectionMessage");
  if (!message1) {
    message1 = document.createElement("p");
    message1.id = "selectionMessage";
    picsContainer.parentNode.insertBefore(message1, picsContainer.nextSibling);
  }

  //   let remainingEl = document.getElementById("remainingCount");
  //   if (remainingEl) {
  //     remainingEl = document.createElement("numbers");
  //     remainingEl.id = "remainingCount";
  //     picsContainer.parentNode.insertBefore(remainingEl, message1.nextSibling);
  //   }

  let images = Array.from(picsContainer.querySelectorAll("img.mandela"));

  images.forEach((img, idx) => {
    img.dataset.originalIndex = idx.toString();
    img.dataset.selected = "false";
    img.alt = img.alt || `Mandela photo ${idx + 1}`;
    img.title = img.alt;
    img.style.width = "180px";
    img.style.height = "200px";
    img.style.objectFit = "cover";
    img.style.padding = "7px";

    img.addEventListener("click", (event) => {
      handleImageClick(event.currentTarget);
    });
  });

  function getFavoritesCount() {
    return favoritesContainer.querySelectorAll("img").length;
  }

  function getRemainingCount() {
    return picsContainer.querySelectorAll("img").length;
  }

  function updateRemaining() {
    remainingEl.textContent = `Remaining images to select: ${getRemainingCount()}`;
  }

  function addAction(line) {
    let li = document.createElement("li");
    li.textContent = line;
    actionsList.appendChild(li);
  }

  function setMessage(text) {
    message1.textContent = text;
  }

  function moveToFavorites(img) {
    let src = img.getAttribute("src");
    let originalIndex = parseInt(img.dataset.originalIndex, 10) + 1;

    img.dataset.selected = "true";
    img.style.border = "4px solid green";
    img.style.margin = "5px";

    favoritesContainer.appendChild(img);

    addAction(`Moved ${src} to favorites`);
    let favNumber = getFavoritesCount();
    setMessage(
      `Image ${originalIndex} selected as favorite number ${favNumber}`,
    );

    updateRemaining();

    if (getRemainingCount() === 0) {
      setMessage("All images have been selected!");
    }
  }

  function revertToMain(img) {
    let src = img.getAttribute("src");
    let originalIndex = parseInt(img.dataset.originalIndex, 10);

    img.dataset.selected = "false";
    img.style.border = "";

    let siblings = Array.from(picsContainer.querySelectorAll("img"));
    let insertBefore = siblings.find((sibling) => {
      return parseInt(sibling.dataset.originalIndex, 10) > originalIndex;
    });

    if (insertBefore) {
      picsContainer.insertBefore(img, insertBefore);
    } else {
      picsContainer.appendChild(img);
    }

    addAction(`Reverted ${src} back to the main list`);
    setMessage(`Reverted image ${originalIndex + 1} back to the main list`);

    updateRemaining();
  }

  function handleImageClick(img) {
    if (!(img instanceof HTMLImageElement)) return;

    let isSelected = img.dataset.selected === "true";

    if (isSelected) {
      if (img.parentElement === favoritesContainer) {
        revertToMain(img);
      } else {
        return;
      }
    } else {
      if (img.parentElement === favoritesContainer) {
        return;
      }
      moveToFavorites(img);
    }
  }

  updateRemaining();
});

export const upload = () =>
  new Promise((resolve, reject) => {
    const inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.style.display = "none";
    document.body.appendChild(inputElement);
    inputElement.click();
    inputElement.addEventListener("change", (event) => {
      resolve(event.target.files);
    });
  });

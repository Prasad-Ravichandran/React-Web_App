import "./styles.css";

type theme = "light" | "dark";

const toggleBtn = document.getElementById("theme-toggler");
const body = document.querySelector("body") as HTMLBodyElement;
const headerImg = document.querySelector("header > img") as HTMLImageElement;

const root = document.documentElement;

let theme: theme = "dark";

toggleBtn?.addEventListener("click", () => {
  if (theme === "dark") {
    theme = "light";
    const bg = getComputedStyle(root).getPropertyValue("--bg-light-img").trim();

    body.style.backgroundImage = bg;
    headerImg.src = "./src/images/logo-light-theme.svg";
  } else if (theme === "light") {
    theme = "dark";
    const bg = getComputedStyle(root).getPropertyValue("--bg-dark-img").trim();
    body.style.backgroundImage = bg;
    headerImg.src = "./src/images/logo-dark-theme.svg";
  }
});

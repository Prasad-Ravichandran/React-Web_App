import "./styles.css";

type theme = "light" | "dark";
type checkbox = "true" | "false";

const toggleBtn = document.getElementById("theme-toggler");
const body = document.querySelector("body") as HTMLBodyElement;
const headerImg = document.querySelector("header > img") as HTMLImageElement;
const head1 = document.getElementById("heading1") as HTMLHeadingElement;
const head2 = document.getElementById("heading2") as HTMLHeadingElement;
const textfield = document.getElementById("textfield") as HTMLTextAreaElement; // You're telling TypeScript: “I expect this element to be a HTMLTextAreaElement, but it might also be null.”
const checkItems = document.querySelector(".task2") as HTMLDivElement;

const root = document.documentElement;

let theme: theme = "dark";

toggleBtn?.addEventListener("click", () => {
  if (theme === "dark") {
    theme = "light";
    const bg = getComputedStyle(root).getPropertyValue("--bg-light-img").trim();

    const gradient = `linear-gradient(to right, #000000, #000000)`;
    head1.style.backgroundImage = gradient;
    head2.style.backgroundImage = gradient;

    //textarea
    textfield.style.backgroundColor = "#f2f2f7";
    textfield.style.color = "#000000";

    checkItems.style.color = "#000000";

    //body background
    body.style.backgroundImage = bg;
    headerImg.src = "./src/images/logo-light-theme.svg";
  } else if (theme === "light") {
    theme = "dark";
    const bg = getComputedStyle(root).getPropertyValue("--bg-dark-img").trim();

    const gradient = `linear-gradient(to right, #fff, #fff)`;
    head1.style.backgroundImage = gradient;
    head2.style.backgroundImage = gradient;

    //textarea
    textfield.style.backgroundColor = "#242b37f1";
    textfield.style.color = "#f2f2f7";

    checkItems.style.color = "#f2f2f7";

    //body background
    body.style.backgroundImage = bg;
    headerImg.src = "./src/images/logo-dark-theme.svg";
  }
});

const characters = document.getElementById("char");
const words = document.getElementById("word");
const sentences = document.getElementById("sentence");
const spaceCheck = document.getElementById("space") as HTMLInputElement;
const charLimits = document.getElementById("limit");
const MAX_LENGTH = 100;
const timeCalc = document.getElementById("time") as HTMLInputElement;

let charLimit: number | null = null;

let checkbox: checkbox = "false";

function updateCounts() {
  //optional chaining (?.) to safely access the "value property of textfield"
  //nullish coalescing operator, which provides a default value("")
  const text = textfield?.value ?? "";

  let charCount;
  if (checkbox === "false") {
    charCount = text.length; // characters (including spaces)
  } else {
    charCount = text.trim().replace(/\s/g, "").length;
  }

  // words: split on any whitespace, ignore empty tokens
  const wordCount =
    text.trim().length === 0
      ? 0
      : text.trim().split(/\s+/).filter(Boolean).length;

  // sentences: split on ., !, ? sequences and ignore empty tokens
  const sentenceCount = text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter(Boolean).length;

  if (characters) characters.textContent = String(charCount);
  if (words) words.textContent = String(wordCount);
  if (sentences) sentences.textContent = String(sentenceCount);
}

// ?. this is for safty(it will not send error msg if textfield is empty)
textfield?.addEventListener("input", () => {
  updateCounts();
});

spaceCheck?.addEventListener("change", () => {
  checkbox = "true";
});

charLimits?.addEventListener("change", (e) => {
  const checkbox = e.target as HTMLInputElement;
  if (checkbox.checked) {
    charLimit = MAX_LENGTH;
    textfield?.setAttribute("maxlength", String(MAX_LENGTH));
  } else {
    charLimit = null;
    textfield?.removeAttribute("maxlength");
  }
  updateCounts();
});

updateCounts();

const countCharacters = (html: string) => {
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  let textContent = tempDiv.textContent || tempDiv.innerText || "";
  return textContent.length;
};

export default countCharacters;

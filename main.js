function abbreviate(str) {
  let letters = str.match(/\b(\w)/g);
  letters = letters.map((l) => l + ".");
  return letters.join(" ");
}

function formatAuthor(author) {
  let str = `${abbreviate(author.firstName)} ${author.lastName}`;
  if (author.lastName.startsWith("Languin")) {
    str = `<emph>${str}</emph>`;
  }
  return str;
}

function formatAuthors(authors) {
  authors = authors.map(formatAuthor);
  if (authors.length == 1) {
    return authors[0];
  } else {
    return authors.slice(0, -1).join(", ") + " and " + authors.slice(-1);
  }
}

function formatItem(item) {
  const title = item.title;
  const authors = formatAuthors(item.creators);
  let journal = `<i>${item.publicationTitle}</i>`;
  if ('volume' in item) { journal += ` <b>${item.volume}</b>` };
  if ('issue' in item) { journal += `, ${item.issue}` };
  if ('pages' in item) { journal += `, ${item.pages}` };
  if ('date' in item) {
    const date = new Date(item.date);
    journal += ` (${date.getFullYear()})`;
  };
  return `<li class="article"><a href="http://doi.org/${item.DOI}">${authors}. ${title}. ${journal}.</a></li>`;
}

let items = biblio.items;
items.sort((a, b) => new Date(b.date) - new Date(a.date));

document.querySelector(".publist").innerHTML = items.map(formatItem).join("");

function getAge(date) {
  date = new Date(date);
  const now = new Date();
  let age = now.getFullYear() - date.getFullYear();
  let month = date.getMonth();
  let day = date.getDate();
  if (now.getMonth() < month || (now.getMonth() == month) && (now.getDate() < day)) {
    age = age - 1;
  }
  return age
}

let age = getAge("1994-08-12");
document.querySelector(".myage").innerHTML = `${age}`;

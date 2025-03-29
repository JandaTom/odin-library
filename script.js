const container = document.getElementById("container");
const buttonAdder = document.getElementById("addbook");
const subscribeButton = document.getElementById("subscribe");

const userLibrary = [];
let index = 0;

function Book(id, title, author, pages, readStatus) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.info = () => {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus}`;
  };
}

function addFormDataToLibrary() {
  const generatedId = crypto.randomUUID();
  const authorValue = document.getElementById("author").value;
  const titleValue = document.getElementById("title").value;
  const pageCountValue = document.getElementById("pagecount").value;
  const readStatusValue = document.getElementById("readstatus").value;

  const newerBook = new Book(
    generatedId,
    titleValue,
    authorValue,
    pageCountValue,
    readStatusValue
  );
  userLibrary.push(newerBook);
}

function deleteItem(bookId) {
  const bookIndex = userLibrary.findIndex((book) => bookId === book.id);
  userLibrary.splice(bookIndex, 1);

  const removedElement = document.querySelector(`li[data-id="${bookId}"]`);
  removedElement.remove();
  index -= 1;
}

function displayBooks(books) {
  const currentBook = books[index];
  const listItem = document.createElement("li");
  listItem.setAttribute("data-id", books[index].id);
  listItem.innerText = `Book name is ${books[index].title}, written by ${books[index].author}, it has ${books[index].pages} pages and current status is ${books[index].readStatus}.`;

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "delete";

  //The index needs to be stored in a variable, because the variable serves basically as a pointer.
  deleteButton.addEventListener("click", () => deleteItem(currentBook.id));

  //deleteButton.addEventListener("click", () => deleteItem(books[index].id)); In this case, the index is calculated only when firing the trigger, when the index is already incremented.

  container.appendChild(listItem);
  listItem.appendChild(deleteButton);

  index += 1;
}

subscribeButton.addEventListener("click", () => {
  addFormDataToLibrary();
  displayBooks(userLibrary);
});

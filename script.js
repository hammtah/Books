let data=[];
const booksUrl = "./data.json";

getBooks(booksUrl)
.then((data)=>{
    data=[...data,...data,...data]
    renderBooks(data)
});

async function getBooks(url){
    const res = await fetch(url).then(res=> res.json());
    return res;
}

function renderBooks(data){
    data.forEach( book=> renderBook(book) );
}

function renderBook(bookData){
    const book = createBook();
    const {id,category, img, title, author}=bookData;

    book.querySelector(".book-div").id=`book-${id}`;
    const categoryDom = book.querySelector(".category");
    const imgDom = book.querySelector(".book-img");
    const titleDom = book.querySelector(".book-title");
    const authorDom = book.querySelector(".author");
    updateElement(categoryDom, category);
    updateElement(imgDom, img);
    updateElement(titleDom, title);
    updateElement(authorDom, author);
    document.getElementById("books-section").appendChild(book);

}

function createBook(){
    const template = document.getElementById("book");
    const book = template.content.cloneNode(true);
    return book;
}

function updateElement(node,content){
    if(node.src) node.src=content;
    else node.textContent=content;
}


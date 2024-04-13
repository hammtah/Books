let data=[];
const booksUrl = "./data.json";

// getBooks(booksUrl)
// .then((data)=>{
//     data=[...data,...data,...data]
//     renderBooks(data)
// });

async function renderHome(){
    data = await getBooks(booksUrl);
    renderBooks(data);
}

async function getBooks(url){
    const res = await fetch(url).then(res=> res.json());
    return res;
}

function renderBooks(data){
    document.getElementById("app").textContent='';
    document.getElementById("books-section").textContent='';
    data.forEach( book=> renderBook(book) );
}

function renderBook(bookData){
    const book = createTmpltCopy("book-template");
    const {id,category, img, title, author}=bookData;

    book.querySelector(".book-div").id=`book-${id}`;
    // book.querySelector(".book-div").dataset.id=`/books?id=${id}`;
    book.querySelectorAll(".clk").forEach((elm)=>elm.dataset.id=`/books?id=${id}`);
    const categoryDom = book.querySelector(".category");
    const imgDom = book.querySelector(".book-img");
    const titleDom = book.querySelector(".book-title");
    const authorDom = book.querySelector(".author");
    updateElement(categoryDom, category);
    updateElement(imgDom, img);
    updateElement(titleDom, title);
    updateElement(authorDom, author);
    // document.getElementById("app").textContent='';
    document.getElementById("books-section").appendChild(book);

}

function createTmpltCopy(id){
    const template = document.getElementById(id);
    const copy = template.content.cloneNode(true);
    return copy;
}

function updateElement(node,content){
    if(node.src) node.src=content;
    else node.textContent=content;
}

async function renderDetails(id){
    const details=createTmpltCopy("details-template");
    data = await getBooks(booksUrl);
    let {img, title, author, release, pages, description,category}=data.find((book)=>{
        return book.id==id;
    });
    const imgDom = details.querySelector(".details-cover");
    const titleDom = details.querySelector(".details-title");
    const authorDom = details.querySelector(".details-author");
    const descriptionDom = details.querySelector(".details-description-div");
    const pagesDom = details.querySelector(".details-meta-pages");
    const releaseDom = details.querySelector(".details-meta-publish");
    updateElement(imgDom, img);
    updateElement(titleDom, title);
    updateElement(authorDom, author);
    const descriptionArr=description.split('.');
    descriptionDom.innerHTML=descriptionArr.map((par)=>`<p class="details-description-p">${par}</p>`).join('');
    // updateElement(descriptionDom, description);
    updateElement(pagesDom, pages);
    updateElement(releaseDom, release);
    // <a href="" class="details-genre-a"></a>
    details.querySelector(".genres-as").innerHTML=category.map((category)=>`<a href="" class="details-genre-a">${category}</a>`).join('');
    document.getElementById("app").textContent='';
    document.getElementById("books-section").textContent='';
    document.getElementById("app").appendChild(details);

}

// function goToBook(e){
//     e.preventDefault();
//     console.log(e.href)
//     updateView(e.href)
// }
function renderError(){
    const template = createTmpltCopy('error-template');
    const errorMsg = template.querySelector("h1");
    updateElement(errorMsg,"Page does not exist");
    document.getElementById("app").textContent='';
    document.getElementById("app").append(template);
}
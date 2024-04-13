
const routes={
    "/books":{
        templateId:"book-template",
        render:renderHome,
        meta:{
            templateId:"details-template",
            render:renderDetails,
        }
    },
    "/error":{
        templateId:"error-template",
        render: renderError
    }
    // "/books":{
    //     templateId:"details-template",
    //     render:renderDetails,
    //     params: true
    // }
}
updateView(window.location.pathname);



function changeRoute(){

}
function updateView(path){
    const route = routes[path];
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let id = null;
    // check if the id exist as a param and it is the only param
    if(urlParams.size === 1 && urlParams.has("id")){
        id=urlParams.get("id");
    }
    // the redirection url
    const url = id ? `${path}${queryString}` : `${path}`;
    history.pushState({},path,url);
    // if the route entered is valid
    if(route){
        if(id)  route.meta.render(id);
        else route.render();
    } 
    else updateView("/books");
}


function goToBook(event){
    event.preventDefault();
    console.log(event.target.dataset.id)
    // console.log(event.target.parentElement)
    // console.log(event.target.href)

    updateView(event.target.dataset.id);
}

window.onpopstate = () => {
    const path=window.location.pathname;    
    window.location=pathname=path;
    updateView(path);
}

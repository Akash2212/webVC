var search = document.getElementById("search");
var searchView = document.getElementById("searchView");

var searchResView = document.createElement("div");
var searchText = document.createElement("p");
searchResView.setAttribute("id", "searchResView");

function searchFunction() {
    searchView.appendChild(searchResView);
    searchResView.appendChild(searchText);
    var string = search.value;
    if (!string.localeCompare("")) {
        searchResView.style.display = "none";
    } else {
        searchResView.style.display = "block";
        searchText.innerHTML = search.value;
    }
}

searchResView.addEventListener("click", function(event) {
    window.open("searchResult.html", "_self");
});
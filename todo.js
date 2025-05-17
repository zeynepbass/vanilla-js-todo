
const list = document.querySelector(".list-group")
const clearAll = document.querySelector("#btn")
const search=document.querySelector("#todoSearch")
const add = document.querySelector(".add")
const todoInput = document.querySelector("#todoInput")
runEvents();
function runEvents() {
    document.addEventListener("DOMContentLoaded", () => {
        response(); 
    });

    search.addEventListener("keyup", () => {
        const searchText = search.value;
        response(searchText);
    });

    clearAll.addEventListener("click", clear);
    add.addEventListener("click", Add);
}

function response(searchFilter = "") {


    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((data) => {
            list.textContent = ""; 

            data
                .filter(item => item.title.toLowerCase().includes(searchFilter.toLowerCase()))
                .reverse()
                .forEach(item => Item(item));
        })
        .catch((err) => console.log(err));
}


function Add(e) {
    e.preventDefault()
    const input = todoInput.value.trim();
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: input,
            body: "",
            userId: 1
        })
    })
        .then((res) => res.json())
        .then((input) => {
            Item(input);
            todoInput.value = ""
        })

}

function Item(item) {
    let li = document.createElement("li")
    let button = document.createElement("button");
    button.setAttribute("id", item.id)
    button.style.cursor = "pointer"
    button.style.backgroundColor = "transparent"
    button.style.border = "none"
    button.style.color = "red"
    button.textContent = "X"
    li.textContent = item.title;
    list.prepend(li)
    li.append(button)
    button.addEventListener("click", () => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${item.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                if (!res.ok) {
                    alert("bir sorun oluştu.")
                }
                else {
                    button.parentElement.remove()
                }
            })
            .catch((err) => console.log(err))
    })
}
function clear() {
    list.textContent = ""
}
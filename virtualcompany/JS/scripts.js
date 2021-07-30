function createChatLists() {
    var container;
    var user, msg, tm;
    container = document.getElementById("chats");
    for (var i = 0; i < 20; i++) {
        var chatItem = document.createElement("div");
        var img = document.createElement("img");
        var endline = document.createElement("div");
        var usernameAndMessageContainer = document.createElement("div");
        var userName = document.createElement("p");
        var message = document.createElement("p");
        var time = document.createElement("p");



        chatItem.setAttribute("class", "chatItem");
        chatItem.setAttribute("id", `${i}`);
        chatItem.setAttribute("id", `${i}`);
        img.setAttribute("class", "logo");
        endline.setAttribute("class", "endline");
        usernameAndMessageContainer.setAttribute("class", "usernameAndMessageContainer");
        userName.setAttribute("class", "userName");
        message.setAttribute("class", "message");
        time.setAttribute("class", "time");

        container.append(chatItem);
        chatItem.append(img);
        chatItem.append(endline);
        chatItem.appendChild(usernameAndMessageContainer);
        usernameAndMessageContainer.append(userName);
        usernameAndMessageContainer.append(message);
        chatItem.append(time);

        img.src = "../Images/logo.png"
    }


    var chats = document.getElementById("chats");
    var message = document.getElementById("message");
    //message.style.height = screen.height + "px";

    var companyName = document.getElementById("companyName");

    var usrName = ["Akash", "Robot"];

    for (var i = 0; i < 20; i++) {

        var chatElements = document.getElementById(`${i}`)
            .addEventListener('click', (e) => {
                console.log(e.target.id)
                chats.style.display = "none";
                message.style.display = "flex";
                companyName.innerHTML = usrName[Number(e.target.id)];
            });
    }

    user = document.getElementsByClassName("userName");
    msg = document.getElementsByClassName("message");
    tm = document.getElementsByClassName("time");
    for (var i = 0; i < 20; i++) {
        user[i].innerHTML = usrName[i];
        msg[i].innerHTML = "Hello everyone";
        tm[i].innerHTML = "6.00PM"
    }




}


document.getElementById("defaultOpen").click();

function openContent(event, idName) {
    var i, tabContent, tabLinks, bar;

    tabContent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    tabLinks = document.getElementsByClassName("tabLinks");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");

    }
    document.getElementById(idName).style.display = "flex";
    event.currentTarget.className += " active";
}

createChatLists();
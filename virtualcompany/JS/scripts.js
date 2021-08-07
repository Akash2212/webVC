function createChatLists() {
    var container;
    var user, msg, tm;
    var myId, receiver;
    container = document.getElementById("chats");


    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            myId = user.uid;
        }
    });



    var user_name = [];
    var userID = [];
    var email = [];
    var imageURL = [];

    var rootRef = firebase.database().ref("Users");
    rootRef.on("value", function(snapshot) {

        snapshot.forEach(function(child) {
            //console.log(child.key + ": " + child.val());
            //console.log(JSON.stringify(child.val().userName))

            userID.push(child.val().id);
            user_name.push(child.val().userName);
            email.push(child.val().email);
            imageURL.push(child.val().imageURL);
        });

        for (var i = 0; i < userID.length; i++) {
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



        for (var i = 0; i < userID.length; i++) {

            var chatElements = document.getElementById(`${i}`)
                .addEventListener('click', (e) => {
                    console.log(e.target.id)
                    chats.style.display = "none";
                    message.style.display = "flex";
                    companyName.innerHTML = user_name[Number(e.target.id)];
                    receiver = userID[Number(e.target.id)];
                    console.log('MyID: ' + myId)
                    console.log('Receiver ' + receiver)

                    var sender = [];
                    var messageReceiver = [];
                    var msg = [];
                    var messageLayout = document.getElementById("center");

                    firebase.database().ref("Chats/")
                        .on("value", function(dataSnapshot) {

                            dataSnapshot.forEach(function(childSnapshot) {

                                sender.push(childSnapshot.val().sender);
                                messageReceiver.push(childSnapshot.val().receiver);
                                msg.push(childSnapshot.val().message);
                            });



                            for (var i = 0; i < msg.length; i++) {

                                if (sender[i].localeCompare(myId)) {
                                    var messageLeft = document.createElement("div");
                                    var msgLeft = document.createElement("p");
                                    messageLeft.setAttribute("id", "messageLeft");
                                    msgLeft.setAttribute("id", "msgLeft");
                                    messageLayout.appendChild(messageLeft);
                                    messageLeft.appendChild(msgLeft);
                                    msgLeft.innerHTML = msg[i];
                                } else {
                                    var messageRight = document.createElement("div");
                                    var msgRight = document.createElement("p");
                                    messageRight.setAttribute("id", "messageRight");
                                    msgRight.setAttribute("id", "msgRight");
                                    messageLayout.appendChild(messageRight);
                                    messageRight.appendChild(msgRight);
                                    msgRight.innerHTML = msg[i];
                                }
                            }
                        });

                    console.log(msg)

                    var messageInput = document.getElementById("messageInput");

                    messageInput.addEventListener('keydown', (event) => {
                        if (event.keyCode == 13) {
                            var ref1 = firebase.database().ref("Chats/");
                            var ref2 = ref1.push();
                            var t = new Date();
                            ref2.set({
                                message: messageInput.value,
                                receiver: userID[Number(e.target.id)],
                                sender: myId,
                                time: t.getHours() + ":" + t.getMinutes()
                            }, (error) => {
                                if (!error) {
                                    messageInput.value = "";
                                }
                            });
                        }
                    })

                });
        }

        var backBtn = document.getElementById("backBtn")
            .addEventListener('click', (e) => {
                chats.style.display = "flex";
                message.style.display = "none";
            });



        user = document.getElementsByClassName("userName");
        msg = document.getElementsByClassName("message");
        tm = document.getElementsByClassName("time");
        for (var i = 0; i < userID.length; i++) {
            user[i].innerHTML = user_name[i];
            msg[i].innerHTML = "Hello everyone";
            tm[i].innerHTML = "6.00PM"
        }


    });














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
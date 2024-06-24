console.log("js");

const deletePasswords = (web) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    updatedarr = arr.filter((e) => {
        return e.Website != web;
    })
    localStorage.setItem("passwords", JSON.stringify(updatedarr));
    document.getElementById("alert").innerHTML = `<b>Password successfully deleted</b>`;
    document.getElementById("alert").style.color = "brown";
    displayAlert();
    showPasswords();
}
const showPasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    // reset the table first.
    tb.innerHTML = `<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
    </tr>`;
    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML += `<tr>
            <td colspan="4">No Data to show</td>
        </tr>`;
    } else {
        let arr = JSON.parse(data);
        for (let i = 0; i < arr.length; i++) {
            const e = arr[i];
            let str = `<tr>
            <td>${e.Website} <img onclick="copyText('${e.Website}')" src="copy.svg" alt="copy"></td>
            <td>${e.Username} <img onclick="copyText('${e.Username}')" src="copy.svg" alt="copy"></td>
            <td>${maskPassword(e.Password)} <img onclick="copyText('${e.Password}')" src="copy.svg" alt="copy"></td>
            <td><button class="delBtn" onclick="deletePasswords('${e.Website}')">Delete</button></td>
        </tr>`;
            tb.innerHTML += str;
        }
    }
    // Reset form
    Website.value = "";
    Username.value = "";
    Password.value = "";
}
showPasswords();

// logic to fill and empty the table
Submit.addEventListener("click", (e) => {
    e.preventDefault();
    let arr;
    if (localStorage.getItem("passwords") == null) {
        arr = [];
    } else {
        arr = JSON.parse(localStorage.getItem("passwords"));
    }
    if (!Website.value.includes(".") || Website.value.endsWith(".")) {
        document.getElementById("alert").innerHTML = "<b>Please enter a valid Website</b>";
        document.getElementById("alert").style.color = "red";
        displayAlert();
        return;
    }
    if (invalidUsername(Username.value)) {
        document.getElementById("alert").innerHTML = "<b>Please enter a valid Username</b>";
        document.getElementById("alert").style.color = "red";
        displayAlert();
        return;
    }
    if (Password.value == "") {
        document.getElementById("alert").innerHTML = "<b>Please enter a valid Password</b>";
        document.getElementById("alert").style.color = "red";
        displayAlert();
        return;
    }
    arr.push({ Website: Website.value, Username: Username.value, Password: Password.value });
    localStorage.setItem("passwords", JSON.stringify(arr));
    // show the message on the top.
    document.getElementById("alert").innerHTML = "<b>Password saved succesfully</b>";
    document.getElementById("alert").style.color = "blueviolet";
    displayAlert();
    showPasswords();
})

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            document.querySelector(".container span").style.display = "inline";
            setTimeout(() => {
                document.querySelector(".container span").style.display = "none";
            }, 1000);
        },
        () => {
            alert('copying failed');
        }
    )
}

function maskPassword(pass) {
    let str = "";
    for (let i = 0; i < pass.length; i++) {
        str += "*";
    }
    return str;
}

function displayAlert() {
    document.getElementById("alert").style.display = "block";
    setTimeout(() => {
        document.getElementById("alert").style.display = "none";
    }, 2000);
}

function invalidUsername(User) {
    let invalidUser = "";
    console.log("chala");
    for (let i = 0; i < User.length; i++) {
        invalidUser += " ";
    }
    return User == invalidUser;
}
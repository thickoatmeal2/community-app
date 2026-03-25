let currentUser = null;

// Load session
window.onload = () => {
const user = localStorage.getItem("currentUser");
if (user) {
currentUser = user;
showApp();
}
loadPosts();
};

function signUp() {
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

let users = JSON.parse(localStorage.getItem("users")) || [];

const exists = users.find(u => u.email === email);
if (exists) {
setMessage("User already exists");
return;
}

users.push({ email, password });
localStorage.setItem("users", JSON.stringify(users));

setMessage("Account created! You can sign in.");
}

function signIn() {
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

let users = JSON.parse(localStorage.getItem("users")) || [];

const user = users.find(u => u.email === email && u.password === password);

if (!user) {
setMessage("Invalid credentials");
return;
}

currentUser = email;
localStorage.setItem("currentUser", email);

showApp();
}

function signOut() {
currentUser = null;
localStorage.removeItem("currentUser");

document.getElementById("app-container").classList.add("hidden");
document.getElementById("auth-container").classList.remove("hidden");

setMessage("Signed out");
}

function showApp() {
document.getElementById("auth-container").classList.add("hidden");
document.getElementById("app-container").classList.remove("hidden");
}

function setMessage(msg) {
document.getElementById("message").innerText = msg;
}

function createPost() {
const text = document.getElementById("postInput").value;

if (!text) return;

let posts = JSON.parse(localStorage.getItem("posts")) || [];

posts.unshift({
user: currentUser,
content: text,
date: new Date().toLocaleString()
});

localStorage.setItem("posts", JSON.stringify(posts));

document.getElementById("postInput").value = "";
loadPosts();
}

function loadPosts() {
const container = document.getElementById("posts");
container.innerHTML = "";

let posts = JSON.parse(localStorage.getItem("posts")) || [];

posts.forEach(p => {
const div = document.createElement("div");
div.className = "post";
div.innerHTML = `<strong>${p.user}</strong><br>${p.content}<br><small>${p.date}</small>`;
container.appendChild(div);
});
}

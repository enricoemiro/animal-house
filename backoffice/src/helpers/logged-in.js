export function loggedIn(data) {
    if (data.user != null) {
        document.getElementById("logged-in").innerHTML = "Logged in as " + data.user.name
    } else {
        document.getElementById("logged-in").innerHTML = "Not logged"
    }
}
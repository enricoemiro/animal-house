import { logout } from "../api/logout.api"
import { me } from "../api/me.api";

export const logoutHandler = async (event) => {
    await logout();
    location.reload();
}

export const sessionHandler = async (event) => {
    const session = await me();
    if (session.user == null) {
        window.alert(`To access to Backoffice you must be logged in as ADMIN, click "Ok" to be redirected to login page.`)
        window.location.href = '/frontoffice/auth/login'
    } else if (session.user.role != 'ADMIN') {
        window.alert(`To access to Backoffice you must be logged in as ADMIN, click "Ok" to be redirected to your profile page.`)
        window.location.href = '/frontoffice/profile'
    }
    else {
        document.getElementById("logged-in").innerHTML = "Logged in as <u>" + session.user.email + "</u>"
    }
}

window.onload = async (event) => { await sessionHandler(event) }
document.getElementById('logout-nav').addEventListener("click", (event) => logoutHandler(event))
import { logout } from "../api/logout.api"
import { me } from "../api/me.api";

export const logoutHandler = async (event) => {
    await logout();
    location.reload();
}

export const sessionHandler = async (event) => {
    const session = await me();
    if ((session.user == null) || (session.user.role != 'ADMIN')) {
        window.location.href = '/frontoffice/auth/login'
    }
}

window.onload = async (event) => { await sessionHandler(event) }
document.getElementById('logout-nav').addEventListener("click", (event) => logoutHandler(event))
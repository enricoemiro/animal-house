import { logout } from "../api/logout.api"

export const logoutHandler = async (event) => {
    await logout();
    location.reload();
}

document.getElementById('logout-nav').addEventListener("click", (event) => logoutHandler(event))
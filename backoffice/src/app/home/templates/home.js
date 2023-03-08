import { html } from "common-tags";

let Home = {
    render: () => {
        return html`<main class="mt-5 pt-5">
                        <div class="vertical-center">
                                <div class="container">
                                        <h1 id="welcome" class="h2 text-center  fw-bold"></h1>
                                        <div class="text-center" id="buttons">
                                                <a title="Users" aria-label="Users" href="/backoffice/users"><button type="button"
                                                                class="btn btn-light align-middle m-1"
                                                                style="--bs-btn-font-size: 2rem;"><i
                                                                        class="fa-solid fa-users"></i></button></a>
                                                <a title="Board" aria-label="Board" href="html/board.html"><button type="button"
                                                                class="btn btn-light align-middle m-1"
                                                                style="--bs-btn-font-size: 2rem;"><i
                                                                        class="fa-solid fa-message"></i></button></a>
                                                <a title="Products" aria-label="Products" href="/backoffice/products"><button
                                                                type="button" class="btn btn-light align-middle m-1"
                                                                style="--bs-btn-font-size: 2rem;"><i
                                                                        class="fa-solid fa-bag-shopping"></i></button></a>
                                                <a title="Categories" aria-label="Categories"
                                                        href="html/categories.html"><button type="button"
                                                                class="btn btn-light align-middle m-1"
                                                                style="--bs-btn-font-size: 2rem;"><i
                                                                        class="fa-solid fa-list"></i></button></a>
                                                <a title="Activities" aria-label="Activities"
                                                        href="html/activities.html"><button type="button"
                                                                class="btn btn-light align-middle m-1"
                                                                style="--bs-btn-font-size: 2rem;"><i
                                                                        class="fa-solid fa-bell-concierge"></i></button></a>
                                                <a title="Head Offices" aria-label="Head Offices"
                                                        href="html/headOffices.html"><button type="button"
                                                                class="btn btn-light align-middle m-1"
                                                                style="--bs-btn-font-size: 2rem;"><i
                                                                        class="fa-solid fa-shop"></i></button></a>
                                        </div>
                                </div>
                        </div>
                    </main>`
    },
    after_render: async () => { }
};
export default Home
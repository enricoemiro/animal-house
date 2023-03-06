import { html } from 'common-tags';

import { searchbox } from '../../../helpers/searchbox';
import { deletePost } from '../api/delete-post.api';
import { getPosts } from '../api/get-posts.api';

let Board = {
  render: () => {
    return html`<main class="mt-5 pt-5">
      <h1 class="h2">All Posts</h1>
      <div span class="input-group mb-4">
        <input
          type="text"
          class="form-control rounded"
          placeholder="Search for posts"
          id="table-search"
          aria-label="Posts search bar"
        />
        <button
          title="Delete"
          aria-label="Delete"
          class="btn btn-outline-danger rounded border-0 mx-2"
          onclick="return deletePosts(event)"
          type="button"
        >
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
      <table class="table table-hover">
        <thead class="bg-light">
          <tr>
            <td scope="col">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                aria-label="Checkbox for following text input"
                id="check-all"
              />
            </td>
            <th scope="col">ID</th>
            <th scope="col">Author</th>
            <th scope="col">Created On</th>
            <th scope="col">Category</th>
            <td scope="col"></td>
            <td scope="col"></td>
          </tr>
        </thead>
        <tbody class="align-middle" id="table-body"></tbody>
      </table>
    </main>`;
  },
  after_render: async () => {
    // navbar active
    document.getElementById('board-nav').classList.add('active');
    searchbox();

    const posts = await getPosts();
    const renderPosts = () => {
      let table = ``;
      for (let post of posts) {
        table += `
                <tr id="${post.id}">
                    <td scope="row">
                        <input class="form-check-input" type="checkbox" value="" aria-label="checkbox to select row">
                    </td>
                    <td class="id">#${post.id}</td>
                    <td class="author">${post.user.name}</td>
                    <td class="date">${new Date(post.createdAt).toLocaleDateString()}</td>
                    <td class="subject"><span class="badge rounded-pill text-bg-primary">${
                      post.category != null ? post.category.replace(/_/g, ' ').toLowerCase() : '-'
                    }
                    </span></td>
                    <td><button type="button" class="btn btn-danger m-3 delete-post-btn">Delete Post</button></td>
                </tr>`;
      }
      return table;
    };

    const deletePostHandler = async (event) => {
      let id = event.target.closest('tr').id;
      await deletePost(id);
      location.reload();
    };

    document.getElementById('table-body').innerHTML = renderPosts();

    let deleteBtns = document.getElementsByClassName('delete-post-btn');
    for (let btn of deleteBtns) {
      btn.addEventListener('click', (event) => deletePostHandler(event));
    }
  },
};
export default Board;

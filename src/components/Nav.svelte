<script>
  import { logout } from '$api';
  import { loggedIn } from '$store';
  import { link,push } from 'svelte-spa-router';

  const uploadClick = () => {
    push('/upload');
  }
</script>

<style>
  .navbar {
    border-bottom: 1px solid #d3d3d3;
  }
</style>

<nav class="navbar is-white is-fixed-top" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="/" use:link>
      <h1 class="title is-1 has-text-grey">Pocket</h1>
    </a>

    <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="buttons">
          {#if !$loggedIn}
          <a class="button is-primary" href="/login" use:link>
            <strong>Log in</strong>
          </a>
          {:else}
          <button class="button is-primary is-rounded is-light" on:click="{uploadClick}">
            <span class="icon is-large">
              <ion-icon name="cloud-upload-outline"></ion-icon>
            </span>
            <span><strong>Upload</strong></span>
          </button>
          <a class="button is-light" on:click="{logout}">
            <strong>Log out</strong>
          </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
</nav>

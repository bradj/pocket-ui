<script>
  import { logout } from '$api';
  import { loggedIn } from '$store';
  import { link,push } from 'svelte-spa-router';
  import { loggedInUser, selectedUsername } from '$store';

  const uploadClick = () => {
    push('/upload');
  }

  const logoutClick = async () => {
    await logout();
  }

  const profileClick = () => {
    push(`/profile`);
  }

  const logoClick = () => {
    selectedUsername.set(null);
    push(`/`);
  }
</script>

<style>
  .navbar {
    border-bottom: 1px solid #d3d3d3;
  }
</style>

<nav class="navbar is-white is-fixed-top" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" on:click|preventDefault="{logoClick}" href="/" use:link>
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
          <div class="field has-addons">
            <p class="control">
              <button class="button is-rounded" on:click="{uploadClick}">
                <span class="icon">
                  <ion-icon name="cloud-upload-outline"></ion-icon>
                </span>
              </button>
            </p>
            <p class="control">
              <button class="button is-rounded" on:click="{profileClick}">
                <span class="icon">
                  <ion-icon name="person-outline"></ion-icon>
                </span>
              </button>
            </p>
            <p class="control">
              <button class="button is-rounded is-warning" on:click="{logoutClick}">
                <span class="icon">
                  <ion-icon name="log-out-outline"></ion-icon>
                </span>
                <span>Logout</span>
              </button>
            </p>
          </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</nav>

<script>
  import { updateProfile } from '$api';
  import { currentFeed,loggedInUser } from '$store';
  import { onDestroy } from 'svelte';
  import {formatDate} from '$root/util';
  
  const getTaglinePercentage = (input) => {
    if (!input) return 0;
    if (input.length > 120) return 100;

    return Math.round(input.length / 120 * 100);
  }

  const getTaglineProgressClass = () => {
    if (taglinePercentage > 90) return 'is-danger';
    if (taglinePercentage > 60) return 'is-warning';

    return 'is-success';
  }

  let email, avatarUrl, createdAt, updatedAt;
  let tagline = '';
  let taglinePercentage = getTaglinePercentage(tagline);
  let taglineProgressClass = getTaglineProgressClass();

  const unsubscribe = loggedInUser.subscribe(async (value) => {
    if (!value) return;

    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };

    email = value.email;
    tagline = value.tagline || '';
    avatarUrl = value.avatar;
    createdAt = formatDate(value.created_at, dateOptions);
    updatedAt = formatDate(value.updated_at, dateOptions);
	});

  const handleSave = async () => {
    await updateProfile($loggedInUser.username, tagline, email, null);
    const newUser = $loggedInUser;
    newUser.email = email;
    newUser.tagline = tagline;

    loggedInUser.set(newUser);
  };

  $: {
    taglinePercentage = getTaglinePercentage(tagline);
    taglineProgressClass = getTaglineProgressClass();
  }

  onDestroy(unsubscribe);
</script>

<style>
  
</style>

<div class="card has-background-white mb-6">
  <div class="card-content">
    <div class="columns">
      <div class="column is-half">
        <div class="media">
          <div class="media-left">
            <figure class="image is-128x128">
              <img id="avatar" src="{avatarUrl || '/woman.svg'}" alt="Woman">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-4">{$loggedInUser?.username || ''}</p>
            <p class="subtitle is-6">{tagline}</p>
          </div>
        </div>
        <div class="content">
          <div class="field">
            <label class="label">Email</label>
            <div class="control has-icons-left has-icons-right">
              <input class="input" type="email" placeholder="Email input" bind:value="{email}">
              <span class="icon is-small is-left">
                <ion-icon name="mail-outline"></ion-icon>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-exclamation-triangle"></i>
              </span>
            </div>
          </div>

          <div class="field">
            <label class="label">Tag Line</label>
            <div class="control">
              <textarea class="textarea" placeholder="Create a tag line!" bind:value="{tagline}"></textarea>
            </div>
            <progress class="progress {taglineProgressClass} mt-2" value="{taglinePercentage}" max="100">{taglinePercentage}%</progress>
          </div>

          <div class="field is-grouped is-grouped-right">
            <div class="control">
              <button class="button is-link is-info" on:click|preventDefault="{handleSave}">Save</button>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-half">
        <div class="level-item has-text-centered mb-6">
          <div>
            <p class="heading">Posts</p>
            <p class="title">{$currentFeed?.length}</p>
          </div>
        </div>
        <div class="level-item has-text-centered mb-6">
          <div>
            <p class="heading">Created On</p>
            <p class="title">{createdAt}</p>
          </div>
        </div>
        <div class="level-item has-text-centered mb-6">
          <div>
            <p class="heading">Last Updated</p>
            <p class="title">{updatedAt}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

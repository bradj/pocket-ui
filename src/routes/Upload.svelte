<script>
  import { createPost } from '$api';
  import { user } from '$store';
  import { push } from 'svelte-spa-router';

  let fileData, caption, fileObject;
  let fileName = 'No file selected';
	
	const onFileSelected = (e) => {
    fileObject = e.target.files[0];
    fileName = fileObject.name;
    
    let reader = new FileReader();
    reader.readAsDataURL(fileObject);

    reader.onload = e => {
      fileData = e.target.result
    };
  };

  const uploadFile = async () => {
    if (!fileObject) {
      return;
    }

    try {
      await createPost($user.username, fileObject, caption || '');
      push('/');
    } catch (error) {
      console.log('Error uploading file', error);
    }
  }
</script>

<div class="columns">
  <div class="column is-half">
    <div class="field">
      <div class="file has-name is-fullwidth is-info is-medium is-centered" id="file-uploader">
        <label class="file-label">
          <input class="file-input" type="file" accept=".jpg, .jpeg, .png" on:change={(e)=>onFileSelected(e)}>
          <span class="file-cta">
            <span class="icon is-large">
              <ion-icon name="cloud-upload-outline"></ion-icon>
            </span>
            <span class="file-label">
              {fileData ? 'Replace your file' : 'Choose a file'}
            </span>
          </span>
          <span class="file-name">
            {fileName}
          </span>
        </label>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <textarea class="textarea" placeholder="Create a caption!" bind:value="{caption}"></textarea>
      </div>
    </div>
    <div class="field">
      <button class="button is-link is-light" on:click="{uploadFile}">Create Post</button>
    </div>
  </div>
  <div class="column is-half">
    <figure class="image is-fullwidth">
      {#if fileData}
      <img src="{fileData}" alt="Image to be uploaded">
      {:else}
      <img src="/new_post.svg" alt="Create a new post">
      {/if}
    </figure>
  </div>
</div>

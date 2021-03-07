<script>
  
  import { Profiles } from '../api/profiles.js'

  export let key;
  export let profile;

  function deleteThisProfile() {
      Meteor.call("profiles.remove", profile._id);
  };
 
</script>
 
<li>
  <button class="delete" on:click={deleteThisProfile}>
    ×
  </button>
  { profile.name } - { profile.born }, { profile.gender } - {profile.username}

</li>

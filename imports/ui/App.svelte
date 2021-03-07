<script>
  import { Meteor } from "meteor/meteor";
  import { useTracker } from 'meteor/rdb:svelte-meteor-data';
  import { BlazeTemplate } from 'meteor/svelte:blaze-integration';
  import Profile from './Profile.svelte';
  import { Profiles } from '../api/profiles.js'

  let newProfileName = "";
  let newprofileBornDate = ""
  let newProfileGender = "";
  let newProfilePhone = "";
  let bedrooms = 0;
  let bathrooms = 0;
  let hasPets = false;
  let termsConditionsAccepted = false;
  let currentUser;

  $: profiles = useTracker(() => Profiles.find({}, { sort: { insertedAt: -1 } }).fetch());
  $: currentUser = useTracker(() => Meteor.user());


  function handleSubmit(event) {
    Meteor.call("profiles.insert", {
      name: newProfileName,
      born: newprofileBornDate,
      gender: newProfileGender,
      phone: newProfilePhone,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      hasPets: hasPets,
      termsConditionsAccepted: termsConditionsAccepted
    });

    // Clear form
    newProfileName = "";
    newprofileBornDate = ""
    newProfileGender = "";
    newProfilePhone = "";
    bedrooms = 0;
    bathrooms = 0
    hasPets = false;
    termsConditionsAccepted = false;
  };
 

</script>
 
 
<div class="container">
  <header>
    <h1>Profiles</h1>
    <BlazeTemplate template="loginButtons" />
    {#if $currentUser}
      <form class="new-profile" on:submit|preventDefault={handleSubmit}>
        <input type="text" placeholder="Nombre" bind:value={newProfileName} />
        <input type="date" placeholder="Fecha de nacimiento" bind:value={newprofileBornDate} />

        <select name="gender" bind:value={newProfileGender}>
          <option value="">--Selecciona una opción--</option>
          <option value="H">Hombre</option>
          <option value="M">Mujer</option>
        </select>

        <input type="text" placeholder="Número de teléfono" bind:value={newProfilePhone} />
        <input type="number" placeholder="Cuartos" step="1" bind:value={bedrooms} />
        <input type="number" placeholder="Baños" step="1" bind:value={bathrooms} />

        <div>
          <input type="checkbox" bind:value={hasPets}>
          <label for="scales">Tiene Mascotas</label>
        </div>

        <div>
          <input type="checkbox" bind:value={termsConditionsAccepted}>
          <label for="scales">Aceptar terminos y condiciones</label>
        </div>

        <button type="submit">+</button>
      </form>
    {/if}
  </header>
  <ul>
  {#each $profiles as profile}
    <Profile
      key={profile._id}
      profile={profile}
    />
  {/each}
  </ul>
</div>
 
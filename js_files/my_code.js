// Obtain a reference to the platformClient object
const platformClient = require('platformClient');

// Sets the environment to Dublin

const client = platformClient.ApiClient.instance;
client.setEnvironment("mypurecloud.ie");

// Keep using the same token
client.setPersistSettings(true);


// Authenticate then update the presence on the page
client.loginImplicitGrant("10b85dde-54ad-4bb1-b0b0-e80c29b39e4e", "https://www.google.co.uk/", { state: "TEST" })
  .then(() => {
    console.log('Logged-In');
    getMyUserId("presence");
  })
  .catch((err) => {
    // Handle failure response
    console.log(err);
  });

async function presenceDef(presenceId) {

  // Gets the Presence name from the Presence ID

  const presenceAPI = new platformClient.PresenceApi();
  let presence;
  presence = await presenceAPI.getPresencedefinition(presenceId);
  console.log(presence);
  document.getElementById("mypresence").innerHTML = presence.languageLabels.en;
  document.getElementById("primarypresence").innerHTML = presence.systemPresence;
}

async function getMyUserId(expand) {
  // Get Users Me
  const usersApi = new platformClient.UsersApi();
  let user;
  try {
    user = await usersApi.getUsersMe({ 'expand': [expand] });
    //user = await usersApi.getUsersMe();
  } catch (error) {
    console.error(error);
    return;
  }
  console.log('User:', user);
  console.log('User id:', user.id);
  console.log('Presence id: ', user.presence.presenceDefinition.id);
  document.getElementById("myname").innerHTML = user.name;
  presenceDef(user.presence.presenceDefinition.id);
}

async function ChangePresence(newPresenceId) {
  const usersApi = new platformClient.UsersApi();
  const presenceApi = new platformClient.PresenceApi();

  let user;

  //get the user information
  try {
    user = await usersApi.getUsersMe()

  } catch (error) {
    console.error(error);
    return;
  }

  // update the user presence

  try {
    let draft_body = {
      "presenceDefinition": {
        "id": newPresenceId
      }
    }
    presenceApi.patchUserPresence(user.id, 'PURECLOUD', draft_body);
    getMyUserId('presence');
  } catch (error) {
    console.error(error);
    return;
  }

}

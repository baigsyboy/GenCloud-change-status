// Create API instance
const usersApi = new platformClient.UsersApi();

// Authenticate
client.loginImplicitGrant(clientId, redirectUri)
  .then(() => {
    // Make request to GET /api/v2/users/me?expand=presence
    return usersApi.getUsersMe({ 'expand': ["presence"] });
  })
  .then((userMe) => {
    // Handle successful result
    console.log(`Hello, ${userMe.name}!`);
  })
  .catch((err) => {
    // Handle failure response
    console.log(err);
  });

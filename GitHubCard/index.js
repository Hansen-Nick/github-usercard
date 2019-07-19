/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/


/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/
axios.get('https://api.github.com/users/Hansen-Nick')
  .then( response => {
    new cardCreator(response.data);
  })
  .catch( error => {
    console.log('Error: '+ error)
  })
/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];

followersArray.forEach((username) => {
  axios.get(`https://api.github.com/users/${username}`)
  .then( response => {
    new cardCreator(response.data);
  })
  .catch( error => {
    console.log('Error: '+ error)
  })
})

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
function newCard(cardInfo) {
  let outerDiv = document.createElement('div');
  outerDiv.classList.add('card')
  let userImg = document.createElement('img');
  userImg.src = cardInfo.avatar_url;
  let innerDiv = document.createElement('div')
  innerDiv.classList.add('card-info')
  let name = document.createElement('h3');
  name.classList.add('name');
  name.textContent = cardInfo.name;
  let username = document.createElement('p');
  username.classList.add('username');
  username.textContent = cardInfo.login;
  let location = document.createElement('p');
  location.textContent = `Location: ${cardInfo.location}`;
  let profile = document.createElement('p');
  profile.textContent = 'Profile: '
  let githubaddress = document.createElement('a');
  githubaddress.href = cardInfo.url
  let followers = document.createElement('p');
  followers.textContent = cardInfo.followers;
  let following = document.createElement('p');
  following.textContent = cardInfo.following;
  let bio = document.createElement('p');
  bio.textContent = cardInfo.bio;

  outerDiv.appendChild(userImg);
  outerDiv.appendChild(innerDiv);
  innerDiv.appendChild(name);
  innerDiv.appendChild(username);
  innerDiv.appendChild(location);
  innerDiv.appendChild(profile);
  profile.appendChild(githubaddress);
  innerDiv.appendChild(followers);
  innerDiv.appendChild(following);
  innerDiv.appendChild(bio);

  return outerDiv
}

class cardCreator {
  constructor(cardInfo) {
    const cardDiv = document.querySelector('.cards');
    
    cardDiv.appendChild(newCard(cardInfo));
  }
}
/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

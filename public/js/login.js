// Get the modal https://www.w3schools.com/howto/howto_css_login_form.asp
const modal = document.getElementById('id01');

const usernameField = document.getElementById('uname');
const passwordField = document.getElementById('psw');
const submitBtn = document.querySelector('.submitbtn');
const loginBtn = document.getElementById('loginbutton');
const qUrl = 'https://env-3595870.jelastic.metropolia.fi/graphql';


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

submitBtn.addEventListener("click", async (e) => {
   e.preventDefault();
   const username = usernameField.value;
   const pass = passwordField.value;
   const loginQuery = {
       query: `
       {
        login(username:"${username}", password:"${pass}") {
            token
            }
        }
       `
   };
   const resp = await fetch(qUrl, {
       method: 'POST',
       headers: {'Content-Type': 'application/json'},
       body: JSON.stringify(loginQuery)
   });
   const respJson = await resp.json();

   if (respJson.data.login !== null) {
       window.localStorage.setItem('token', respJson.data.login.token);
       usernameField.value = '';
       passwordField.value = '';
       modal.style.display = 'none';
       loginBtn.style.display = 'none';
   } else {
       alert('Check login details');
   }

});

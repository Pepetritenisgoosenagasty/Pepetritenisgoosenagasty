console.log("client side of the web page");


const weatherForm =document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.getElementById('msg-1');
const msg2 = document.getElementById('msg-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
     const location = search.value;
     
     msg1.textContent = 'Loading...';
     msg2.textContent = '';

     fetch(`/weather?address=${location}`).then((response) => {
    response.json()
            .then((data) => {
                if(data.error) {
                    msg1.textContent = data.error;
                }else {
                   msg1.textContent = data.location;
                    msg2.textContent = data.forcast;
                }
            });           
});

});
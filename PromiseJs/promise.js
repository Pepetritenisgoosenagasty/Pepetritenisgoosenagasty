const doworkPromise = new Promise((resolve, reject) => {
   setTimeout(()=> {
    // resolve([1,2,3,4])
    reject('Something went wrong');
   }, 2000);
});


doworkPromise.then((response) => {
    console.log(response)
}).catch((err) => {
    console.log("Error! ", err);
})
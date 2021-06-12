const drawCallback = (callback) => {
    setTimeout(()=> {
        callback('This my error', undefined);
    }, 2000);
}


drawCallback((error, result) => {
    if (error) {
        return console.log(error);
    }

    console.log(result)
})
const stringGenerator = (length) => {
    const stringInputs = 'abcdefghijklmnopqrstuvwxyz';
    let randomString = '';
    
    for(let index = 0; index < length; index++) {
        randomString += stringInputs[Math.floor(Math.random() * stringInputs.length)];
    }

    return randomString;

}

export default stringGenerator;
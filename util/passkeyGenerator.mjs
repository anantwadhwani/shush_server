const passkeyGenerator = (length) => {
    const numberInputs = '0123456789';
    let passkey = '';
    for(let index = 0; index < length; index++) {
        passkey += numberInputs[Math.floor(Math.random() * numberInputs.length)];
    }

    return passkey;
}

export default passkeyGenerator;
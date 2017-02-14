


export const authKey = () => {
    const timestamp = new Date().getTime();
    const str = `${timestamp}!_!epiqvr_success!_!${timestamp}`;
    return encodeURIComponent(encrypt(str));
};



export const snsLoginKey = (userEmail) => {
    const timestamp = new Date().getTime();
    const str = `${timestamp}!_!${userEmail}!_!${timestamp}`;
    const str2 = encrypt(str);
    const str3 = encodeURIComponent(str2);
    return str3;
};


const encrypt = (value) => {
    const key = CryptoJS.enc.Hex.parse('6570697176725f737563636573735f21');
    const text = CryptoJS.AES.encrypt(value, key, { mode: CryptoJS.mode.CBC, iv: key, padding: CryptoJS.pad.Pkcs7  });
    // const text = CryptoJS.AES.encrypt(value, key, { iv: key  });

    return text.toString();
};

export default encrypt;





// // var key = CryptoJS.enc.Utf8.parse('epiqvr_success_!');
// var key = CryptoJS.enc.Hex.parse('6570697176725f737563636573735f21');
// var iv = key;
// console.log(key.toString());
// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt('seongjong.jeon@epiqvr.com', key, { mode:    CryptoJS.mode.CBC, iv: iv, padding: CryptoJS.pad.Pkcs7  });
// console.log(ciphertext.toString());
//
// // Decrypt
// var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), key, { mode:    CryptoJS.mode.CBC, iv: iv , padding: CryptoJS.pad.Pkcs7 });
// var plaintext = bytes.toString(CryptoJS.enc.Utf8);
//
// console.log(plaintext);

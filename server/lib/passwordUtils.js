const crypto = require('crypto');

function genPassword(password){
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash=crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex');
    return {
        salt:salt,
        hash:genHash
    };
}

function validPasssword(password,hash,salt){
    var verifyHash = crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex');
    return hash===verifyHash;
}

module.exports.validPasssword=validPasssword;
module.exports.genPassword=genPassword;
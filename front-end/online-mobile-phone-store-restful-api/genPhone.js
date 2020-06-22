var phones =
    `SAMSUNG,Galaxy A40 - 64 GB,€259.99
    APPLE,iPhone 11 - 64 GB,€829.00
    HUAWEI,P30 Lite - 128 GB,€399.99
    HUAWEI,P Smart (2019) - 64 GB,€239.99
    SAMSUNG,Galaxy A51 - 128 GB,€399.99
    SAMSUNG,Galaxy S20 - 128 GB,€929.00
    GOOGLE,Pixel 3a - 64 GB,€399.00
    APPLE,iPhone XR - 64 GB,€729.00`.split(/\n/);


// set up protytype for random selection from array
Array.prototype.phones = function () {
    var phones = [];
    for (var i = 0; i < this.length; i++) {
        phones.push({
            manufacturer: this[i].split(',')[0].trim(),
            model: this[i].split(',')[1],
            price: this[i].split(',')[2],
        });

    }
    return phones;
}

function getRandomPhone() {
    return phones.phones();
}

module.exports = getRandomPhone;

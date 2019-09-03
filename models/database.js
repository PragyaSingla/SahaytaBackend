let mongoose = require('mongoose');
const config = require("config");

const server = '127.0.0.1:27017';
const database_name = 'sahayta';


//use config module to get the privatekey, if no private key set, end the application
if (!config.get("myprivatekey")) {
    console.error("FATAL ERROR: myprivatekey is not defined.");
    process.exit(1);
}

mongoose.connect(`mongodb://${server}/${database_name}`, { useNewUrlParser: true }, function (err, res) {
    if (err) {
        console.log('Database connection error')
    } else {
        console.log('Database connection successfull')
    }
});


module.exports = mongoose;


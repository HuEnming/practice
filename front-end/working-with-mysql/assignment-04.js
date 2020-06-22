// Development and testing environment: Manjaro Linux, Firefox 74.0 (64-bit)

/*
the program will connect to the remote database and create two tables, they are user table and address table. Some user information can be randomly generated with home address and shipping address. After that, a user will be retrieved and then its title, mobile, email and home address will be updated. The result will display in terminal. Finally， all data and table will be deleted.

mysql package is needed when running the programe, you may need to execute npm install or npm install mysql.
*/

var mysql = require('mysql');
var getRandomName = require('./genName');
var getRandomAddress = require('./genAddress');
var getRandomOther = require('./genOther');

//database connection information
var con = mysql.createConnection({
  host: "remotemysql.com",
  user: "TPTAPlS9i2",
  password: "GfqS0u7sSe",
  database: "TPTAPlS9i2"
});

//test connect (only for testing)
var testConnection = () => {
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("SHOW TABLES FROM TPTAPlS9i2", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      console.log(getRandomName())
    });
  });
}

//create user table and address table, 
//setting user_no and address_id as PRIMARY KEY and let thenm increase automatically
var createTables = () => {
  con.query(`CREATE TABLE \`user\` (
    \`user_no\` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    \`title\` varchar(15) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
    \`first_name\` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
    \`last_name\` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
    \`mobile\` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
    \`email\` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
    \`home_address_id\` int(11) DEFAULT NULL,
    \`shipping_address_id\` int(11) DEFAULT NULL,
    \`date_stamp\` datetime NOT NULL
  )AUTO_INCREMENT = 1000 ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;`
    , function (err, result, fields) {
      if (err) throw err;
      console.log("-----------------------");
      console.log("User table has been created.");
    });
  con.query(`CREATE TABLE \`address\` (
    \`address_id\` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    \`line1\` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
    \`line2\` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
    \`town\` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
    \`city\` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
    \`eircode\` varchar(10) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
    \`address_type\` varchar(10) COLLATE utf8_unicode_ci NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;`
    , function (err, result, fields) {
      if (err) throw err;
      console.log("Address table has been created.");
    });
}

//create some users
//parameter: amount, the number of user
var createUser = async (amount) => {
  for (var i = 0; i < amount; i++) {
    //get title, mobile and email
    var other = getRandomOther();
    //get first name and last name
    var name = getRandomName();
    //get a random address and insert it into address table as home address
    var homeAddress = await createAddress(getRandomAddress(), 'home');
    //get a random address and insert it into address table as shipping address
    var shippingAddress = await createAddress(getRandomAddress(), 'shipping');

    //console.log("INSERT INTO `user`(`title`, `first_name`, `last_name`, `mobile`, `email`, `home_address`, `shipping_address`, `date_stamp`) VALUES ('" + other.title + "','" + name.firstname + "','" + name.lastName + "','" + other.mobile + "','" + other.email + "'," + homeAddress + "," + shippingAddress + ",NOW())")-----------------test code

    //insert users into table
    con.query("INSERT INTO `user`(`title`, `first_name`, `last_name`, `mobile`, `email`, `home_address_id`, `shipping_address_id`, `date_stamp`) VALUES ('" + other.title + "','" + name.firstName.replace('\'', '\\\'') + "','" + name.lastName.replace('\'', '\\\'') + "','" + other.mobile + "','" + other.email + "'," + homeAddress + "," + shippingAddress + ",NOW())", function (err, result, fields) {
      if (err) throw err;
      //result.forEach(value=>console.log(value))
    });
  }
  console.log("-----------------------");
  console.log(amount + " users were created successfully. ");
}

//insert an address into table
var createAddress = (address, type) => {
  con.query("INSERT INTO `address`(`line1`, `line2`, `town`, `city`, `eircode`, `address_type`) VALUES ('" + address.line1 + "','" + address.line2 + "','" + address.town + "','" + address.city + "','" + address.eircode + "','" + type + "')", function (err, result, fields) {
    if (err) throw err;
  });

  return new Promise(function (resolve, reject) {
    con.query("SELECT LAST_INSERT_ID() AS maxId", (err, result, fields) => {
      if (err) throw err;
      //console.log(result[0].maxId)
      resolve(result[0].maxId)
    });
  });

}

//randomly get a user with home address and shipping address
var retrieveUser = () => {
  return new Promise(function (resolve, reject) {
    con.query("SELECT u.user_no,u.title,u.first_name,u.last_name,u.mobile,u.email,a.line1 AS h_line1,a.line2 AS h_line2,a.town AS h_town,a.city AS h_city,a.eircode AS h_eircode,b.line1 AS s_line1,b.line2 AS s_line2,b.town AS s_town,b.city AS s_city,b.eircode AS s_eircode FROM `user` u INNER JOIN `address` a ON u.home_address_id = a.address_id INNER JOIN `address` b on u.shipping_address_id = b.address_id ", function (err, result, fields) {
      if (err) throw err;
      var user = result[Math.floor(Math.random() * result.length)]
      console.log("-----------------------");
      console.log("Randomly get an user");
      console.log(user);
      resolve(user)
    });
  });
}

//update user's title, email, mobile and home address
var updateUser = async (id) => {
  //get new titel, email and mobile
  var other = getRandomOther();
  //get home address and insert it into table
  var homeAddress = await createAddress(getRandomAddress(), 'home');
  console.log("New home address has been created")
  //get old address id
  var oldAddressId = await new Promise(function (resolve, reject) {
    con.query("SELECT * FROM `user` WHERE user_no = " + id, function (err, result, fields) {
      if (err) throw err;
      resolve(result[0].home_address_id)
    });
  });
  //console.log("oldAddressId:"+oldAddressId)
  //delete old home address
  con.query("DELETE FROM `address` WHERE address_id = " + oldAddressId, function (err, result, fields) {
    if (err) throw err;
  });
  console.log("Old home address has been deleted")
  //update user info
  con.query("UPDATE `user` SET `title`='" + other.title + "',`mobile`='" + other.mobile + "',`email`='" + other.email + "',`home_address_id`= " + homeAddress + ",`date_stamp`=NOW() WHERE user_no = " + id, function (err, result, fields) {
    if (err) throw err;
  });

  //get new user info
  con.query("SELECT u.user_no,u.title,u.first_name,u.last_name,u.mobile,u.email,a.line1 AS h_line1,a.line2 AS h_line2,a.town AS h_town,a.city AS h_city,a.eircode AS h_eircode,b.line1 AS s_line1,b.line2 AS s_line2,b.town AS s_town,b.city AS s_city,b.eircode AS s_eircode FROM `user` u INNER JOIN `address` a ON u.home_address_id = a.address_id INNER JOIN `address` b on u.shipping_address_id = b.address_id WHERE u.user_no =" + id, function (err, result, fields) {
    if (err) throw err;
    var user = result[0]
    console.log("-----------------------");
    console.log("After the update :")
    console.log(user);
  });
}

//delete all user and their address
var deleteUser = () => {
  con.query("DELETE FROM `address` WHERE address_id IN (SELECT home_address_id FROM user UNION SELECT shipping_address_id FROM user)", function (err, result, fields) {
    if (err) throw err;
  });
  con.query("DELETE FROM `user`", function (err, result, fields) {
    if (err) throw err;
    console.log("-----------------------");
    console.log(result.affectedRows + " users were deleted")
  });

}

//delete user table and address table
var deleteTables = () => {
  con.query("DROP TABLE `user`,`address`", function (err, result, fields) {
    if (err) throw err;
    console.log("-----------------------");
    console.log("Tables were droped")
    console.log("-----------------------");
  });
}

//call the functions orderly
var main = async () => {
  createTables();
  await createUser(5);
  var user = await retrieveUser();
  await updateUser(user.user_no);
  await deleteUser();
  await deleteTables();
  await con.end();
}

//run programe
main();



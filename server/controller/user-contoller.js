const mysql = require("mysql");

const getAllUser = async (req, res, next) => {
    try {
        const con = mysql.createConnection({
            host: "sql6.freesqldatabase.com",
            user: "sql6588164",
            password: "3YHgNyVLEg",
            database: "sql6588164"
        });

        con.connect(function (err) {
            if (err) return res.status(400).json({ err });
            console.log("Connected!");
            con.query("SELECT * FROM Users_Information", function (err, result, fields) {
                if (err) return res.status(400).json({ err });
                return res.status(200).json({ result });

            });
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "API is failed for the given input" });
    }
}

const signUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        console.log("response",name,"name", email,"email", password,"password")
        if(!name || !email || !password){
            return res.status(400).json({ message: "Missing mandatory fields" });
        }
        if(name) {
            const validRegex = /^[A-Za-z0-9]+$/;
            console.log(validRegex.test(name))
            if(!validRegex.test(name)){
                return res.status(400).json({ message: "Name can use only letters and numbers"});
            }
        }
        if(email) {
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(!email.match(validRegex)){
                return res.status(400).json({ message: "Not a valid email address"});
            }
        }
        if(password) {
            const regularExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
            if(!regularExpression.test(password)){
                return res.status(400).json({ message: "Password contain 8 letters with special characters"});
            }
        }
        let config = {
            host: "sql6.freesqldatabase.com",
            user: "sql6588164",
            password: "3YHgNyVLEg",
            database: "sql6588164"
        }
        const con = mysql.createConnection(config);
        con.connect(function (err){
            if (err){
                return res.status(400).json({ err });
            }
            console.log('connected')
            con.query(`SELECT * FROM Users_Information where Email = "${email}"`, function (err, result, fields) {
                if (err) {
                    return res.status(400).json({ err });
                }
                if (result.length) {
                    return res.status(400).json({ message: "User is already exists!" });
                }    
            });
            const sql = `INSERT INTO Users_Information (Email, User_Name, Password) VALUES ("${name}","${email}","${password}")`
            con.query(sql, function (err, result){
                if (err) {
                    return res.status(400).json({ err });
                }
                return res.status(201).json({ message: "User Details saved successfully" });
            });   
        });
    }
    catch (err) {
        console.log('err',err);
        return res.status(500).json({ message: "API is failed for the given input" });
    }
}

const logIn = async(req,res,next) => {
    try {
        const { email, password } = req.body;
        console.log("response", email,"email", password,"password")
        if(!email || !password){
            return res.status(400).json({ message: "Missing mandatory fields" });
        }
        if(email) {
            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(!email.match(validRegex)){
                return res.status(400).json({ message: "Please enter valid email address"});
            }
        }
    
        let config = {
            host: "sql6.freesqldatabase.com",
            user: "sql6588164",
            password: "3YHgNyVLEg",
            database: "sql6588164"
        }
        const con = mysql.createConnection(config);
        con.connect(function (err){
            if (err){
                return res.status(400).json({ err });
            }
            console.log('connected')
            con.query(`SELECT * FROM Users_Information where Email = "${email}" and Password = "${password}"`, function (err, result, fields) {
                if (err) {
                    return res.status(400).json({ err });
                }
                if (result.length) {
                    return res.status(200).json({ message: "User login successfully" });
                }    
                else {
                    return res.status(400).json({ message: "Invalid Username or Password" });
                }
            }); 
        });
    }
    catch (err) {
        console.log('err',err);
        return res.status(500).json({ message: "Invalid Password" });
    }
}
// const deleteUser = async(req,res,next) => {
//     try {
//         const email = req.query.email;
//         if(!email){
//             return res.status(400).json({ message: "Email is Not Valid" });
//         }
//         let config = {
//             host: "sql6.freesqldatabase.com",
//             user: "sql6588164",
//             password: "3YHgNyVLEg",
//             database: "sql6588164"
//         }
//         const con = mysql.createConnection(config);
//         con.connect(function (err){
//             if (err){
//                 return res.status(400).json({ err });
//             }
//             con.query(
//                 `DELETE FROM Users_Information WHERE Email = "${email}"`,
//                 function (err, result) {
//                   if (err) {
//                     return res.status(400).json({ err });
//                   }
//                   if (result) {
//                     return res.status(200).json({ message: "User deleted successfully" });
//                   } else {
//                     return res.status(400).json({ message: "Invalid email or password" });
//                   }
//                 });
//             });
//           } catch (err) {
//             console.log("err", err);
//             return res.status(500).json({ message: "Error deleting user" });
//           }
//         };

module.exports = { getAllUser, signUp, logIn};
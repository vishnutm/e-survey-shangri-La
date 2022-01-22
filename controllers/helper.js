/**
 * Controller to bcrypt password and check password
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Helper = {
    /**
     * Hash Password Method
     * @param {string} Password
     * @return {string} returns hashed password
     */
     hashPassword(password) {
         return bcrypt.hashSync(password,bcrypt.genSaltSync(8))
     },
     /**
      * comparePassword
      * @param {string} hashPassword
      * @param {string} password
      * @returns {Boolean} return True or False
      */
     comparePassword(hashPassword, password) {
         return bcrypt.compareSync(password,hashPassword);
     },
     /**
      * isValidEmail helper method
      * @param {string} email
      * @returns {Boolean} True or False 
      */
     isValidEmail(email) {
         return /\S+@\S+\.\S+/.test(email);
     },
     /**
      * Gnerate Token
      * @param {String} id
      * @returns {string} token
      */
     generatetoken(id) {
         const token =jwt.sign({
             userId: id
         },
            process.env.SECRET,{ expiresIn: '7d'}
         );
         return token;
     }
}
module.exports = Helper;
const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

UserSchema.methods.encryptPassword = async function(password) {
    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.machPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = model('User', UserSchema)
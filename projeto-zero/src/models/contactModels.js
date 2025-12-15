const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const contactSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    telephone: {
        type: String,
        require: true
    }
})

const contactModel = mongoose.model('contact', contactSchema);

function ContactRegister(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
}

ContactRegister.prototype.register = async function () {
    this.valid();
    if (this.errors.length > 0) return;
    console.log(this.body)
    this.contact = await contactModel.create(this.body)
}

ContactRegister.prototype.valid =function () {
    this.cleanData();

    if(!this.body.name) this.errors.push('Digite o nome do contato, campo obrigatorio!');
    if(!this.body.email && !this.body.telephone) this.errors.push('Digite o email ou o telefone do contato, campo obrigatorio!');
}

ContactRegister.prototype.cleanData = function () {
    this.body = {
        name: this.body.name,
        surname: this.body.surname,
        email: this.body.email,
        telephone: this.body.telephone
    }

    for (const key in this.body) {
        if (typeof key !== 'string') {
            this.body[key] = '';
        }
    }
}

module.exports = ContactRegister;
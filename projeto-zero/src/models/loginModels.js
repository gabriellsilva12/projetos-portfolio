const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const loginSchema = new Schema({
    user: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
})

const loginModel = mongoose.model('login', loginSchema);

class registerUser {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register() {
        this.valid()
        if (this.errors.length > 0) return;

        this.checkUser()
        if (this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt)
        try {
            this.user = await loginModel.create(this.body);
        } catch(e) {
            console.log(e);
        }
    }
 
    async checkUser() {
        this.user = await loginModel.findOne({ email: this.body.email })
        if(this.user.email === this.body.email) this.errors.push('Já existe um usuario com este email!');
    }

    valid() {
        this.cleanUp()

        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido!');
        if(this.body.password.length < 3 || this.body.password.length > 50) this.errors.push('A senha precisa ter entre 3 e 50 caracteres.')
    }

    cleanUp() {
        this.body = {
            user: this.body.user,
            email: this.body.email,
            password: this.body.password
        }

        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }
    }
}



class loginUser {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register() {
        
        await this.checkUser();
        if (this.errors.length > 0) return;
    } 

    async checkUser() {

        this.cleanUp()
        if(!this.body.email && !validator.isEmail(this.body.email)) return this.errors.push('E-mail inválido!');
        
        this.user = await loginModel.findOne({ email: this.body.email });
        console.log(this.user)
        
        if(!this.user) return this.errors.push('Não existe usuário com este email!');
        const userPassword = await !bcryptjs.compareSync( this.body.password, this.user.password);
        if(userPassword) this.errors.push('Senha inválida, por favor tente novamente!');
    }

    cleanUp() {
        this.body = {
            user: this.body.user,
            email: this.body.email,
            password: this.body.password
        }

        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }
    }
}

module.exports = { registerUser, loginUser };

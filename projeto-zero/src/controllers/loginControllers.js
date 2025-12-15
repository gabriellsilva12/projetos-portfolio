const { registerUser, loginUser } = require('../models/loginModels')

exports.index = (req,res) => { // rota cadastro
    res.render('index');
};

exports.register = async (req,res) => { // rota cadastro
    
    try { 
        const createUser = new registerUser(req.body)
        await createUser.register()
        
        if(createUser.errors.length > 0) {
            req.flash('registerError', createUser.errors)
            req.session.save(function() {
                res.redirect('/login');
                return;
            })
            return;
        }
        
        req.flash('registerSuccess', `Usuário ${this.body.user} criado com sucesso!`)
        req.session.save(function() {
            res.redirect('/login')
            return;
        })
    } catch(e) {
        console.log(e)
    }
};


exports.login = async (req,res) => { // rota cadastro
    try { 
        const login = new loginUser(req.body)
        await login.register()
        
        if(login.errors.length > 0) {
            req.flash('loginError', login.errors)
            req.session.save(function() {
                console.log(login.errors)
                res.redirect('/login');
                return;
            })
            return;
        }
        
        req.flash('loginSuccess', 'Bem vindo, login feito com sucesso!')
        req.session.user = login.user
        req.session.save(function() {
            res.redirect('/agenda')
            return;
        })
    } catch(e) {
        console.log(e)
    }
};

exports.agendaIndex = (req,res) => { 
    res.render('agenda');
};

exports.output = (req,res) => { 
    req.session.destroy()
    res.redirect('/login');
};
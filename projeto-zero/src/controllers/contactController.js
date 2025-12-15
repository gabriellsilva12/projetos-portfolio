const ContactRegister = require('../models/contactModels');

exports.indexcontact = (req, res) => {
    res.render('contact')
}

exports.ContactRegister = (req, res) => {
    const contact = new ContactRegister(req.body);
    contact.register()
    if(contact.errors.length > 0) {
        req.flash('registerError', contact.errors);
        req.session.save(function() {
            res.redirect('/contact')
            return
        })
        return
    }
    req.flash('registerSuccess', 'Usuário criado com sucesso!')  
    req.session.save(function() {
        res.redirect('/contact')
    })  
}



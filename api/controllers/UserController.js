/**
 * UserController
 * @Created by: Kid
 * @Initial date: 10/23/2015
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
    'signup': function (req, res) {
        res.view();
    },

    create: function (req, res, next) {
        User.create(req.params.all(), function userCreated(err, user) {
            if (err) {
                console.log(err);
                req.session.flash = {
                    err: err
                }
                return res.redirect('/user/signup');
            }
            res.redirect('/user/one/' + user.id);
        });
    },
    
    one: function(req, res, next){
        User.findOne(req.param('id'), function foundUser(err, user){
           if(err) return next(err);
           if(!user) return next();
           res.view({
               user: user
           }); 
        });
    },
    
    index: function(req, res, next){
        User.find(function foundUsers(err, users){
           if(err) return next(err);
           res.view({
               users: users
           }); 
        });
    },
    
    findtoaction: function(req, res, next){
        User.findOne(req.param('id'), function foundUser(err, user){
            if(err) return next(err);
            if(!user) return next('User doesn\'t exists.');
            res.view({
                user: user
            });
        });
    },
    
    update: function(req, res, next){
        User.update(req.param('id'), req.params.all(), function userUpdated(err){
            if(err){
                return res.redirect('/user/update/' + req.param('id'));
            }
            res.redirect('/user/one/' + req.param('id'));
        });
    },
    
    destroy: function(req, res, next){
        User.findOne(req.param('id'), function foundUser(err, user){
            if(err) return next(err);
            if(!user) return next('User doesn\'t exists.');
             User.destroy(req.param('id'), function userDestroyed(err){
                 if(err) return next(err);
                 console.log('deleted a record have id is: ' + req.param('id'));
             });
            res.redirect('/user');
        });
    }
};


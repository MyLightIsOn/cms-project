var keystone = require('keystone'),
    async = require('async');

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res),
        locals = res.locals;

    // Set locals
    locals.section = 'home';
    locals.filters = {
        home: req.params.home
    };
    locals.data = {
        homes: []
    };

    // Load the current post
    view.on('init', function(next) {

        var q = keystone.list('Home').model.findOne({
            state: 'published',
            slug: locals.filters.home
        }).populate('author categories');

        q.exec(function(err, result) {
            locals.data.home = result;
            next(err);
        });

    });

    // Load other posts
    view.on('init', function(next) {

        var q = keystone.list('Home').model.find().where('state', 'published').sort('-publishedDate').populate('author').limit('4');

        q.exec(function(err, results) {
            locals.data.homes = results;
            next(err);
        });

    });

    // Render the view
    view.render('home');

};

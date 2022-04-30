/**
 *  checks if the req.body is defined, if not returns next(), 
 *  otherwise saves the datas ( if there is no error while communicating with db )
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const autoModel = requireOption(objectrepository, 'autoModel');

    return function (req, res, next) {
        
        if  ((typeof req.body.marka === 'undefined' ||
            typeof req.body.model === 'undefined' ||
            typeof req.body.evjarat === 'undefined' ||
            typeof req.body.allapot === 'undefined' ||
            typeof req.body.km_ora === 'undefined' ||
            typeof req.body.uzemanyag === 'undefined' ||
            typeof req.body.hengerurtartalom === 'undefined' ||
            typeof req.body.hajtas === 'undefined' ||
            typeof req.body.ar === 'undefined' ||
            typeof req.body.tel === 'undefined') &&
            typeof req.file === 'undefined') {
            return next();
        }

        if (typeof res.locals.auto === 'undefined') {
            res.locals.auto = new autoModel();
        }

        res.locals.auto.marka = req.body.marka;
        res.locals.auto.model = req.body.model;
        res.locals.auto.evjarat = req.body.evjarat;
        res.locals.auto.allapot = req.body.allapot;
        res.locals.auto.km_ora = req.body.km_ora;
        res.locals.auto.uzemanyag = req.body.uzemanyag;
        res.locals.auto.hengerurtartalom = req.body.hengerurtartalom;
        res.locals.auto.hajtas = req.body.hajtas;
        res.locals.auto.ar = req.body.ar;
        res.locals.auto.tel = req.body.tel;
        res.locals.auto.ar = req.body.ar;

        if (typeof req.file !== 'undefined') {
            console.log(req.file);
            console.log(req.file.filename);
            res.locals.auto.img = req.file.filename;
            console.log(res.locals.auto.img);
        }

        res.locals.auto.save(err => {
            if (err) {
                return next(err);
            }
            return res.redirect('/auto');
        });

    };

};
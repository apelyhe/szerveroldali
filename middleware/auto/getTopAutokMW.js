/**
 *  get the list of the autos from db and puts it to res.locals.topautok
 */

 const requireOption = require('../requireOption');

 module.exports = function(objectrepository) {

    const autoModel = requireOption(objectrepository, 'autoModel');

    return function (req, res, next)  {

        // let topArray = res.locals.autok;

        // for(let j=0;j<topArray.length;j++) {
        //     for(let i = 0; i < topArray.length; i++) {
        //         if(topArray[i]>topArray[i+1]) {
        //             var temp = topArray[i];
        //             topArray[i] = topArray[i+1];
        //             topArray[i+1] = temp;
        //         }
        //     }
        // }      

        // res.locals.topAutok = topArray;

        autoModel
            .findOne({})

        return next();
    };

};
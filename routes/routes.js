
const authMW = require('../middleware/auth/authMW');
const checkUserCredentialsMW = require('../middleware/auth/checkUserCredentialsMW');
const regUserMW = require('../middleware/auth/regUserMW');
const logoutMW = require('../middleware/auth/logoutMW');

const renderMW = require('../middleware/common/renderMW');

const deleteAutoMW = require('../middleware/auto/deleteAutoMW');
const getAutokMW = require('../middleware/auto/getAutokMW');
const getAutoMW = require('../middleware/auto/getAutoMW');
const getTopAutokMW = require('../middleware/auto/getTopAutokMW');
const saveAutoMW = require('../middleware/auto/saveAutoMW');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const userModel = require('../models/user');
const autoModel = require('../models/auto');

module.exports = function (app) {

    const objectRepository = {
        userModel: userModel,
        autoModel: autoModel
    };

    /**
     * main page / admin page
                    * TODO: if user logged in admin.html should appear,
                    * otherwise index.html
     */

    app.get('/admin',
        authMW(objectRepository),
        getTopAutokMW(objectRepository),
        renderMW(objectRepository, 'admin')
    );

    /**
     * auto-adatlap.html
     */
    app.get('/auto/:autoid/adatlap',
        getAutoMW(objectRepository),
        renderMW(objectRepository, 'auto-adatlap')
    );

    /**
     * autok.html
     */
    app.get('/auto',
        getAutokMW(objectRepository),
        renderMW(objectRepository, 'autok')
    );

    /**
     * bejelentkezes.html
     */
    app.use('/bejelentkezes',
        checkUserCredentialsMW(objectRepository),
        renderMW(objectRepository, 'bejelentkezes')
    );

    /**
     * regisztracio.html
     */
    app.use('/regisztracio',
        regUserMW(objectRepository),
        renderMW(objectRepository, 'regisztracio')
    );

    /**
     * hozzaadas.html
     */
    app.use('/hozzaadas',
        authMW(objectRepository),
        upload.single('pictures'),            // 5 kép feltöltése
        saveAutoMW(objectRepository),
        renderMW(objectRepository, 'hozzaadas')
    );


    app.get('/torles/auto/:autoid',
        authMW(objectRepository),
        deleteAutoMW(objectRepository)
    );

    /**
     * torles.html
     */
    app.get('/torles',
        authMW(objectRepository),
        getAutokMW(objectRepository),
        renderMW(objectRepository, 'torles')
    );

    app.get('/kijelentkezes',
        logoutMW(objectRepository),
        renderMW(objectRepository, 'index')
    );

    app.get('/',
        getTopAutokMW(objectRepository),
        renderMW(objectRepository, 'index')
    );

}

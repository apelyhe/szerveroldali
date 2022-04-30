
const authMW = require('../middleware/auth/authMW');
const checkUserCredentialsMW = require('../middleware/auth/checkUserCredentialsMW');
const regUserMW = require('../middleware/auth/regUserMW');
const logoutMW = require('../middleware/auth/logoutMW');
const inverseAuthMW = require('../middleware/auth/inverseAuthMW');

const renderMW = require('../middleware/common/renderMW');
const mainRedirectMW = require('../middleware/common/mainRedirectMW');

const deleteAutoMW = require('../middleware/auto/deleteAutoMW');
const getAutokMW = require('../middleware/auto/getAutokMW');
const getAutoMW = require('../middleware/auto/getAutoMW');
const getTopAutokMW = require('../middleware/auto/getTopAutokMW');
const saveAutoMW = require('../middleware/auto/saveAutoMW');

const multer = require('multer');
const upload = multer({ dest: 'static/uploads/' });


const user = require('../models/user');
const auto = require('../models/auto');

module.exports = function (app) {
    
    const objectRepository = {
        userModel: user,
        autoModel: auto
    };
    
    /**
     * kezdolap.html
    */
    app.get('/kezdolap',
    authMW(objectRepository),
    getTopAutokMW(objectRepository),
    renderMW(objectRepository, 'kezdolap')
    );
    
    /**
     * bejelentkezes.html
     */
    app.use('/bejelentkezes',
        inverseAuthMW(objectRepository),
        checkUserCredentialsMW(objectRepository),
        renderMW(objectRepository, 'bejelentkezes')
    );

    /**
     * regisztracio.html
     */
    app.use('/regisztracio',
        inverseAuthMW(objectRepository),
        regUserMW(objectRepository),
        renderMW(objectRepository, 'regisztracio')
    );

    /**
    * autok.html
    */
    app.get('/auto',
        authMW(objectRepository),
        getAutokMW(objectRepository),
        renderMW(objectRepository, 'autok')
    );

    /**
     * auto-adatlap.html
     */
    app.get('/auto/:autoid/adatlap',
        authMW(objectRepository),
        getAutoMW(objectRepository),
        renderMW(objectRepository, 'auto-adatlap')
    );

    /**
     * torles.html
     */
    app.get('/torles',
        authMW(objectRepository),
        getAutokMW(objectRepository),
        renderMW(objectRepository, 'torles')
    );

    app.get('/torles/auto/:autoid',
        authMW(objectRepository),
        getAutoMW(objectRepository),
        deleteAutoMW(objectRepository)
    );

    /**
     * hozzaadas.html
     */
    app.use('/hozzaadas',
        authMW(objectRepository),
        upload.single('photo'),     // kép feltöltése
        saveAutoMW(objectRepository),
        renderMW(objectRepository, 'hozzaadas')
    );

    app.use('/kijelentkezes',
        logoutMW(objectRepository)
    );

    app.get('/',
        mainRedirectMW(objectRepository)
    );

}

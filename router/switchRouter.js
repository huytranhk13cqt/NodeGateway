const router = require('express').Router();
const listSwitch = require('../controller/switchController');
const middleware = require('../middleware/middlewareController');

// [POST]
router.post('/switch/add', listSwitch.addSwitch);

// [GET]
router.get('/switch/get/:id', middleware.checkLoginStatus, listSwitch.getSwitch);

// [GET]
router.get('switch/getall', middleware.checkLoginStatus, listSwitch.getallSwitch);

// [PUT]
router.put('/switch/update/:id', middleware.checkLoginStatus, listSwitch.updateSwitch);

// [DELELE]
router.delete('/switch/delete/:id', listSwitch.deleteSwitch);

module.exports = router;

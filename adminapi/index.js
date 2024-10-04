const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const uuid = require('uuid');

const router = express.Router();
module.exports = router;

router.use('/analytics', require('./analytics'));
router.use('/analytics/totalinstalls', require('./analytics'));
router.use('/analytics/languages', require('./analytics'));
router.use('/analytics/churches', require('./analytics'));
router.use('/analytics/update', require('./analytics'));

router.use((req, res, next) => {
  if (req.headers.authorization == 'Basic YWRtaW46aWNlbGVtb250ZWE=') {
    next();
  } else {
    res.status(401).json('Invalid username or password');
  }
});

router.use('/audioupload', require('./audioupload'));
router.use('/churches', require('./churches'));
router.use('/content', require('./content'));
router.use('/labels', require('./labels'));
router.use('/languages', require('./languages'));
router.use('/news', require('./news'));
router.use('/notifications', require('./notifications'));
router.use('/partners', require('./partners'));
// router.use('/readings', require('./readings'));
router.use('/testimonies', require('./testimonies'));

router.get('/login', (req, res) => {
  res.json('OK');
});

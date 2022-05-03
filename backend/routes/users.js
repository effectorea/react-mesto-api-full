const router = require('express').Router();
const {
  getUsers, getUserInfo, getUserById, updateProfile, updateAvatar,
} = require('../controllers/users');
const { userProfileValidation, avatarValidation, userIdValidation } = require('../middlewares/joiValidation');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.get('/:userId', userIdValidation, getUserById);
router.patch('/me', userProfileValidation, updateProfile);
router.patch('/me/avatar', avatarValidation, updateAvatar);

module.exports = router;

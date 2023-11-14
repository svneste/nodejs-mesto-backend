import { Router } from 'express';
import {
  getUsers,
  getUser,
  createUser,
  patchInfo,
  patchAvatar,
} from '../controllers/users';

const router = Router();

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', patchInfo);
router.patch('/me/avatar', patchAvatar);

export default router;

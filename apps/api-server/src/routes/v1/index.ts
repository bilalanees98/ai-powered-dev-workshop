import { PowerUserRole } from '@app/common';
import { Router } from 'express';
import { powerUserAuth, roleAuth } from 'middleware/authHandlers';

const router = Router();

router.use('/power-users', powerUserAuth, roleAuth([PowerUserRole.SUPER_ADMIN, PowerUserRole.ADMIN]));

export default router;

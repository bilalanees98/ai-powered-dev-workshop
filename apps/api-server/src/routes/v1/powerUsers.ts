import { Router } from 'express';
import { validationHandler } from 'middleware/validationHandler';
import { RequestProperty } from 'types';
import { registerBodySchema } from 'controllers/powerUsers/schema';
import { register } from 'controllers/powerUsers';
import { powerUserAuth, roleAuth } from 'middleware/authHandlers';
import { PowerUserRole } from '@app/common';

const router = Router();

router.post(
  '/register',
  powerUserAuth,
  roleAuth([PowerUserRole.SUPER_ADMIN]),
  validationHandler(registerBodySchema, RequestProperty.BODY),
  register,
);

export default router;

import express from 'express';

import objectController from '../controllers/object-controller';
import { Auth } from '../middleware/auth-middleware';
import ValidationObjectEdit from '../validation/object/object-edit-validation';
import ValidationObjectPost from '../validation/object/object-post-validation';

const router = express.Router();

router.get('/', Auth(), objectController.getObjects);
router.get('/:objectId', Auth(), objectController.getObject);
router.post('/', Auth(), ValidationObjectPost, objectController.createObject);
router.patch(
  '/:objectId',
  Auth(),
  ValidationObjectEdit,
  objectController.updateObject,
);
router.delete('/:objectId', Auth(), objectController.deleteObject);

export default router;

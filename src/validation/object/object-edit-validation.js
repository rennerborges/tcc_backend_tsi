import * as yup from 'yup';

const ValidationObjectEdit = (req, res, next) => {
  const schema = yup.object().shape({
    name: yup.string(),
    data: yup.object(),
    model: yup.object(),
  });

  return schema
    .validate(req.body)
    .then(() => next())
    .catch((error) => next(error));
};

export default ValidationObjectEdit;

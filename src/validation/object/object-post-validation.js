import * as yup from 'yup';

const ValidationObjectPost = (req, res, next) => {
  const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    data: yup.object().required('Data is required'),
    model: yup.object(),
  });

  return schema
    .validate(req.body)
    .then(() => next())
    .catch((error) => next(error));
};

export default ValidationObjectPost;

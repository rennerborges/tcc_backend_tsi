const mongoose = require('mongoose');
const { generateSerialNumbers } = require('../util/code');

mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  data: { type: Object, required: [true, 'data is required'] },
  code: { type: String },
  model: { type: Object },
  createdAt: { type: Date, required: [true, 'createdAt is required'] },
  createdBy: { type: String, required: [true, 'createdBy is required'] },
  updatedAt: { type: Date },
  updatedBy: { type: String },
  enabled: { type: Boolean, required: [true, 'enabled is required'] },
});

const modelName = 'objects';

// eslint-disable-next-line func-names
modelSchema.pre('save', function (next) {
  const object = this;

  if (object.isNew) {
    try {
      object.code = generateSerialNumbers(6);
    } catch (error) {
      next(error);
    }
  }

  next();
});

if (mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[modelName]; // Conexão
} else {
  module.exports = mongoose.model(modelName, modelSchema); // Criar nova conexão
}

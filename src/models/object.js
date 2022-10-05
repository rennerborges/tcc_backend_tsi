const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const modelSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  data: { type: Object, required: [true, 'data is required'] },
  model: { type: Object },
  createdAt: { type: Date, required: [true, 'createdAt is required'] },
  createdBy: { type: String, required: [true, 'createdBy is required'] },
  updatedAt: { type: Date },
  updatedBy: { type: String },
  enabled: { type: Boolean, required: [true, 'enabled is required'] },
});

const modelName = 'objects';

if (mongoose.connection && mongoose.connection.models[modelName]) {
  module.exports = mongoose.connection.models[modelName]; // Conexão
} else {
  module.exports = mongoose.model(modelName, modelSchema); // Criar nova conexão
}

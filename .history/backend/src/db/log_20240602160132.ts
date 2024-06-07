import mongoose, { Schema, Document } from 'mongoose';

interface ILog extends Document {
  message: string;
  level: string;
  timestamp: Date;
}

const LogSchema: Schema = new Schema({
  message: { type: String, required: true },
  level: { type: String, required: true, enum: ['info', 'warn', 'error'], default: 'info' },
  timestamp: { type: Date, default: Date.now }
});

const Log = mongoose.model<ILog>('Log', LogSchema);

export default Log;

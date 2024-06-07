import mongoose, { Schema, Document } from 'mongoose';

interface ILog extends Document {
  message: string;
  level: string;
  timestamp: Date;
}

const LogSchema: Schema = new Schema({
  message: { type: String, required: true },
  level: { type: String,  enum: ['info', 'warn', 'error'], default: 'info' },
  timestamp: { type: Date, default: Date.now }
});

const Log = mongoose.model<ILog>('Log', LogSchema);

export default Log;
export const getLogs = () => Log.find();
export const getLogById = (id: string) => Log.findById(id);
export const createLog = (log: Record<string,any>) => Log.create(log);
export const deleteLog = (id: string) => Log.findByIdAndDelete(id);
export const deleteLogs = () => Log.deleteMany({});
export const getLogsByInfoType = (infoType: string) => Log.find({level: infoType});
export const getLogsByDate = (date: Date) => Log.find({timestamp: date});
export const getLogsByDateRange = (startDate: Date, endDate: Date) => Log.find({timestamp: {$gte: startDate, $lte: endDate}});
export const getLogsByInfoTypeAndDateRange = (infoType: string, startDate: Date, endDate: Date) => Log.find({level: infoType, timestamp: {$gte: startDate, $lte: endDate}});

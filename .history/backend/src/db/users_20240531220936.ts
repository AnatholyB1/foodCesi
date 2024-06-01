import mongoose from 'mongoose';

const authenticationSchema = new mongoose.Schema({
    password: { type: String, required: true, select: false },
    salt: { type: String, required: true, select: false },
    sessionToken: { type: String, required: true, select: false },
}, { _id: false });


const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    email: { type: String, required: true},
    authentication: { type: authenticationSchema, required: true },
})


export const UserModel = mongoose.model('User', userSchema)
export const getUsers = () => UserModel.find().then(users => users);
export const getUserByEmail = (email: string) => UserModel.findOne({ email: email });
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 
    'authentication.sessionToken': sessionToken, 
});
export const getUserById = (id : string) => UserModel.findById(id)
export const createUser = (values : Record<string, any>) => new UserModel(values).save().then((user)=> user.toObject())
export const deleteUserById = (id : string) => UserModel.findOneAndDelete({_id:id})
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values)
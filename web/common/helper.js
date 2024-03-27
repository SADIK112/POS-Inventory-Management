// import mongoose from 'mongoose';

// const connectToDatabase = (databaseURL) => {
//   mongoose.connect(databaseURL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });

//   const db = mongoose.connection;
//   db.on('error', console.error.bind(console, 'connection error: '));
//   db.once('open',  () => {
//     console.log('[Database] Connected successfully');
//   });

//   return db;
// }

// export default connectToDatabase;
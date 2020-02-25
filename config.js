module.exports = {
  port: process.env.PORT || 3001,
  db:
    process.env.MONGODB ||
    "mongodb://localhost:27017/shop" ||
    "mongodb://heroku_rfksf02t:5imvltld2foavcq2dloq1dbijb@ds033317.mlab.com:33317/heroku_rfksf02t",
  SECRET_TOKEN: "miclavedetokens"
};

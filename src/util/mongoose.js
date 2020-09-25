module.exports = {
    multipleMongooseToOject : function(mongooses){
        return mongooses.map(mongoose => mongoose.toObject())
    },
    mongooseToOject : function(mongoose){
        return mongoose ? mongoose.toObject() :mongoose;
    }
};
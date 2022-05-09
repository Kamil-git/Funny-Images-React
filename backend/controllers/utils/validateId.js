const mongoose = require('mongoose')

const validateId = id => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new Error('User id is not valid')
}



module.exports = validateId
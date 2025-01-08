const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi')
const passwordComplexity = require("joi-password-complexity");

const companySchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  tradeName: { type: String, required: true },
  email: { type: String, required: true },
  regNum: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  website: { type: String, required: true },
});

companySchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "60",
	});
	return token;
};
const User = mongoose.model("user", companySchema);

const validate = (data) => {
	const schema = Joi.object({
		userName: Joi.string().required().label("User Name"),
		tradeName: Joi.string().required().label("Trade Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
    regNum: Joi.string().required().label("Registration Number"),
    phone: Joi.string().required().label("Phone"),
    address: Joi.string().required().label("Address"),
    website: Joi.string().required().label("Website")
	});
	return schema.validate(data);
};

module.exports = { User, validate };

//module.exports =  mongoose.model("companyInfor ", companySchema);



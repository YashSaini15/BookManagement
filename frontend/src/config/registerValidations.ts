const registerValidation = {
  name:{
    required: "Please enter the name"
  },
  email: {
    required: "Please enter the email",
    valid: "Please enter a valid email"
  },
  password: {
    required: "Please enter a password",
    valid: "Password must be at least 6 characters"
  }
}

export default registerValidation;
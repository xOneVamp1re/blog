export const validation = {
  username: {
    minLength: { value: 3, message: 'Username must be at least 3 characters' },
    maxLength: { value: 20, message: 'Username must be at most 20 characters' },
    required: 'This field is required',
    pattern: {
      value: /^[a-zA-Z0-9]{3,20}$/,
      message: 'Only letters and numbers are allowed',
    },
  },
  email: {
    required: 'This field is required',
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'Invalid email address',
    },
    validate: (value) => {
      if (/^\s|\s$/.test(value)) {
        return 'Email should not contain leading or trailing spaces'
      }
      return true
    },
  },
  password: {
    minLength: {
      value: 6,
      message: 'Your password needs to be at least 6 characters',
    },
    maxLength: {
      value: 40,
      message: 'Your password needs to be at most 40 characters',
    },
    pattern: {
      value: /^\S*$/,
      message: 'Password should not contain spaces',
    },
  },
  avatar: {
    pattern: {
      value: /^(https?:\/\/)([a-zA-Z0-9.-]+)(:[0-9]{1,5})?(\/[^\s]*)?$/i,
      message: 'Invalid URL',
    },
  },
}

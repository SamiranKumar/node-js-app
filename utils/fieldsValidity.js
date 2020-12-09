function validateFields(required, requestbody) {
  const errors = [];

  required.forEach((key) => {
    if (!requestbody[key]) {
      errors.push(`${key} is required filed`);
    }
  });

  if (errors.length !== 0) {
    return { message: errors, is_valid: false };
  } else {
    return { message: ["all ok"], is_valid: true };
  }
}
module.exports = { validateFields };

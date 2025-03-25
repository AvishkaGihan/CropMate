/**
 * Form validation utilities for CropMate application
 */

/**
 * Validates signup form data based on the current step
 * @param {number} step - The current form step
 * @param {object} data - The form data to validate
 * @returns {object} An object containing validation errors, if any
 */
export const validateSignupForm = (step, data) => {
  const errors = {};

  switch (step) {
    case 1: {
      // Validate role selection and basic information
      if (!data.role) {
        errors.role = "Please select your role";
      }

      if (!data.fullName?.trim()) {
        errors.fullName = "Full name is required";
      }

      if (!data.email?.trim()) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        errors.email = "Please enter a valid email address";
      }

      if (!data.phone?.trim()) {
        errors.phone = "Phone number is required";
      }

      if (!data.password) {
        errors.password = "Password is required";
      } else if (data.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      }

      if (!data.confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
      } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
      break;
    }

    case 2: {
      // Validate role-specific information
      if (data.role === "farmer") {
        if (!data.farmLocation?.trim()) {
          errors.farmLocation = "Farm location is required";
        }

        if (!data.cropTypes?.length) {
          errors.cropTypes = "Please select at least one crop type";
        }
      } else if (data.role === "driver") {
        if (!data.vehicleType) {
          errors.vehicleType = "Vehicle type is required";
        }

        if (!data.vehicleCapacity) {
          errors.vehicleCapacity = "Vehicle capacity is required";
        }

        if (!data.licenseNumber) {
          errors.licenseNumber = "License number is required";
        }

        if (!data.licenseExpiry) {
          errors.licenseExpiry = "License expiry date is required";
        }
      } else if (data.role === "vendor") {
        if (!data.businessName?.trim()) {
          errors.businessName = "Business name is required";
        }

        if (!data.businessType) {
          errors.businessType = "Business type is required";
        }

        if (!data.businessAddress?.trim()) {
          errors.businessAddress = "Business address is required";
        }
      }
      break;
    }

    case 3: {
      // Validate agreement to terms
      if (!data.agreeToTerms) {
        errors.agreeToTerms =
          "You must agree to the Terms of Service and Privacy Policy";
      }
      break;
    }

    default:
      break;
  }

  return errors;
};

/**
 * Validates signin form data
 * @param {object} data - The form data to validate
 * @returns {object} An object containing validation errors, if any
 */
export const validateSigninForm = (data) => {
  const errors = {};

  if (!data.email?.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.password) {
    errors.password = "Password is required";
  }

  return errors;
};

/**
 * Helper function to validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} Whether the email is valid
 */
export const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

/**
 * Helper function to validate password strength
 * @param {string} password - The password to validate
 * @returns {object} An object containing validation result and feedback
 */
export const validatePasswordStrength = (password) => {
  if (!password) {
    return { isValid: false, feedback: "Password is required", strength: 0 };
  }

  let strength = 0;
  const feedback = [];

  // Length check
  if (password.length < 8) {
    feedback.push("Password must be at least 8 characters");
  } else {
    strength += 1;
  }

  // Check for uppercase letters
  if (!/[A-Z]/.test(password)) {
    feedback.push("Add an uppercase letter");
  } else {
    strength += 1;
  }

  // Check for lowercase letters
  if (!/[a-z]/.test(password)) {
    feedback.push("Add a lowercase letter");
  } else {
    strength += 1;
  }

  // Check for numbers
  if (!/[0-9]/.test(password)) {
    feedback.push("Add a number");
  } else {
    strength += 1;
  }

  // Check for special characters
  if (!/[^A-Za-z0-9]/.test(password)) {
    feedback.push("Add a special character");
  } else {
    strength += 1;
  }

  let feedbackMessage = "";
  if (strength < 3) {
    feedbackMessage = feedback.join(", ");
  } else if (strength < 5) {
    feedbackMessage = "Good password, but could be stronger";
  } else {
    feedbackMessage = "Strong password!";
  }

  return {
    isValid: strength >= 3,
    feedback: feedbackMessage,
    strength: Math.min(strength, 5),
  };
};

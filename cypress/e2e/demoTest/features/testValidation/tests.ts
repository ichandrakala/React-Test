// all tests caller function
export const validationTests = () => {
  validatePageOne();
  validatePageTwo();
  validatePageThree();
};

//Write your test cases in the following functions
// Each function should contain test cases for a specific page's validation
export const validatePageOne = () => {
  it("should validate structure and input validation on page 1", () => {
    cy.contains("User Registration Form").should("be.visible");
    cy.contains("Page 1/2");

    // First Name
    cy.get('input[placeholder="Enter first name"]').should("be.visible").clear().blur();
    cy.contains("First name is required.").should("exist");

    cy.get('input[placeholder="Enter first name"]').type("J@").blur();
    cy.contains("First name can only contain letters and spaces.").should("exist");

    cy.get('input[placeholder="Enter first name"]').clear().type("John");

    // Last Name (optional - skip validation unless required)
    cy.get('input[placeholder="Enter last name"]').type("Doe");

    // Mobile Number
    cy.get('input[placeholder="Enter your phone number"]').clear().blur();
    cy.contains("Mobile number is required.").should("exist");

    cy.get('input[placeholder="Enter your phone number"]').type("12345").blur();
    cy.contains("Enter a valid 10-digit phone number.").should("exist");

    cy.get('input[placeholder="Enter your phone number"]').clear().type("9876543210");

    // Password
    cy.get('input[placeholder="Enter your password"]').clear().blur();
    cy.contains("Password is required.").should("exist");

    cy.get('input[placeholder="Enter your password"]').type("abc").blur();
    cy.contains("Password must be at least 6 characters long, contain an uppercase letter and a number.").should("exist");

    cy.get('input[placeholder="Enter your password"]').clear().type("Pass123");

    // Confirm Password
    cy.get('input[placeholder="Confirm your password"]').clear().type("Wrong123").blur();
    cy.contains("Passwords do not match.").should("exist");

    cy.get('input[placeholder="Confirm your password"]').clear().type("Pass123");

    // Select State
    cy.get("select").select(""); // or `.invoke('val', '').trigger('change')` depending on implementation
    cy.contains("Please select a state.").should("exist");

    cy.get("select").select("California");

    // Click Next (only after all valid)
    cy.contains("Next").click();
  });
};

export const validatePageTwo = () => {
  it("should validate structure and input validation on page 2", () => {
    cy.contains("User Registration Form").should("be.visible");
    cy.contains("Page 2/2");

    // Address
    cy.get('textarea[placeholder="Enter your address"]').clear().blur();
    cy.contains("Address is required.").should("exist");

    cy.get('textarea[placeholder="Enter your address"]').type("123 Main Street, NY");

    // Gender - required radio buttons
    cy.get('input[type="radio"]').should("have.length", 3); // Male, Female, Other

    // Try submitting without selecting gender
    cy.contains("Submit").click();
    cy.contains("Please select your gender.").should("exist");

    // Select gender
    cy.contains("Male").click();

    // Now submit (should pass if no frontend validation errors)
    cy.contains("Submit").click();
  });
};

export const validatePageThree = () => {
  it("should validate structure of page 3", () => {});
};

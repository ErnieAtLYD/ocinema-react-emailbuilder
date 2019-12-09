context("Initial panel settings", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("has an export button", function() {
    cy.contains("Export template as HTML");
  });
  xit("has a full width button", function() {});
  xit("loads a blank module when the button is clicked", function() {});
});

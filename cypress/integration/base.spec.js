context("Initial Load", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("has a right panel", function() {
    cy.get('[data-test-id="panel"]')
      .invoke("css", "position")
      .should("equal", "static");
  });
  it("has a left panel", function() {
    cy.get('[data-test-id="render"]')
      .invoke("css", "position")
      .should("equal", "static");
  });
  it("should default to the panel OFF position", function() {
    cy.get('[data-test-id="panel-off"]')
      .invoke("css", "position")
      .should("equal", "static");
  });
});

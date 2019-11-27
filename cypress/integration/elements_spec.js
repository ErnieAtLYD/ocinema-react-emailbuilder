describe("Element interactions", function() {
  beforeEach(function() {
    cy.visit("http://localhost:3000/");
    cy.get("[data-cy=add-2-col]").click();
    cy.get(".column")
      .eq(0)
      .as("leftDropzone");
    cy.get(".column")
      .eq(1)
      .as("rightDropzone");
    cy.get("[data-cy=dragmehandle]").dragTo("@leftDropzone");
    cy.get("[data-cy=dragmehandle]").dragTo("@rightDropzone");
  });

  it("Creates a row", function() {
    cy.get("@leftDropzone")
      .find(".element")
      .trigger("mouseover");
    cy.get(".layoutitem").should("exist");
  });
});

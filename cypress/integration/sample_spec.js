describe("Drag and drop columns and elements", function() {
  it("Creates a row", function() {
    cy.visit("http://localhost:3000/");
    cy.contains("Add 1-Column").click();
    cy.get(".layoutitem").should("exist");
  });
  it("shows the row highlighted when you mouseover outside the email template", function() {
    cy.get(".layoutitem").trigger("mouseover", "topLeft");
    cy.get(".layoutitem--hover")
      .should("be.visible")
      .should("have.css", "opacity")
      .and("match", /1/);
  });
  it("doesn't shows a highlighted row if you mouseover inside the email template", function() {
    cy.get(".layoutitem").trigger("mouseover");
    cy.get(".layoutitem--hover")
      .should("be.visible")
      .should("have.css", "opacity")
      .and("match", /0/);
  });
  it("shows a toolbar when you mouseover the area", function() {
    cy.get(".layoutitem").trigger("mouseover", "topRight");
    cy.get(".layoutitem--hover")
      .should("be.visible")
      .should("have.css", "opacity")
      .and("match", /1/);
  });
  it("drags and drops into a column", function() {
    cy.get("#dragmehandle").dragTo(".column");
  });
  it("allows you to drag and drop into a second column", function() {
    cy.contains("Add 1-Column").click();
    cy.get(".layoutitem").should("have.length", 2);

    cy.get(".column")
      .eq(1)
      .as("secondColumn");

    cy.get(".column")
      .eq(0)
      .as("firstColumn");

    cy.get("@secondColumn")
      .find(".element")
      .should("not.exist");

    cy.get("@firstColumn")
      .find(".element")
      .should("have.length", 1);

    cy.get(".element").dragTo("@secondColumn");

    cy.get("@secondColumn")
      .find(".element")
      .should("have.length", 1);

    cy.get("@firstColumn")
      .find(".element")
      .should("not.exist");
  });
  it("drag and drops an element on an element in the same column", function() {
    cy.get(".column")
      .eq(1)
      .as("secondColumn");

    cy.get("#dragmehandle").dragTo("@secondColumn");
    cy.get("#dragmehandle").dragTo("@secondColumn");
    cy.get("#dragmehandle").dragTo("@secondColumn");

    cy.get("@secondColumn")
      .find(".element")
      .eq(0)
      .as("firstElement");

    cy.get("@secondColumn")
      .find(".element")
      .eq(3)
      .as("fourthElement");

    cy.get("@firstElement")
      .invoke("text")
      .then(text1 => {
        // text1 should be a text element
        // similar to test element: 1234567980
        cy.get("@firstElement").dragTo("@fourthElement");

        cy.get("@secondColumn")
          .find(".element")
          .eq(0)
          .invoke("text")
          .should(text2 => {
            expect(text1).not.to.eq(text2);
          });

        cy.get("@secondColumn")
          .find(".element")
          .eq(3)
          .invoke("text")
          .should(text2 => {
            expect(text1).to.eq(text2);
          });
      });
  });
  it("drag and drops an element on an element in a different column", function() {
    cy.get(".column")
      .eq(0)
      .as("firstColumn");
    cy.get(".column")
      .eq(1)
      .as("secondColumn");

    cy.get("#dragmehandle").dragTo("@firstColumn");
    cy.get("@firstColumn")
      .find(".element")
      .eq(0)
      .as("firstElement");

    cy.get("@secondColumn")
      .find(".element")
      .eq(0)
      .as("secondElement");

    cy.get("@secondElement")
      .invoke("text")
      .then(text1 => {
        cy.get("@firstElement").dragTo("@secondElement");

        cy.get("@firstColumn")
          .find(".element")
          .should("not.exist");

        cy.get("@secondColumn")
          .find(".element")
          .should("have.length", 5);

        cy.get("@secondColumn")
          .find(".element")
          .eq(0)
          .invoke("text")
          .should(text2 => {
            expect(text1).to.eq(text2);
          });
      });
  });
});

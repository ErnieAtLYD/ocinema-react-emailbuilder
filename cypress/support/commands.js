// https://on.cypress.io/custom-commands

Cypress.Commands.add(
  "dragTo",
  { prevSubject: "element" },
  (subject, targetEl) => {
    cy.wrap(subject).trigger("dragstart");
    cy.get(targetEl).trigger("drop");
    cy.get(targetEl).trigger("dragend");
  }
);

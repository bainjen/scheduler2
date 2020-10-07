// appointment
// Enters their name
// Chooses an interviewer
// Clicks the save button
// Sees the booked appointment
// Editing
// If we edit the existing appointment booked for "Archie Cohen", then we don't need to create an appointment first.

describe("Appointments", () => {
  beforeEach("should visit root", () => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
  });

  it("should book an interview", () => {
    cy.contains("Monday");
    cy.get("[alt=Add]").first().click();
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click(); 
  });
});
// cy.contains("[data-testid=day]", "Tuesday")
//   .click()
//   .should("have.class", "day-list__item--selected");

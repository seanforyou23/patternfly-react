import 'cypress-axe';
// describe('Progress Demo Page - ', () => {

//   it('should load the settings page', () => {
//     cy.visit('http://localhost:8000/styles/tokens');
//   });

//   // it('should click every label and automatically focus its corresponding form control', () => {
//   //   cy.get('label').each(element => {
//   //     const inputId = element.attr('for');
//   //     const labelText = element.text().trim();
//   //     const inputValue = `Value for ${labelText}`;
//   //     cy.wrap(element).click();
//   //     cy.focused()
//   //       .type(inputValue)
//   //       .should('have.attr', 'id', inputId)
//   //       .and('have.value', inputValue)
//   //       .clear();
//   //   });
//   // });
// });


describe('App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8000/')
    cy.injectAxe() // make sure axe is available on the page
  })

  it('Has no detectable a11y violations on load', () => {
    cy.checkA11y() // fail for a11y violations
  })

  it('Has no a11y violations after placing focus in component search', () => {
    cy.get('input').click().type('progress');
    cy.get('a[href="/components/progress"]').click();
    cy.checkA11y() // check after a rerender
  })

  // it('Has no a11y violation after navigating to the tokens page', () => {
  //   cy.visit('http://localhost:8000/styles/tokens');
  //   cy.injectAxe() // make sure axe is available on the page
  //   cy.checkA11y() // check after a rerender
  // })
})

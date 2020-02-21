describe('Button Demo Test', () => {
  it('Navigate to demo section', () => {
    cy.visit('http://localhost:3000/');
    cy.get('#button-demo-nav-item-link').click();
    cy.url().should('eq', 'http://localhost:3000/button-demo-nav-link');
  });

  it('Verify button element variant classes', () => {
    cy.get('.btn-demo-area').within(() => {
      cy.get('.pf-c-button:nth-of-type(1)').should('have.class', 'pf-m-primary');
      cy.get('.pf-c-button:nth-of-type(2)').should('have.class', 'pf-m-secondary');
      cy.get('.pf-c-button:nth-of-type(3)').should('have.class', 'pf-m-tertiary');
      cy.get('.pf-c-button:nth-of-type(4)').should('have.class', 'pf-m-danger');
      cy.get('.pf-c-button:nth-of-type(5)').should('have.class', 'pf-m-link');
      cy.get('.pf-c-button:nth-of-type(6)').should('have.class', 'pf-m-plain');
      cy.get('.pf-c-button:nth-of-type(7)').should('have.class', 'pf-m-control');
    });
  });

  it('Checks that incrementing tabindex values send focus to the correct elements', () => {
    // cy.get('body').tab();
    cy.focused().should('have.attr', 'tabindex', '2');
  });

  it('Verify disabled button classes and attributes', () => {
    cy.get('.btn-demo-area').within(() => {
      cy.get('.pf-c-button:nth-of-type(8)').should('have.class', 'pf-m-disabled');
      cy.get('.pf-c-button:nth-of-type(8)').should('have.attr', 'disabled');
      cy.get('.pf-c-button:nth-of-type(8)').should('have.attr', 'aria-disabled', 'true');
      cy.get('.pf-c-button:nth-of-type(8)').should('not.have.attr', 'tabindex');
    });
  });

  it('Verify disabled yet focusable button classes and attributes', () => {
    cy.get('.btn-demo-area').within(() => {
      cy.get('.pf-c-button:nth-of-type(9)').should('have.class', 'pf-m-disabled');
      cy.get('.pf-c-button:nth-of-type(9)').should('have.attr', 'aria-disabled', 'true');
      cy.get('.pf-c-button:nth-of-type(9)').should('not.have.attr', 'disabled');
      cy.get('.pf-c-button:nth-of-type(9)').should('not.have.attr', 'tabindex');
    });
  });

  it('Verify button can set explicit tabindex attribute', () => {
    cy.get('.btn-demo-area').within(() => {
      cy.get('.pf-c-button:nth-of-type(10)').should('have.attr', 'tabindex', '2');
    });
  });

  it('Verify disabled yet focusable button has tooltip when focused', () => {
    cy.get('.btn-demo-area').within(() => {
      cy.get('.pf-c-button:nth-of-type(11)')
        .focus()
        .should('have.attr', 'aria-describedby', 'tippy-1');
    });
    cy.get('.tippy-popper').should('be.visible');
  });

  it('Verify disabled yet focusable button has tooltip when hovered', () => {
    cy.get('.btn-demo-area').within(() => {
      cy.get('.pf-c-button:nth-of-type(11)')
        .trigger('mouseover')
        .should('have.attr', 'aria-describedby', 'tippy-1');
    });
    cy.get('.tippy-popper').should('be.visible');
  });

  it('Verify disabled yet focusable button prevents default actions', () => {
    cy.get('.btn-demo-area').within(() => {
      cy.get('.pf-c-button:nth-of-type(11)')
        .focus()
        .click();
      cy.url().should('eq', 'http://localhost:3000/button-demo-nav-link'); // shouldn't have navigated anywhere
    });
  });

  it('Verify link button classes and attributes', () => {
    cy.get('.btn-demo-area').within(() => {
      cy.get('.pf-c-button:nth-of-type(12)').should('have.class', 'pf-m-link');
      cy.get('.pf-c-button:nth-of-type(13)').should('have.class', 'pf-m-inline');

      cy.get('.pf-c-button:nth-of-type(14)').should('have.class', 'pf-m-disabled');
      cy.get('.pf-c-button:nth-of-type(14)').should('have.class', 'pf-m-link');
      cy.get('.pf-c-button:nth-of-type(14)').should('have.attr', 'disabled');
      cy.get('.pf-c-button:nth-of-type(14)').should('have.attr', 'aria-disabled', 'true');

      cy.get('.pf-c-button:nth-of-type(15)').should('have.attr', 'aria-disabled', 'true');
      cy.get('.pf-c-button:nth-of-type(15)').should('not.have.attr', 'disabled');
      cy.get('.pf-c-button:nth-of-type(15)')
        .should('have.class', 'pf-m-disabled')
        .and('have.class', 'pf-m-link');

      cy.get('.pf-c-button:nth-of-type(16)').should('have.class', 'pf-m-link');
      cy.get('.pf-c-button:nth-of-type(16)').should('have.attr', 'tabindex', '0');
    });
  });

  it('Verify link as button classes and attributes', () => {
    cy.get('.btn-demo-area').within(() => {
      cy.get('a:nth-of-type(1)')
        .should('have.class', 'pf-c-button')
        .and('have.attr', 'href', 'https://github.com/patternfly/patternfly-react');

      cy.get('a.pf-c-button:nth-of-type(2)').should('have.class', 'pf-m-disabled');
      cy.get('a.pf-c-button:nth-of-type(2)')
        .should('have.attr', 'aria-disabled', 'true')
        .and('not.have.attr', 'disabled');
      cy.get('a.pf-c-button:nth-of-type(2)').should('have.attr', 'tabindex', '-1');
      cy.get('a.pf-c-button:nth-of-type(2)').click();
      cy.url().should('eq', 'http://localhost:3000/button-demo-nav-link'); // shouldn't have navigated anywhere

      cy.get('a.pf-c-button:nth-of-type(3)').should('have.class', 'pf-m-disabled');
      cy.get('a.pf-c-button:nth-of-type(3)')
        .should('have.attr', 'aria-disabled', 'true')
        .and('not.have.attr', 'disabled');
      cy.get('a.pf-c-button:nth-of-type(3)').should('not.have.attr', 'tabindex');
      cy.get('a.pf-c-button:nth-of-type(3)').click();
      cy.url().should('eq', 'http://localhost:3000/button-demo-nav-link'); // shouldn't have navigated anywhere

      cy.get('a:nth-of-type(4)').should('have.attr', 'tabindex', '4');

      cy.get('a.pf-c-button:nth-of-type(5)')
        .should('have.attr', 'aria-disabled', 'true')
        .and('have.class', 'pf-m-disabled');
    });
  });

  it('Verify disabled yet focusable link as button has tooltip when focused', () => {
    cy.get('.btn-demo-area').within(() => {
      cy.get('a.pf-c-button:nth-of-type(5)')
        .focus()
        .should('have.attr', 'aria-describedby', 'tippy-2');
    });
  });

  it('Verify disabled yet focusable link as button has tooltip when hovered', () => {
    cy.get('.btn-demo-area').within(() => {
      cy.get('a.pf-c-button:nth-of-type(5)')
        .trigger('mouseover')
        .should('have.attr', 'aria-describedby', 'tippy-2');
    });
  });

  it('Verify disabled yet focusable link as button prevents default actions', () => {
    cy.get('.btn-demo-area').within(() => {
      cy.get('a.pf-c-button:nth-of-type(5)')
        .focus()
        .click();
      cy.url().should('eq', 'http://localhost:3000/button-demo-nav-link'); // shouldn't have navigated anywhere
    });
  });

  // do this last since it leaves the page
  it('Verify primary button clicks', () => {
    cy.get('.btn-demo-area').within(() => {
      cy.get('button.pf-c-button:nth-of-type(1)').click();
      cy.url().should('not.eq', 'http://localhost:3000/button-demo-nav-link');
    });
  });
});

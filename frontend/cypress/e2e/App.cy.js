describe('App E2E', () => {
    it('should have a form', () => {
        cy.visit('/');

        cy.get('[data-test-id="add-new-task-input"]').should('have.value', '');
        cy.get('[data-test-id="add-new-task-input"]').invoke('attr', 'placeholder').should('contain', 'Add new task');
        cy.get('[data-test-id="add-todo-button"]').should('have.text', 'Add todo');
    });

    it('should add a task', () => {
        cy.get('[data-test-id="add-new-task-input"]').type('Learn React').should('have.value', 'Learn React');
        cy.get('[data-test-id="add-todo-button"]').click();


        cy.get('[data-test-id="todo-item-text"]').should('have.text', 'Learn React');
        cy.get('[data-test-id="add-new-task-input"]').should('have.value', '');
    })

    it('should delete task', () => {
        cy.get('[data-test-id="todo-item"]').should('have.length', 1);
        cy.get('[data-test-id="todo-item-deleting"]').click();
        cy.get('[data-test-id="todo-item"]').should('have.length', 0);
    })

    it('should toggle status', () => {
        cy.get('[data-test-id="add-new-task-input"]').type('Learn React').should('have.value', 'Learn React');
        cy.get('[data-test-id="add-todo-button"]').click();


        cy.get('[data-test-id="todo-item-text"]').should('have.text', 'Learn React');
        cy.get('[data-test-id="add-new-task-input"]').should('have.value', '');

        cy.get('[data-test-id="todo-item-checkbox"]').should('not.be.checked').click().should('be.checked');
    })

    it('should hide completed tasks', () => {
        cy.get('[data-test-id="add-todo-hide-completed-tasks"]').click();
        cy.get('[data-test-id="todo-item"]').should('have.length', 0);
    })

    it('should disabled button', () => {
        cy.get('[data-test-id="add-new-task-input"]').should('have.value', '');
        cy.get('[data-test-id="add-todo-button"]').should('be.disabled');
    })
});

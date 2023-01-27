const uniqueTitle = title => `${title}-${Date.now()}`

describe('Tasks', function() {
    beforeEach(() => {
        cy.visit('/')
    });
    
    it('displays the board', function() {

        cy.get('h2').contains('Backlog')
        cy.get('h2').contains('In Progress')
        cy.get('.MuiContainer-root').find('img').should('have.attr', 'src').should('include','yams-logo.png')
    })

    it('creates and deletes task', function() {
        //create task
        const title =  uniqueTitle('New Task')
        cy.contains('Add Task').click()
        cy.get('input[name="title"]').type(title)
        cy.get('#mui-component-select-status').click()
        cy.contains('In Progress').click()
        cy.get('textarea[name="description"]').type('Do something')
        cy.get('#mui-component-select-estimate').click()
        cy.contains('3').click()
        cy.contains('Save').click()
        cy.contains('Created task!')
        cy.get('#column-in_progress').contains(title)
        //delete task
        cy.get('#column-in_progress').contains(title).click()
        cy.get('button[aria-label="delete task"]').click()
        cy.contains('Yes').parent().click()
        cy.contains('Deleted task!')
        cy.contains(title).should('not.exist')

    }) 
    it('updates and moves tasks', function(){
        //create task
        const title =  uniqueTitle('New Task')
        cy.contains('Add Task').click()
        cy.get('input[name="title"]').type(title)
        cy.get('textarea[name="description"]').type('Do something')
        cy.contains('Save').click()
        cy.contains('Created task!')
    
        //update and move task
        const newTitle =  uniqueTitle('Updated Task')
        cy.contains(title).click()
        cy.get('input[name="title"]').clear().type(newTitle)
        cy.get('#mui-component-select-status').click()
        cy.contains('PR Review').click()
        cy.contains('Save').click()
        cy.contains('Updated task!')
        cy.get('#column-pr_review').contains(newTitle)
        cy.contains(title).should('not.exist')
    })
})


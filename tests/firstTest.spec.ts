import {test, expect} from '@playwright/test'

test.beforeEach(async ({page})=>{
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()


})

// create a single test
test('Locator syntax rules ', async ({page})=>{
    //by tag name 
    await page.locator('input').first().click()

    //by id, we put # 
    page.locator('#inputEmail1')


    //by class value, we put a dot to show its a class
    page.locator('.shape-rectangle')

    //by attribute , we should pu in []
    page.locator('[placeholedr="Email"]')

    //by entire class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors
    page.locator('input[placeholedr="Email"].shape-rectangle')
    
    //find by XPATH, we put //*[@....] - NOT RECOMMENDED in PW approach in modern frameworks
    page.locator('//*[@id="inputEmail"]')

    // find by partial text match
    // :text(""
    page.locator(':text("Using")')

    // find by excat text match text-is
    page.locator(':text-is("Using the Grid!")')

})

test('User facing locators', async ({page})=>{

    // by getBy Role (see documentation in FrameLocator PW docs )
    await page.getByRole('textbox', {name:"Email"}).first().click()
    await page.getByRole('button', {name:"Sign in"}).first().click()
    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText('Using the Grid').click()
    await page.getByTestId('SignIn').click()
    //await page.getByTitle('IoT Dashboard').click()



})

test('Locating child elements', async ({page}) =>{

    // find by child element
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', {name: "Sign In"}).first().click()

    // by index (nor preferabble) - try to avoid this approach
    await page.locator('nb-card').nth(3).getByRole('button').click()
})

test('Locating parents elements', async ({page}) =>{
    // find by parent 
    await page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name:"Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name:"Email"}).click()

    await page.locator('nb-card').filter({hasText: "Basic Form"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name:"Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Sign in"}).getByRole('textbox', {name:"Email"}).click()

    // Not recomennded but sometimes we can use 
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click()    
})

test('Reusing locators', async ({page}) => {
    const basicForm = page.locator('nb-card', {hasText: "Basic form"})

    const emailField = basicForm.getByRole('textbox', {name:"Email"})
    const passwordField = basicForm.getByRole('textbox', {name:"Password"})
    await emailField.fill('test@test.com')
    await passwordField.fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')


})

test ('validate values', async ({page}) => {

    //single test value 
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button'). textContent()

    await expect(buttonText).toEqual('Submit')

    // all text values 
    const allRadiouttonsLabels = await page.locator('nb-radio').allTextContents()
    expect (allRadiouttonsLabels).toContain("Option 1")

    // input value 
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect (emailValue).toEqual('test@test.com')

    const placeholeder = await emailField.getAttribute('placeholder')
    expect(placeholeder).toEqual('Email')
})


test ('assertions', async ({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
    // General seertions
    const value = 5
    expect(value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    // Locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    //Soft assertion (test continues if test failed)
    await expect.soft(basicFormButton).toHaveText("Submit")
    await basicFormButton.click()

})
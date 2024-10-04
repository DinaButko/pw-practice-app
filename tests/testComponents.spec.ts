import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/')
})

test.describe('Form Layouts page', () => {
    test.beforeEach( async ({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async ({page}) => {

        const usingTheGridEmalInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name:"Email"})
        await usingTheGridEmalInput.fill('test@tets.com')
        await usingTheGridEmalInput.clear()

        //await usingTheGridEmalInput.pressSequentially('test2@test.com')
        await usingTheGridEmalInput.pressSequentially('test2@test.com', {delay: 500})
        
        // generic assertion
        const inputValue = await usingTheGridEmalInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        //locator assertion
        await expect(usingTheGridEmalInput).toHaveValue('test2@test.com')

    })

    test('radio buttons', async ({page}) => {

        const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})
        //option 1
        //await usingTheGridForm.getByLabel('Option 1').check({force: true})

        //option 2
        await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force:true})

        //generic assertion 
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
        expect(radioStatus).toBeTruthy

        //locator assertion 
        await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked

        await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force:true})
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()
        
        
    })


})

test('checkboxes', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force:true})
    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force:true})

    const allBoxes = page.getByRole('checkbox')

    for (const box of await allBoxes.all()) {

        await box.uncheck({force:true})
        expect(await box.isChecked()).toBeFalsy

    }

})

test('list and dropdowns', async({page}) => {
    const dropDown = page.locator('ngx-header nb-select')
    await dropDown.click()

    page.getByRole('list') //when the list has a UL tag
    page.getByRole('listitem') // when the list has LI tag

    //const optionListItem = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
   

})
import { test, expect } from '@playwright/test'
import { timeout } from 'rxjs-compat/operator/timeout'

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
    await optionList.filter({hasText: 'cosmic'}).click()
   
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)",
    }

    for (const color in colors) {
        await dropDown.click()
        await optionList.filter({ hasText: color }).click()
        await expect(header).toHaveCSS('background-color', colors[color])
    } 

})

test('tooltips', async({page}) => {

    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()
    const toolTipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    await toolTipCard.getByRole('button', {name: 'Top'}).hover()

    page.getByRole('tooltip') // if you have a role tooltip created
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')

})


test('dialog boxes', async({page}) => {

    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()


    page.on('dialog', dialog=>{
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()

    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')

})

test('tables', async ({ page }) => {
    // Navigate to "Tables & Data" and then to "Smart Table"
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    // 1. Get the row containing "twitter@outlook.com"
    const targetRow = page.getByRole('row', { name: 'twitter@outlook.com' });

    // 2. Click the edit button in this row
    await targetRow.locator('.nb-edit').click();

    // 3. Clear the "Age" field and enter a new value ('35')
    await page.locator('input-editor').getByPlaceholder('Age').clear();
    await page.locator('input-editor').getByPlaceholder('Age').fill('35');

    // 4. Confirm the edit by clicking the checkmark
    await page.locator('.nb-checkmark').click();

    // 5. Add an assertion to verify that the age is now '35'
    // Locate the cell in the row that contains the age and check its content
    const ageCell = await targetRow.locator('td').nth(6); // Adjust 'nth()' to the correct index for the Age column
    await expect(ageCell).toHaveText('35');

    //2 get the row based on the value in the specific column

    //2.1 navigate to the secong page
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowById = await page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowById.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder('E-mail').clear();
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('dina@test.com');

    await page.locator('.nb-checkmark').click();

    const ageEmail = await targetRowById.locator('td').nth(5); // Adjust 'nth()' to the correct index for the Age column
    await expect(ageEmail).toHaveText('dina@test.com');

});


test('tables part two', async ({ page }) => {
    // Filter values in the tables
    // Navigate to "Tables & Data" and then to "Smart Table"
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart Table').click();

    const ages = ["20", "30", "40", "200"]
    for (let age of ages) {
        await page.locator('input-filter').getByPlaceholder('age').clear();
        await page.locator('input-filter').getByPlaceholder('age').fill(age);
        await page.waitForTimeout(500)
        const ageRows = page.locator('tbody tr')
        for (let row of await ageRows.all()) {
            const celValue = await row.locator('td').last().textContent()
            if (age== "200"){

                expect(await page.getByRole('table').textContent()).toContain('No data found')
            } else {
            expect(celValue).toEqual(age)
        }
        }
    }

});


test('data picker', async ({ page }) => {
    // Filter values in the tables
    // Navigate to "Tables & Data" and then to "Smart Table"
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();
    const calendarInputField = page.getByPlaceholder('Form Picker')

    await calendarInputField.click()

    let date = new Date()
    date.setDate(date.getDate()+500)

    const expectedDate = date.getDate().toString()

    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`

    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()

    await expect(calendarInputField).toHaveValue(dateToAssert)


});


test('sliders', async ({ page }) => {

    // Update attribute
    // const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    // await tempGauge.evaluate(node => {
    //     node.setAttribute('cx', '232.630')
    //     node.setAttribute('cy', '232.630')
    // })
    // await tempGauge.click()

    //Mouse movement
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()

    const box = await tempBox.boundingBox()
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2

    await page.mouse.move(x,y)
    await page.mouse.down()
    await page.mouse.move(x + 100, y)
    await page.mouse.move(x+100, y+100)
    await page.mouse.up()
    await expect(tempBox).toContainText('30')

}); 

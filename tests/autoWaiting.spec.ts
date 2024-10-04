import {test, expect} from '@playwright/test'
import { timeout } from 'rxjs/operators'

test.beforeEach(async ({page}, testInfo)=>{
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test('auto waiting', async({page}) => {

    const successButton = page.locator('.bg-success')
    // await successButton.click()


    // const text = successButton.textContent()
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})

})

test('alternate waits', async({page}) => {

    const successButton = page.locator('.bg-success')
    // __wait for element
    //await page.waitForSelector('.bg-success')

    // wait for particular response 
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')


    // wait for network calls to be completed (but not recommended)
    await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    await expect(successButton).toHaveText('Data loaded with AJAX get request.')

})

test('different timeouts', async({page}) => {

    test.setTimeout(10000)
    test.slow() // if we have flaky test and we want to increase time
    const successButton = page.locator('.bg-success')
    await successButton.click()

})

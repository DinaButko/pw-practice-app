import { test, expect } from '@playwright/test'
import { timeout } from 'rxjs-compat/operator/timeout'
import { NavigationPage } from './page.object/navigationPage'
import { FormLayoutPage } from './page.object/formlayotsPage'
import { DatePickerPage } from './page.object/datepickerPage'
import { PageManager } from './page.object/pagemanager'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/')
})


test('navigate to form page', async({page}) => {
  const pm = new PageManager(page)

  await pm.navigateTo().formLayoutsPage
  await pm.navigateTo().datePickerPage()
  await pm.navigateTo().smartTablePage()
  await pm.navigateTo().toastrPage()
  await pm.navigateTo().tooltipPage()

})

test('parametrized methods', async({page})=> {
  const pm = new PageManager(page)

  await pm.navigateTo().formLayoutsPage()
  await pm.onFormLayoutspage().submitUsingTheGridFormWithCredentialsAndSelectOption("test@gmail.com", "123", "Option 1")

  await pm.onFormLayoutspage().submitInlineFormWinNameEmailAndCheckBox('Dina', 'test@dina.com', true)
  await pm.navigateTo().datePickerPage()
  await pm.ondatePickerPage().selectCommonDatePickerFromToday(10)
  await pm.ondatePickerPage().selectDatePickerWithRangeFromToday(6, 15)
})
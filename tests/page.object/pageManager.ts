import { Page, expect } from '@playwright/test'
import { timeout } from 'rxjs-compat/operator/timeout'
import { NavigationPage } from '../page.object/navigationPage'
import { FormLayoutPage } from '../page.object/formlayotsPage'
import { DatePickerPage } from '../page.object/datepickerPage'

export class PageManager {
    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoutspage: FormLayoutPage
    private readonly datepickerpage: DatePickerPage

    constructor(page: Page) {

        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutspage = new FormLayoutPage(this.page)
        this.datepickerpage = new DatePickerPage(this.page)

    }

    navigateTo(){
        return this.navigationPage
    }

    onFormLayoutspage(){
        return this.formLayoutspage
    }

    ondatePickerPage(){
        return this.datepickerpage
    }

}
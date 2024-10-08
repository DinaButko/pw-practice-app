import { Locator, Page } from "@playwright/test";

export class NavigationPage {

    readonly page: Page
    readonly fromLayoutsMenuItem: Locator
    readonly datePickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastMenuItem: Locator
    readonly toolTipMenuItem: Locator

    
    constructor(page: Page){
        this.page = page
        this.fromLayoutsMenuItem = page.getByText('Form Layouts')
        this.datePickerMenuItem = page.getByText('Datepicker')
        this.smartTableMenuItem = page.getByText('Smart Table')
        this.toastMenuItem = page.getByText('Toastr')
        this.toolTipMenuItem = page.getByText('Tooltip')

    }

    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        await this.fromLayoutsMenuItem.click()
    }

    async datePickerPage() {

        await this.selectGroupMenuItem('Forms')
        await this.datePickerMenuItem.click()
    }

    async smartTablePage() {

        await this.selectGroupMenuItem('Tables & Data');
        await this.smartTableMenuItem.click()
    }

    async toastrPage() {

        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toastMenuItem.click()
    }

    async tooltipPage() {

        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toastMenuItem.click()
    }

    private async selectGroupMenuItem(groupItemTitle:string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const  expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == "false")
            await groupMenuItem.click()

    }

}
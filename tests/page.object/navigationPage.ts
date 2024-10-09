import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {

    readonly fromLayoutsMenuItem: Locator
    readonly datePickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastMenuItem: Locator
    readonly toolTipMenuItem: Locator

    
    constructor(page: Page){
        super(page)

    }

    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        await this.fromLayoutsMenuItem.click()
        await this.waitForNumberOfSeconds(2)
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
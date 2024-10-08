import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutPage extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password:string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
        await usingTheGridForm.getByRole('textbox', {name:"Email"}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name:"Password"}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()
    }

    /**
     * This method fills out inline from with user details
     * @param name  - should be name and surname
     * @param email  - user email
     * @param rememberMe - true or false if user session to be saved 
     */
    async submitInlineFormWinNameEmailAndCheckBox(name: string, email: string, rememberMe: boolean){
        const inlineForm = this.page.locator('nb-card', {hasText: "Inline Form"})
        await inlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)
        await inlineForm.getByRole('textbox', {name: "Email"}).fill(email)

        if (rememberMe) {
            await inlineForm.getByRole('checkbox').check({force: true})
            await inlineForm.getByRole('button').click()
        }

        

    }
}
import { UserInput } from "./userInput.model"

describe("UserInput tests", () => {
    test("validate function with just firstName", () => {
        const ui = new UserInput();
        ui.firstName = "Test"
        const [valid, errors] = ui.validate()
        expect(valid).toBeFalsy()
        expect(errors.length).toBe(4)
    })

    test("validate function with all valid parameters", () => {
        const ui = new UserInput();
        ui.firstName = "Test"
        ui.password = "Test"
        ui.email = "Test"
        ui.organizationId = "Test"
        ui.lastName = "Test"

        const [valid, errors] = ui.validate()
        expect(valid).toBeTruthy()
        expect(errors.length).toBe(0)
    })
})
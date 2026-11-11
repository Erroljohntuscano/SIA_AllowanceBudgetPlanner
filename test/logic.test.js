
const {
    validateBudgetInputs,
    calculateRemainingBalance,
    calculateDailyBudget
} = require("../src/logic");

describe("Allowance Budget Planner Unit Tests", () => {

    test("Should calculate remaining balance correctly", () => {
        const result = calculateRemainingBalance(3000, 1200);

        expect(result).toBe(1800);
    });

    test("Should calculate daily budget correctly", () => {
        const result = calculateDailyBudget(3000, 1200, 15);

        expect(result).toBe(120);
    });

    test("Should reject negative allowance", () => {
        expect(() => {
            validateBudgetInputs(-1000, 200, 10);
        }).toThrow("Allowance cannot be negative.");
    });

    test("Should reject expenses greater than allowance", () => {
        expect(() => {
            validateBudgetInputs(1000, 1500, 10);
        }).toThrow("Expenses cannot exceed allowance.");
    });

    test("Should reject zero remaining days", () => {
        expect(() => {
            calculateDailyBudget(3000, 1200, 0);
        }).toThrow("Remaining days must be greater than zero.");
    });

});

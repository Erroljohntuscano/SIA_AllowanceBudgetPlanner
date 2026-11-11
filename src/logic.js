
function validateBudgetInputs(allowance, expenses, remainingDays) {
    if (
        typeof allowance !== "number" ||
        typeof expenses !== "number" ||
        typeof remainingDays !== "number" ||
        !Number.isFinite(allowance) ||
        !Number.isFinite(expenses) ||
        !Number.isFinite(remainingDays)
    ) {
        throw new Error("All inputs must be valid numbers.");
    }

    if (allowance < 0) {
        throw new Error("Allowance cannot be negative.");
    }

    if (expenses < 0) {
        throw new Error("Expenses cannot be negative.");
    }

    if (expenses > allowance) {
        throw new Error("Expenses cannot exceed allowance.");
    }

    if (remainingDays <= 0) {
        throw new Error("Remaining days must be greater than zero.");
    }

    return true;
}

function calculateRemainingBalance(allowance, expenses) {
    if (
        typeof allowance !== "number" ||
        typeof expenses !== "number" ||
        !Number.isFinite(allowance) ||
        !Number.isFinite(expenses) ||
        allowance < 0 ||
        expenses < 0
    ) {
        throw new Error("Allowance and expenses must be valid non-negative numbers.");
    }

    return allowance - expenses;
}

function calculateDailyBudget(allowance, expenses, remainingDays) {
    validateBudgetInputs(allowance, expenses, remainingDays);

    const remainingBalance = calculateRemainingBalance(allowance, expenses);

    return Number((remainingBalance / remainingDays).toFixed(2));
}

module.exports = {
    validateBudgetInputs,
    calculateRemainingBalance,
    calculateDailyBudget
};

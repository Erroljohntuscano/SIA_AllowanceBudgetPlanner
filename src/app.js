
const express = require("express");
const path = require("path");

const {
    calculateRemainingBalance,
    calculateDailyBudget
} = require("./logic");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

const APP_VERSION = "1.0.0";

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        version: APP_VERSION
    });
});

app.post("/api/calculate", (req, res) => {
    try {
        const { allowance, expenses, remainingDays } = req.body;

        const remainingBalance = calculateRemainingBalance(
            allowance,
            expenses
        );

        const dailyBudget = calculateDailyBudget(
            allowance,
            expenses,
            remainingDays
        );

        res.json({
            allowance,
            expenses,
            remainingBalance,
            remainingDays,
            dailyBudget
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
});

module.exports = app;

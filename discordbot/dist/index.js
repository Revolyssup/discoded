"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dis_1 = __importDefault(require("./dis"));
dis_1.default();
const app = express_1.default();
app.get("/", (req, res) => {
    res.json({ a: "Hy" });
});
app.listen(3000, () => {
    console.log("Hy");
});

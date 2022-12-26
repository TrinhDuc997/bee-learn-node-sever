"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const phoneticIPA_1 = __importDefault(require("./routes/phoneticIPA"));
dotenv_1.default.config();
mongoose_1.default
    .connect(`${process.env.DATABASE_URL}${process.env.DB_NAME}?${process.env.DB_OPTIONS}`, {
    serverSelectionTimeoutMS: 5000,
})
    .catch((err) => console.log(err));
/* CONNECT DATABASE - end */
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("common"));
app.get("/", (req, res) => {
    res.send("Hello world");
});
//ROUTER API V1
app.use("/v1/posts", phoneticIPA_1.default);
app.listen(process.env.PORT || 8000, () => {
    console.log("sever is running...");
});

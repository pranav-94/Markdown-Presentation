"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("./db"));
class Slide extends sequelize_1.Model {
}
Slide.init({
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    markdown: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    layout: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "default",
    },
}, {
    sequelize: db_1.default,
    modelName: "Slide",
});
exports.default = Slide;

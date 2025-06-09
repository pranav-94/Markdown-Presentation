"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes.ts
const express_1 = require("express");
const model_1 = __importDefault(require("../model"));
const router = (0, express_1.Router)();
router.get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slides = yield model_1.default.findAll();
    res.json(slides);
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slide = yield model_1.default.findByPk(req.params.id);
    if (slide)
        res.json(slide);
    else
        res.status(404).json({ error: "Not found" });
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, markdown, layout } = req.body;
    const slide = yield model_1.default.create({ title, markdown, layout });
    res.status(201).json(slide);
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slide = yield model_1.default.findByPk(req.params.id);
    if (!slide)
        return res.status(404).json({ error: "Not found" });
    const { title, markdown, layout } = req.body;
    yield slide.update({ title, markdown, layout });
    res.json(slide);
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const slide = yield model_1.default.findByPk(req.params.id);
    if (!slide)
        return res.status(404).json({ error: "Not found" });
    yield slide.destroy();
    res.status(204).end();
}));
exports.default = router;

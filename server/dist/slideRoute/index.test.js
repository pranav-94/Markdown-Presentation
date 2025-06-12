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
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./index"));
const model_1 = __importDefault(require("../model"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/slides', index_1.default);
describe('Slide Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('GET /api/slides/ should return all slides', () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.default.findAll.mockResolvedValue([
            { id: 1, title: 'A', markdown: 'B', layout: 'default' }
        ]);
        const res = yield (0, supertest_1.default)(app).get('/api/slides/');
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    }));
    it('GET /api/slides/:id returns a slide', () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.default.findByPk.mockResolvedValue({ id: 1, title: 'A', markdown: 'B', layout: 'default' });
        const res = yield (0, supertest_1.default)(app).get('/api/slides/1');
        expect(res.status).toBe(200);
        expect(res.body.id).toBe(1);
    }));
    it('POST /api/slides/ creates a slide', () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.default.create.mockResolvedValue({ id: 2, title: 'T', markdown: 'M', layout: 'default' });
        const res = yield (0, supertest_1.default)(app).post('/api/slides/').send({ title: 'T', markdown: 'M', layout: 'default' });
        expect(res.status).toBe(201);
        expect(res.body.id).toBe(2);
    }));
    it('PUT /api/slides/:id updates a slide', () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.default.findByPk({
            update: jest.fn().mockResolvedValue({}),
            id: 3, title: 'Old', markdown: 'Old', layout: 'default'
        });
        const res = yield (0, supertest_1.default)(app).put('/api/slides/3').send({ title: 'New', markdown: 'New', layout: 'default' });
        expect(res.status).toBe(200);
    }));
    it('DELETE /api/slides/:id deletes a slide', () => __awaiter(void 0, void 0, void 0, function* () {
        model_1.default.findByPk.mockResolvedValue({
            destroy: jest.fn().mockResolvedValue({})
        });
        const res = yield (0, supertest_1.default)(app).delete('/api/slides/4');
        expect(res.status).toBe(204);
    }));
});

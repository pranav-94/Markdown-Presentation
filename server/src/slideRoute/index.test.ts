import request from 'supertest';
import express from 'express';
import slideRouter from './index';
import Slide from '../model';

const app = express();
app.use(express.json());
app.use('/api/slides', slideRouter);

describe('Slide Routes', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('GET /api/slides/ should return all slides', async () => {
    (Slide.findAll as any) = jest.fn().mockResolvedValue([
      { id: 1, title: 'A', markdown: 'B', layout: 'default' }
    ]);
    const res = await request(app).get('/api/slides/');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('GET /api/slides/:id returns a slide', async () => {
    (Slide.findByPk as any) = jest.fn().mockResolvedValue({ id: 1, title: 'A', markdown: 'B', layout: 'default' });
    const res = await request(app).get('/api/slides/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(1);
  });

  it('POST /api/slides/ creates a slide', async () => {
    (Slide.create as any) = jest.fn().mockResolvedValue({ id: 2, title: 'T', markdown: 'M', layout: 'default' });
    const res = await request(app).post('/api/slides/').send({ title: 'T', markdown: 'M', layout: 'default' });
    expect(res.status).toBe(201);
    expect(res.body.id).toBe(2);
  });

  it('PUT /api/slides/:id updates a slide', async () => {
    (Slide.findByPk as any) = jest.fn().mockResolvedValue({
      update: jest.fn().mockResolvedValue({}),
      id: 3, title: 'Old', markdown: 'Old', layout: 'default'
    });
    const res = await request(app).put('/api/slides/3').send({ title: 'New', markdown: 'New', layout: 'default' });
    expect(res.status).toBe(200);
  });

  it('DELETE /api/slides/:id deletes a slide', async () => {
    (Slide.findByPk as any) = jest.fn().mockResolvedValue({
      destroy: jest.fn().mockResolvedValue({})
    });
    const res = await request(app).delete('/api/slides/4');
    expect(res.status).toBe(204);
  });
});
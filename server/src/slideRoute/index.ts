// routes.ts
import { Router } from "express";
import Slide from "../model";

const router = Router();

router.get("/", async (_, res) => {
  const slides = await Slide.findAll();
  res.json(slides);
});

router.get("/:id", async (req, res) => {
  const slide = await Slide.findByPk(req.params.id);
  if (slide) res.json(slide);
  else res.status(404).json({ error: "Not found" });
});

router.post("/", async (req, res) => {
  const { title, markdown, layout } = req.body;
  const slide = await Slide.create({ title, markdown, layout });
  res.status(201).json(slide);
});

router.put("/:id", async (req, res:any) => {
  const slide = await Slide.findByPk(req.params.id);
  if (!slide) return res.status(404).json({ error: "Not found" });
  const { title, markdown, layout } = req.body;
  await slide.update({ title, markdown, layout });
  res.json(slide);
});

router.delete("/:id", async (req, res:any) => {
  const slide = await Slide.findByPk(req.params.id);
  if (!slide) return res.status(404).json({ error: "Not found" });
  await slide.destroy();
  res.status(204).end();
});

export default router;

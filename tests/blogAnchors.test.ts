import assert from "node:assert/strict";
import test from "node:test";
import { withHeadingAnchors } from "../src/lib/blogAnchors.ts";

const headings = [
  "Definí una única fuente de stock por sucursal",
  "Registrá cada movimiento donde ocurre",
  "Ordená las transferencias entre locales",
  "Repartí permisos y responsabilidades",
  "Controlá desvíos con inventarios cíclicos",
  "Leé indicadores que permitan decidir",
  "Empezá por el circuito que más diferencias genera",
];

const fragments = [
  "definí-una-única-fuente-de-stock-por-sucursal",
  "registrá-cada-movimiento-donde-ocurre",
  "ordená-las-transferencias-entre-locales",
  "repartí-permisos-y-responsabilidades",
  "controlá-desvíos-con-inventarios-cíclicos",
  "leé-indicadores-que-permitan-decidir",
  "empezá-por-el-circuito-que-más-diferencias-genera",
];

test("heading IDs match the existing SEOdraft table of contents", () => {
  const blocks = headings.map((text, index) => ({
    _type: "block",
    _key: String(index),
    style: "h2",
    children: [{ _type: "span", text }],
  }));

  const result = withHeadingAnchors(blocks);
  assert.deepEqual(
    result.map((block) => block.anchorId),
    fragments,
  );
  assert.equal(blocks[0].children[0].text, headings[0]);
});

test("duplicate headings get unique IDs and ordinary paragraphs stay unchanged", () => {
  const blocks = [
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "Stock: ¿qué sigue?" }],
    },
    {
      _type: "block",
      style: "normal",
      children: [{ _type: "span", text: "Stock: ¿qué sigue?" }],
    },
    {
      _type: "block",
      style: "h3",
      children: [{ _type: "span", text: "Stock: ¿qué sigue?" }],
    },
  ];

  const result = withHeadingAnchors(blocks);
  assert.equal(result[0].anchorId, "stock-qué-sigue");
  assert.equal(result[1].anchorId, undefined);
  assert.equal(result[2].anchorId, "stock-qué-sigue-2");
});

import { put, head } from "@vercel/blob";

const BLOB_PATH = "panel-tareas/tasks.json";
const EMPTY = { tasks: [], dataVersion: 0 };

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method === "GET") {
    try {
      const blob = await head(BLOB_PATH).catch(() => null);
      if (!blob) {
        res.status(200).json(EMPTY);
        return;
      }
      const response = await fetch(blob.url, { cache: "no-store" });
      const data = await response.json();
      res.status(200).json(data);
    } catch (e) {
      res.status(200).json(EMPTY);
    }
    return;
  }

  if (req.method === "PUT") {
    try {
      let body = req.body;
      if (typeof body === "string") body = JSON.parse(body);
      await put(BLOB_PATH, JSON.stringify(body), {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: "application/json",
      });
      res.status(200).json({ ok: true });
    } catch (e) {
      res.status(400).json({ ok: false, error: String(e) });
    }
    return;
  }

  res.status(405).send("Method not allowed");
}

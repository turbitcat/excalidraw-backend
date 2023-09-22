import { Context, Hono } from "hono";
import { cors } from "hono/cors"
import { customAlphabet } from "nanoid";

type Bindings = {
  STORAGE: R2Bucket;
};

const BASE_PATH = "/api/v2";

const app = new Hono<{ Bindings: Bindings }>().basePath(BASE_PATH);

app.use("*", cors({
    origin: ['https://draw.ddot.win', 'https://excalidraw-f.pages.dev'],
  })
)

function getObject(id2key: (id: string) => string) {
  async function getObjectMiddle(
    c: Context<{ Bindings: Bindings }>
  ): Promise<Response> {
    const id = c.req.param("id");
    const key = id2key(id);
    const data = await c.env.STORAGE.get(key);
    if (data === null) {
      return c.notFound();
    }
    return new Response(data.body, {
      headers: { "Content-Type": "application/octet-stream" },
    });
  }
  return getObjectMiddle;
}

function putObject(id2key: (id: string) => string, genId = false) {
  async function putObjectMiddle(
    c: Context<{ Bindings: Bindings }>
  ): Promise<Response> {
    const id = genId ? customAlphabet("0123456789", 16)() : c.req.param("id");
    const key = id2key(id);
    if (genId) {
      if ((await c.env.STORAGE.head(key)) !== null) {
        throw new Error();
      }
    }
    await c.env.STORAGE.put(key, await c.req.arrayBuffer());
    return c.json({ id });
  }
  return putObjectMiddle;
}

app
  .get(
    "/files/:id",
    getObject((id) => `files/${id}`)
  )
  .put(putObject((id) => `files/${id}`));

app
  .get(
    "/rooms/:id",
    getObject((id) => `rooms/${id}`)
  )
  .put(putObject((id) => `rooms/${id}`));

app.get(
  "/scenes/:id",
  getObject((id) => `scenes/${id}`)
);
app.post(
  "/scenes/",
  putObject((id) => `scenes/${id}`, true)
);
export default app;

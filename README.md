# excalidraw-storage-backend

This is a reimplementation of [excalidraw-storage-backend](https://github.com/alswl/excalidraw-storage-backend) suitable for self hosting you own instance of Excalidraw.

It can be used with [kiliandeca/excalidraw-fork](https://gitlab.com/kiliandeca/excalidraw-fork)

Feature:

- Storing scenes: when you export as a link
- Storing rooms: when you create a live collaboration
- Storing images: when you export or do a live collaboration of a scene with images

It runs on Cloudflare Workers and uses R2 bucket as a K/V store.

## Excalidraw Environement Variables

To use excalidraw-storage as a backend, build excalidraw-fork with these environment variables:

| Name                              | Value                                                 |
| --------------------------------- | ----------------------------------------------------- |
| VITE_APP_BACKEND_V2_GET_URL       | https://example.com/api/v2/scenes/                    |
| VITE_APP_BACKEND_V2_POST_URL      | https://example.com/api/v2/scenes/                    |
| VITE_APP_HTTP_STORAGE_BACKEND_URL | https://excalidraw-backend.shifiro.workers.dev/api/v2 |
| VITE_APP_STORAGE_BACKEND          | http                                                  |

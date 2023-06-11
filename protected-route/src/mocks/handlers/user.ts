import { rest } from "msw";

export const userHandler = [
  rest.post("http://127.0.0.1:5173/user/login", async (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ accessToken: "access token" }));
  }),
];

import { z } from "zod";

import { Form, Input } from "@/components/form";
import { Button } from "@/components/button";

const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const LoginForm = () => {
  return (
    <Form onSubmit={(values) => console.log(values)} schema={loginInputSchema}>
      {({ register, formState }) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Input
            label="Email"
            type="email"
            registration={register("email")}
            error={formState.errors.email}
          />
          <Input
            label="Password"
            type="password"
            registration={register("password")}
            error={formState.errors.password}
          />
          <div>
            <Button variant="contained" type="submit">
              Login
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
};

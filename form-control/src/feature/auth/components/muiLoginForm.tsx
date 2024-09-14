import { z } from "zod";

import { Form, Input } from "@/components/form-with-mui";
import { Button } from "@/components/button";

const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const LoginFormWithMui = () => {
  return (
    <Form onSubmit={(values) => console.log(values)} schema={loginInputSchema}>
      {({ control, formState }) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Input
            label="Email"
            type="email"
            name="email"
            control={control}
            error={formState.errors.email}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            control={control}
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

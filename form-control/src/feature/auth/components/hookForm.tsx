import { z } from "zod";
import { Box } from "@mui/material";

import { Button } from "@/components/button";
import { useZodForm } from "@/components/form";
import { Input } from "@/components/form-with-mui";

const loginInputSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const HookForm = () => {
  const { formState, control, onSubmit } = useZodForm({
    schema: loginInputSchema,
    onFormValueChange: (_, formPath, setValue) => {
      if (formPath === "password") {
        setValue("email", "test@test.com");
      }
    },
    onFormSubmit: (data) => {
      console.log(data, "submit 했습니다");
    },
  });

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 4 }}
    >
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
      <Button variant="contained" type="submit">
        Login
      </Button>
    </Box>
  );
};

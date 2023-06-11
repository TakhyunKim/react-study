export type LoginRequestPayload = {
  id: string;
  password: string;
};

export async function login({ id, password }: LoginRequestPayload) {
  const response = await fetch("/user/login", {
    method: "POST",
    body: JSON.stringify({ id, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

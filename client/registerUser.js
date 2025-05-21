const API = import.meta.env.API_URL
export default async function registerUser(email, password, name, bio) {
  const response = await fetch(`${API}/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ email, password, name, bio }),
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data?.errors?.[0]?.msg || "Registration failed")
  }

  return response.json()
}

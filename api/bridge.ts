export async function runAuraQuery(query: string) {
  const res = await fetch("/api/run", {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: { "Content-Type": "application/json" },
  });

  return res.json();
}

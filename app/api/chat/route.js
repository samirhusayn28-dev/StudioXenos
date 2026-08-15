export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || !messages.length) {
      return Response.json({ error: "messages array required" }, { status: 400 });
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages,
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Groq API error:", data);
      return Response.json(
        { error: data?.error?.message || "Groq API error" },
        { status: res.status }
      );
    }

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Sorry, I couldn't process that. Please try again.";

    return Response.json({ reply });
  } catch (err) {
    console.error("chat route failed:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
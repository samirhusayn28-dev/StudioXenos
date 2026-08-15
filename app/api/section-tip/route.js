export async function POST(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return Response.json({ text: "Explore this section to learn more." }, { status: 400 });
    }

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: `Give one short, friendly, helpful tip (max 16 words, no quotes) for a visitor currently viewing the "${id}" section of a digital agency website called Studio Xenos. Make it feel like a helpful nudge, not generic.`,
          },
        ],
        max_tokens: 40,
        temperature: 0.9,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Groq API error (section-tip):", data);
      return Response.json({ text: "Explore this section to learn more." }, { status: 200 });
    }

    const text = data?.choices?.[0]?.message?.content?.trim() || "Explore this section to learn more.";
    return Response.json({ text });
  } catch (err) {
    console.error("section-tip route failed:", err);
    return Response.json({ text: "Explore this section to learn more." }, { status: 200 });
  }
}
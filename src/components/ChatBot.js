import React, { useState, useRef, useEffect } from "react";

const SYSTEM_PROMPT = `You are a helpful customer service assistant for StudioXenos, a creative studio. 
You help visitors with questions about services, projects, pricing, collaboration, and general inquiries.
Keep responses concise, friendly, and professional. 
If asked about specific pricing or custom projects, encourage them to reach out via the contact form or email.
StudioXenos specializes in creative design, web development, digital art, and branding.`;

const suggestedQuestions = [
  "What services do you offer?",
  "How can I start a project?",
  "What's your typical timeline?",
  "Do you work internationally?",
];

// Display messages (includes welcome msg shown to user)
const WELCOME = "Hey! 👋 Welcome to StudioXenos. I'm here to help. What can I do for you today?";

export default function ChatBot({ theme }) {
  const [isOpen, setIsOpen] = useState(false);

  // displayMsgs = what user sees: [{role:"assistant"|"user", text}]
  const [displayMsgs, setDisplayMsgs] = useState([
    { role: "assistant", text: WELCOME },
  ]);

  // historyMsgs = what we send to Gemini: only actual user↔model turns (no welcome)
  const [historyMsgs, setHistoryMsgs] = useState([]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const detectTheme = () => {
      if (theme === "dark")  { setIsDark(true);  return; }
      if (theme === "light") { setIsDark(false); return; }
      const html = document.documentElement;
      const body = document.body;
      if (html.classList.contains("dark")  || html.dataset.theme === "dark"  ||
          body.classList.contains("dark")  || body.dataset.theme === "dark")  { setIsDark(true);  return; }
      if (html.classList.contains("light") || html.dataset.theme === "light" ||
          body.classList.contains("light") || body.dataset.theme === "light") { setIsDark(false); return; }
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    };
    detectTheme();
    const observer = new MutationObserver(detectTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class","data-theme"] });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class","data-theme"] });
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", detectTheme);
    return () => { observer.disconnect(); mq.removeEventListener("change", detectTheme); };
  }, [theme]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayMsgs]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || isLoading) return;

    setInput("");
    setShowSuggestions(false);

    const newDisplay = [...displayMsgs, { role: "user", text: userText }];
    setDisplayMsgs(newDisplay);
    setIsLoading(true);

    // Groq: OpenAI-compatible format
    const newHistory = [
      ...historyMsgs,
      { role: "user", content: userText },
    ];

    try {
      const API_KEY = process.env.REACT_APP_GROQ_API_KEY || "";
      const url = "https://api.groq.com/openai/v1/chat/completions";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...newHistory,
          ],
          max_tokens: 1024,
          temperature: 0.7,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Groq API Error:", data);
        throw new Error(data?.error?.message || "API error");
      }

      const reply =
        data?.choices?.[0]?.message?.content ||
        "Sorry, I couldn't process that. Please try again.";

      setHistoryMsgs([
        ...newHistory,
        { role: "assistant", content: reply },
      ]);

      setDisplayMsgs([...newDisplay, { role: "assistant", text: reply }]);
    } catch (err) {
      console.error("ChatBot error:", err);
      setDisplayMsgs([
        ...newDisplay,
        { role: "assistant", text: `Error: ${err.message}` },
      ]);
      setHistoryMsgs([...historyMsgs]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  // ── Theme tokens ──────────────────────────────────────────────
  const t = isDark ? {
    window: "#0a0a0f", header: "linear-gradient(135deg,#0f0f1a,#13131f)",
    headerBorder: "rgba(255,255,255,0.06)", titleColor: "#f0f0f0",
    closeBg: "rgba(255,255,255,0.06)", closeColor: "#888", closeHoverBg: "rgba(255,255,255,0.1)",
    msgsBg: "#0a0a0f",
    assistantBg: "rgba(255,255,255,0.05)", assistantBorder: "rgba(255,255,255,0.07)", assistantText: "#d4d4d8",
    inputAreaBg: "#0a0a0f", inputAreaBorder: "rgba(255,255,255,0.06)",
    textareaBg: "rgba(255,255,255,0.05)", textareaBorder: "rgba(255,255,255,0.09)",
    textareaColor: "#e4e4e7", placeholder: "#555",
    windowBorder: "rgba(255,255,255,0.08)",
    windowShadow: "0 24px 80px rgba(0,0,0,0.7)",
    chipColor: "#a5b4fc",
  } : {
    window: "#ffffff", header: "linear-gradient(135deg,#f8f8ff,#f0f0fa)",
    headerBorder: "rgba(0,0,0,0.08)", titleColor: "#111",
    closeBg: "rgba(0,0,0,0.06)", closeColor: "#666", closeHoverBg: "rgba(0,0,0,0.1)",
    msgsBg: "#f4f4ff",
    assistantBg: "#fff", assistantBorder: "rgba(0,0,0,0.09)", assistantText: "#222",
    inputAreaBg: "#ffffff", inputAreaBorder: "rgba(0,0,0,0.08)",
    textareaBg: "rgba(0,0,0,0.03)", textareaBorder: "rgba(0,0,0,0.1)",
    textareaColor: "#111", placeholder: "#aaa",
    windowBorder: "rgba(0,0,0,0.1)",
    windowShadow: "0 24px 80px rgba(0,0,0,0.15)",
    chipColor: "#4f46e5",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes xenosUp   { from{opacity:0;transform:scale(.85) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes xenosIn   { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes xenosPulse{ 0%,100%{opacity:1} 50%{opacity:.4} }
        @keyframes xenosBounce{ 0%,80%,100%{transform:translateY(0);opacity:.5} 40%{transform:translateY(-5px);opacity:1} }
        .sx-d1{animation:xenosBounce 1.2s infinite}
        .sx-d2{animation:xenosBounce 1.2s infinite .15s}
        .sx-d3{animation:xenosBounce 1.2s infinite .3s}
        .sx-pulse{animation:xenosPulse 2s infinite}
        .sx-msgs::-webkit-scrollbar{width:4px}
        .sx-msgs::-webkit-scrollbar-thumb{background:rgba(128,128,128,.2);border-radius:2px}

        /* Tablet/small laptop — slightly smaller window */
        @media(max-width:768px){
          .sx-win{width:340px!important;height:500px!important;}
        }

        /* Mobile — minimal: full-width-ish window, shorter height, smaller FAB */
        @media(max-width:480px){
          .sx-win{
            width:calc(100vw - 24px)!important;
            right:12px!important;
            left:12px!important;
            bottom:80px!important;
            height:min(70vh,500px)!important;
            border-radius:16px!important;
          }
          .sx-fab{
            width:52px!important;
            height:52px!important;
            right:16px!important;
            bottom:18px!important;
          }
        }

        /* Very short screens (landscape phones, small devices) */
        @media(max-height:600px){
          .sx-win{height:min(62vh,420px)!important;bottom:74px!important;}
        }
      `}</style>

      {/* FAB */}
      <button
        className="sx-fab"
        onClick={() => setIsOpen(o => !o)}
        style={{
          position:"fixed", bottom:28, right:28, width:60, height:60, borderRadius:"50%",
          background:"linear-gradient(135deg,#1a1a2e,#0f0f0f)",
          border:"1.5px solid rgba(255,255,255,0.15)",
          boxShadow:"0 8px 32px rgba(0,0,0,0.45)",
          cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
          zIndex:9999, transition:"transform .25s cubic-bezier(.34,1.56,.64,1)",
        }}
        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"}
        onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
        aria-label="Chat"
      >
        {isOpen
          ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        }
      </button>

      {/* Window */}
      {isOpen && (
        <div
          className="sx-win"
          style={{
            position:"fixed", bottom:100, right:28, width:370, height:540,
            background:t.window, border:`1px solid ${t.windowBorder}`,
            borderRadius:20, boxShadow:t.windowShadow,
            display:"flex", flexDirection:"column", overflow:"hidden",
            zIndex:9998, transformOrigin:"bottom right",
            animation:"xenosUp .3s cubic-bezier(.34,1.36,.64,1)",
            transition:"background .3s,border-color .3s",
            fontFamily:"'DM Sans',sans-serif",
          }}
        >
          {/* Header */}
          <div style={{
            padding:"16px 20px", background:t.header,
            borderBottom:`1px solid ${t.headerBorder}`,
            display:"flex", alignItems:"center", gap:12,
          }}>
            <div style={{
              width:38, height:38, borderRadius:12, flexShrink:0,
              background:"linear-gradient(135deg,#6366f1,#8b5cf6)",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, color:"#fff",
            }}>SX</div>

            <div>
              <div style={{ margin:0, fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14, color:t.titleColor }}>
                StudioXenos Support
              </div>
              <div style={{ fontSize:11, color:"#4ade80", display:"flex", alignItems:"center", gap:4, marginTop:2 }}>
                <span className="sx-pulse" style={{ width:6, height:6, background:"#4ade80", borderRadius:"50%", display:"inline-block" }}/>
                Online — replies instantly
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                marginLeft:"auto", background:t.closeBg, border:"none",
                color:t.closeColor, width:28, height:28, borderRadius:8,
                cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
                transition:"background .2s",
              }}
              onMouseEnter={e=>e.currentTarget.style.background=t.closeHoverBg}
              onMouseLeave={e=>e.currentTarget.style.background=t.closeBg}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="sx-msgs" style={{
            flex:1, overflowY:"auto", padding:16,
            display:"flex", flexDirection:"column", gap:10,
            background:t.msgsBg, transition:"background .3s",
          }}>
            {displayMsgs.map((msg, i) => (
              <div key={i} style={
                msg.role === "user"
                  ? {
                      maxWidth:"82%", padding:"10px 14px",
                      borderRadius:"14px 14px 3px 14px",
                      background:"linear-gradient(135deg,#6366f1,#7c3aed)",
                      color:"#fff", fontSize:13.5, lineHeight:1.55,
                      alignSelf:"flex-end",
                      boxShadow:"0 4px 16px rgba(99,102,241,.3)",
                      animation:"xenosIn .25s ease",
                    }
                  : {
                      maxWidth:"82%", padding:"10px 14px",
                      borderRadius:"14px 14px 14px 3px",
                      background:t.assistantBg,
                      border:`1px solid ${t.assistantBorder}`,
                      color:t.assistantText,
                      fontSize:13.5, lineHeight:1.55,
                      alignSelf:"flex-start",
                      animation:"xenosIn .25s ease",
                      transition:"background .3s,color .3s",
                    }
              }>
                {msg.text}
              </div>
            ))}

            {isLoading && (
              <div style={{
                display:"flex", gap:4, alignItems:"center",
                padding:"12px 16px",
                background:t.assistantBg, border:`1px solid ${t.assistantBorder}`,
                borderRadius:"14px 14px 14px 3px",
                alignSelf:"flex-start", width:"fit-content",
              }}>
                {[1,2,3].map(n=>(
                  <span key={n} className={`sx-d${n}`} style={{
                    width:6, height:6, background:"#6366f1",
                    borderRadius:"50%", display:"inline-block",
                  }}/>
                ))}
              </div>
            )}
            <div ref={messagesEndRef}/>
          </div>

          {/* Suggestions */}
          {showSuggestions && (
            <div style={{
              padding:"8px 16px 4px", display:"flex", flexWrap:"wrap", gap:6,
              background:t.msgsBg, borderTop:`1px solid ${t.headerBorder}`,
            }}>
              {suggestedQuestions.map((q,i) => (
                <button key={i} onClick={()=>sendMessage(q)} style={{
                  background:"rgba(99,102,241,0.1)",
                  border:"1px solid rgba(99,102,241,0.25)",
                  color:t.chipColor, fontSize:11.5,
                  padding:"5px 11px", borderRadius:20,
                  cursor:"pointer", whiteSpace:"nowrap",
                  fontFamily:"'DM Sans',sans-serif",
                  transition:"background .2s",
                }}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(99,102,241,0.2)"}
                onMouseLeave={e=>e.currentTarget.style.background="rgba(99,102,241,0.1)"}
                >{q}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding:"12px 16px 16px", display:"flex", gap:8, alignItems:"flex-end",
            background:t.inputAreaBg, borderTop:`1px solid ${t.inputAreaBorder}`,
            transition:"background .3s",
          }}>
            <textarea
              placeholder="Ask us anything..."
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={1}
              style={{
                flex:1, background:t.textareaBg, border:`1px solid ${t.textareaBorder}`,
                borderRadius:12, padding:"10px 14px", color:t.textareaColor,
                fontSize:13, fontFamily:"'DM Sans',sans-serif",
                resize:"none", outline:"none", maxHeight:100, minHeight:40,
                lineHeight:1.5, transition:"border-color .2s,background .3s,color .3s",
              }}
              onFocus={e=>e.target.style.borderColor="rgba(99,102,241,0.55)"}
              onBlur={e=>e.target.style.borderColor=t.textareaBorder}
            />
            <button
              onClick={()=>sendMessage()}
              disabled={!input.trim()||isLoading}
              style={{
                width:40, height:40, borderRadius:11,
                background:"linear-gradient(135deg,#6366f1,#7c3aed)",
                border:"none", cursor: (!input.trim()||isLoading)?"not-allowed":"pointer",
                display:"flex", alignItems:"center", justifyContent:"center",
                flexShrink:0, opacity:(!input.trim()||isLoading)?0.4:1,
                boxShadow:"0 4px 14px rgba(99,102,241,.35)",
                transition:"opacity .2s,transform .15s",
              }}
              onMouseEnter={e=>{ if(input.trim()&&!isLoading) e.currentTarget.style.transform="scale(1.08)"; }}
              onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
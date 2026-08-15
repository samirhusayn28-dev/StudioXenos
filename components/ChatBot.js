'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";

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

const WELCOME = "Hey! 👋 Welcome to StudioXenos. I'm here to help. What can I do for you today?";

const THEME = {
    light: {
        window: "#ffffff",
        header: "#f8fafc",
        headerBorder: "rgba(0, 82, 255, 0.08)",
        titleColor: "#0f172a",
        closeBg: "rgba(0, 82, 255, 0.04)",
        closeColor: "#2563eb",
        closeHoverBg: "rgba(0, 82, 255, 0.1)",
        msgsBg: "#ffffff",
        assistantBg: "#f8fafc",
        assistantBorder: "rgba(0, 82, 255, 0.08)",
        assistantText: "#1e293b",
        inputAreaBg: "#ffffff",
        inputAreaBorder: "rgba(0, 82, 255, 0.08)",
        textareaBg: "#f8fafc",
        textareaBorder: "rgba(0, 82, 255, 0.12)",
        textareaColor: "#0f172a",
        placeholder: "#94a3b8",
        windowBorder: "rgba(0, 82, 255, 0.1)",
        windowShadow: "0 10px 30px rgba(15, 23, 42, 0.08)", // Lighter shadow for speed
        fabBg: "#2563eb",
        fabBorder: "rgba(255, 255, 255, 0.2)",
        fabShadow: "0 4px 16px rgba(37, 99, 235, 0.3)", // Lighter shadow
        userBubbleBg: "#2563eb",
        userBubbleText: "#ffffff",
        chipBg: "rgba(37, 99, 235, 0.04)",
        chipBorder: "rgba(37, 99, 235, 0.1)",
        chipColor: "#2563eb",
    }
};

const MessageBubble = memo(function MessageBubble({ msg, t }) {
    const style = useMemo(
        () =>
            msg.role === "user"
                ? {
                    maxWidth: "82%", padding: "10px 14px",
                    borderRadius: "14px 14px 3px 14px",
                    background: t.userBubbleBg,
                    color: t.userBubbleText, fontSize: 13.5, lineHeight: 1.55,
                    alignSelf: "flex-end",
                    wordBreak: "break-word",
                    transform: "translateZ(0)",
                }
                : {
                    maxWidth: "82%", padding: "10px 14px",
                    borderRadius: "14px 14px 14px 3px",
                    background: t.assistantBg,
                    border: `1px solid ${t.assistantBorder}`,
                    color: t.assistantText,
                    fontSize: 13.5, lineHeight: 1.55,
                    alignSelf: "flex-start",
                    wordBreak: "break-word",
                    transform: "translateZ(0)",
                },
        [msg.role, t]
    );
    return <div style={style}>{msg.text}</div>;
});

const TypingDots = memo(function TypingDots({ t }) {
    return (
        <div style={{
            display: "flex", gap: 4, alignItems: "center",
            padding: "12px 16px",
            background: t.assistantBg, border: `1px solid ${t.assistantBorder}`,
            borderRadius: "14px 14px 14px 3px",
            alignSelf: "flex-start", width: "fit-content",
            transform: "translateZ(0)",
        }}>
            {[1, 2, 3].map(n => (
                <span key={n} className={`sx-d${n}`} style={{
                    width: 6, height: 6, background: "#2563eb",
                    borderRadius: "50%", display: "inline-block",
                }} />
            ))}
        </div>
    );
});

const SuggestionChips = memo(function SuggestionChips({ t, onPick }) {
    return (
        <>
            {suggestedQuestions.map((q, i) => (
                <button
                    key={i}
                    className="sx-chip"
                    onClick={() => onPick(q)}
                    style={{
                        background: t.chipBg,
                        border: `1px solid ${t.chipBorder}`,
                        color: t.chipColor, fontSize: 11.5,
                        padding: "5px 11px", borderRadius: 20,
                        cursor: "pointer", whiteSpace: "nowrap",
                        fontFamily: "'DM Sans',sans-serif",
                    }}
                >
                    {q}
                </button>
            ))}
        </>
    );
});

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [displayMsgs, setDisplayMsgs] = useState([
        { role: "assistant", text: WELCOME },
    ]);
    const [historyMsgs, setHistoryMsgs] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(true);

    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    const t = THEME.light;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [displayMsgs, isLoading]);

    const handleInputChange = useCallback((e) => {
        setInput(e.target.value);
        const node = textareaRef.current;
        if (node) {
            node.style.height = "auto";
            node.style.height = `${Math.min(node.scrollHeight, 100)}px`;
        }
    }, []);

    const sendMessage = useCallback(async (text) => {
        const userText = text || input.trim();
        if (!userText || isLoading) return;

        setInput("");
        if (textareaRef.current) {
            textareaRef.current.style.height = "40px";
        }
        setShowSuggestions(false);

        const newDisplay = [...displayMsgs, { role: "user", text: userText }];
        setDisplayMsgs(newDisplay);
        setIsLoading(true);

        const newHistory = [
            ...historyMsgs,
            { role: "user", content: userText },
        ];

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [
                        { role: "system", content: SYSTEM_PROMPT },
                        ...newHistory,
                    ],
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.error || "API error");
            }

            const reply =
                data?.reply ||
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
    }, [input, isLoading, displayMsgs, historyMsgs]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }, [sendMessage]);

    const toggleOpen = useCallback(() => setIsOpen(o => !o), []);
    const closeChat = useCallback(() => setIsOpen(false), []);
    const handleSend = useCallback(() => sendMessage(), [sendMessage]);
    const handleChipPick = useCallback((q) => sendMessage(q), [sendMessage]);

    const sendDisabled = !input.trim() || isLoading;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700&family=DM+Sans:wght@300;400;500&display=swap');
                
                @keyframes xenosBounce{ 0%,80%,100%{transform:translateY(0);opacity:.5} 40%{transform:translateY(-4px);opacity:1} }
                .sx-d1{animation:xenosBounce 1.2s infinite}
                .sx-d2{animation:xenosBounce 1.2s infinite .15s}
                .sx-d3{animation:xenosBounce 1.2s infinite .3s}
                
                .sx-msgs::-webkit-scrollbar{width:4px}
                .sx-msgs::-webkit-scrollbar-thumb{background:rgba(37,99,235,.2);border-radius:2px}

                .sx-fab{ will-change:transform; transition:transform .2s ease; transform: translateZ(0); }
                .sx-fab:hover{ transform:scale(1.05); }

                .sx-close{ transition:background .2s; }
                .sx-close:hover{ background:var(--sx-close-hover); }

                .sx-chip{ transition:background .2s; will-change:background; }
                .sx-chip:hover{ background:rgba(37,99,235,0.1)!important; }

                .sx-textarea{ transition:border-color .2s; overflow:hidden }
                .sx-textarea:focus{ border-color:rgba(37,99,235,0.5)!important; }

                .sx-send{ will-change:transform,opacity; transition:opacity .2s,transform .15s; }
                .sx-send:not(:disabled):hover{ transform:scale(1.05); }

                @media(max-width:768px){
                  .sx-win{width:340px!important;height:500px!important;}
                }

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
            `}</style>

            {/* FAB */}
            <button
                className="sx-fab"
                onClick={toggleOpen}
                style={{
                    position: "fixed", bottom: 28, right: 28, width: 60, height: 60, borderRadius: "50%",
                    background: t.fabBg,
                    border: `1.5px solid ${t.fabBorder}`,
                    boxShadow: t.fabShadow,
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 9999,
                }}
                aria-label="Chat"
            >
                {isOpen
                    ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                }
            </button>

            {/* Window */}
            {isOpen && (
                <div
                    className="sx-win"
                    style={{
                        position: "fixed", bottom: 100, right: 28, width: 370, height: 540,
                        background: t.window, border: `1px solid ${t.windowBorder}`,
                        borderRadius: 20, boxShadow: t.windowShadow,
                        display: "flex", flexDirection: "column", overflow: "hidden",
                        zIndex: 9998, transformOrigin: "bottom right",
                        transform: "translateZ(0)",
                        fontFamily: "'DM Sans',sans-serif",
                        "--sx-close-hover": t.closeHoverBg,
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: "16px 20px", background: t.header,
                        borderBottom: `1px solid ${t.headerBorder}`,
                        display: "flex", alignItems: "center", gap: 12,
                    }}>
                        <img src="/assets/X Logo.png" style={{
                            width: 38, height: 38, borderRadius: 12, flexShrink: 0,
                            background: "#2563eb",
                            objectFit: 'contain',
                            padding: 5,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            // fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: "#ffffff",
                        }} />

                        <div>
                            <div style={{ margin: 0, fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: t.titleColor }}>
                                StudioXenos Support
                            </div>
                            <div style={{ fontSize: 11, color: "#16a34a", display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                                <span style={{ width: 6, height: 6, background: "#16a34a", borderRadius: "50%", display: "inline-block" }} />
                                Online — replies instantly
                            </div>
                        </div>

                        <button
                            className="sx-close"
                            onClick={closeChat}
                            style={{
                                marginLeft: "auto", background: t.closeBg, border: "none",
                                color: t.closeColor, width: 28, height: 28, borderRadius: 8,
                                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="sx-msgs" style={{
                        flex: 1, overflowY: "auto", padding: 16,
                        display: "flex", flexDirection: "column", gap: 10,
                        background: t.msgsBg,
                    }}>
                        {displayMsgs.map((msg, i) => (
                            <MessageBubble key={i} msg={msg} t={t} />
                        ))}

                        {isLoading && <TypingDots t={t} />}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggestions */}
                    {showSuggestions && (
                        <div style={{
                            padding: "8px 16px 4px", display: "flex", flexWrap: "wrap", gap: 6,
                            background: t.msgsBg, borderTop: `1px solid ${t.headerBorder}`,
                        }}>
                            <SuggestionChips t={t} onPick={handleChipPick} />
                        </div>
                    )}

                    {/* Input */}
                    <div style={{
                        overflowY: "hidden",
                        padding: "12px 16px 16px", display: "flex", gap: 8, alignItems: "flex-end",
                        background: t.inputAreaBg, borderTop: `1px solid ${t.inputAreaBorder}`,
                    }}>
                        <textarea
                            ref={textareaRef}
                            className="sx-textarea"
                            placeholder="Ask us anything..."
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            rows={1}
                            style={{
                                flex: 1, background: t.textareaBg, border: `1px solid ${t.textareaBorder}`,
                                borderRadius: 12, padding: "10px 14px", color: t.textareaColor,
                                fontSize: 13, fontFamily: "'DM Sans',sans-serif",
                                resize: "none", outline: "none", maxHeight: 100, minHeight: 40,
                                lineHeight: 1.5,
                            }}
                        />
                        <button
                            className="sx-send"
                            onClick={handleSend}
                            disabled={sendDisabled}
                            style={{
                                width: 40, height: 40, borderRadius: 11,
                                background: t.userBubbleBg,
                                border: "none", cursor: sendDisabled ? "not-allowed" : "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0, opacity: sendDisabled ? 0.4 : 1,
                                boxShadow: "0 2px 8px rgba(37, 99, 235, 0.2)",
                            }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
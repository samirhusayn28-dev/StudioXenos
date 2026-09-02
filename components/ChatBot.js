'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import Image from "next/image";

const SYSTEM_PROMPT = `You are a warm, professional customer service guide for StudioXenos, a creative studio. 
Speak clearly and helpfully, avoiding heavy technical jargon. Use simple language.
Keep your responses short, concise, and structured (under 3-4 sentences or short bullet points maximum). 
Help users with questions about branding, getting a website, design services, or starting a project. 
If they ask about cost or custom details, invite them professionally to connect or send a message.`;

const initialSuggestions = [
    { label: "Overview of services", query: "What services do you provide?" },
    { label: "How to begin a project", query: "I have a project idea, how do I start?" },
    { label: "Pricing structure", query: "What is your typical pricing structure?" },
    { label: "Project timelines", query: "How long does a typical project take?" },
];

const WELCOME = "Hello and welcome to StudioXenos. I am here to assist you. How can we help bring your vision to life today?";

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
        windowShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
        fabBg: "#2563eb",
        fabBorder: "rgba(255, 255, 255, 0.2)",
        fabShadow: "0 4px 16px rgba(37, 99, 235, 0.3)",
        userBubbleBg: "#2563eb",
        userBubbleText: "#ffffff",
        chipBg: "rgba(37, 99, 235, 0.04)",
        chipBorder: "rgba(37, 99, 235, 0.1)",
        chipColor: "#2563eb",
    }
};

function formatMessageContent(text) {
    if (!text) return null;

    const lines = text.split('\n');
    return lines.map((line, lineIndex) => {
        const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
        const cleanLine = isBullet ? line.trim().replace(/^[-*]\s+/, '') : line;
        const parts = cleanLine.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);

        const renderedLine = parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={pIdx} style={{ fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
            }
            if (part.startsWith('*') && part.endsWith('*')) {
                return <em key={pIdx} style={{ fontStyle: 'italic' }}>{part.slice(1, -1)}</em>;
            }
            if (part.startsWith('`') && part.endsWith('`')) {
                return (
                    <span key={pIdx} style={{
                        background: 'rgba(37,99,235,0.08)', padding: '1px 5px',
                        borderRadius: 4, fontWeight: 600, color: '#2563eb'
                    }}>
                        {part.slice(1, -1)}
                    </span>
                );
            }
            return part;
        });

        if (isBullet) {
            return (
                <div key={lineIndex} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', margin: '4px 0' }}>
                    <span style={{ color: '#2563eb', fontWeight: 700 }}>•</span>
                    <div>{renderedLine}</div>
                </div>
            );
        }

        return (
            <span key={lineIndex} style={{ display: 'block', minHeight: line === '' ? '6px' : 'auto' }}>
                {renderedLine}
            </span>
        );
    });
}

const MessageBubble = memo(function MessageBubble({ msg, t }) {
    const style = useMemo(
        () =>
            msg.role === "user"
                ? {
                    maxWidth: "85%", padding: "10px 14px",
                    borderRadius: "12px 12px 2px 12px",
                    background: t.userBubbleBg,
                    color: t.userBubbleText, fontSize: 13.5, lineHeight: 1.5,
                    alignSelf: "flex-end", wordBreak: "break-word",
                    transform: "translateZ(0)",
                }
                : {
                    maxWidth: "85%", padding: "10px 14px",
                    borderRadius: "12px 12px 12px 2px",
                    background: t.assistantBg,
                    border: `1px solid ${t.assistantBorder}`,
                    color: t.assistantText, fontSize: 13.5, lineHeight: 1.5,
                    alignSelf: "flex-start", wordBreak: "break-word",
                    transform: "translateZ(0)",
                },
        [msg.role, t]
    );

    return <div style={style}>{formatMessageContent(msg.text)}</div>;
});

const TypingDots = memo(function TypingDots({ t }) {
    return (
        <div style={{
            display: "flex", gap: 4, alignItems: "center",
            padding: "10px 14px", background: t.assistantBg,
            border: `1px solid ${t.assistantBorder}`,
            borderRadius: "12px 12px 12px 2px",
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

function generateAISuggestions(history) {
    if (!history || history.length === 0) return initialSuggestions;

    const recentText = history.slice(-3).map(m => m.content.toLowerCase()).join(" ");

    if (recentText.includes("cost") || recentText.includes("price") || recentText.includes("budget") || recentText.includes("fee")) {
        return [
            { label: "Payment schedules", query: "Are payment schedules split into milestones?" },
            { label: "Request consultation", query: "How do we book a formal scoping call?" },
            { label: "Maintenance packages", query: "Do you offer ongoing support plans post-launch?" }
        ];
    }
    if (recentText.includes("start") || recentText.includes("begin") || recentText.includes("process") || recentText.includes("step")) {
        return [
            { label: "Onboarding form", query: "Where can I submit my project brief?" },
            { label: "Required assets", query: "What logos or brand guides do you need from me?" },
            { label: "Contract details", query: "What does your agreement process look like?" }
        ];
    }
    if (recentText.includes("service") || recentText.includes("design") || recentText.includes("web") || recentText.includes("brand")) {
        return [
            { label: "Branding guidelines", query: "Do you provide complete brand style guides?" },
            { label: "Platform expertise", query: "What technologies or platforms do you build with?" },
            { label: "Review portfolio", query: "Can you provide specific case studies?" }
        ];
    }
    if (recentText.includes("time") || recentText.includes("long") || recentText.includes("duration") || recentText.includes("schedule")) {
        return [
            { label: "Expedited delivery", query: "Can timelines be adjusted for strict deadlines?" },
            { label: "Client availability", query: "How much of my time is required during the build?" },
            { label: "Initiate project", query: "Let us move forward with scheduling the project." }
        ];
    }

    return [
        { label: "Explore specific options", query: "Can you elaborate on your custom options?" },
        { label: "Schedule discussion", query: "I would like to set up a direct discussion." },
        { label: "Review next phases", query: "What are the subsequent steps to engage?" }
    ];
}

const SuggestionChips = memo(function SuggestionChips({ t, onPick, suggestions }) {
    return (
        <>
            {suggestions.map((item, i) => (
                <button
                    key={i}
                    className="sx-chip"
                    onClick={() => onPick(item.query)}
                    style={{
                        background: t.chipBg,
                        border: `1px solid ${t.chipBorder}`,
                        color: t.chipColor, fontSize: 11,
                        padding: "4px 10px", borderRadius: 6,
                        cursor: "pointer", whiteSpace: "nowrap",
                        fontFamily: "var(--font-outfit), sans-serif",
                        fontWeight: 500,
                        maxWidth: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {item.label}
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
    const [currentSuggestions, setCurrentSuggestions] = useState(initialSuggestions);

    // Anti-Spam state tracking
    const [spamWarning, setSpamWarning] = useState("");
    const lastMessageTimeRef = useRef(0);
    const rapidAttemptsRef = useRef([]);

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

        // --- SPAM DEFENSE CHECK ---
        const now = Date.now();

        // 1. Rate Limit Cooldown (1.5 seconds)
        if (now - lastMessageTimeRef.current < 1500) {
            setSpamWarning("Please slow down before sending another message.");
            setTimeout(() => setSpamWarning(""), 3000);
            return;
        }

        // 2. Frequency Check (Max 4 messages per 5 seconds)
        const recentHistory = rapidAttemptsRef.current.filter(timestamp => now - timestamp < 5000);
        if (recentHistory.length >= 4) {
            setSpamWarning("Too many requests. Please wait 10 seconds.");
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setSpamWarning("");
                rapidAttemptsRef.current = [];
            }, 10000);
            return;
        }

        rapidAttemptsRef.current.push(now);
        lastMessageTimeRef.current = now;
        setSpamWarning("");
        // --------------------------

        setInput("");
        if (textareaRef.current) {
            textareaRef.current.style.height = "40px";
        }

        const newDisplay = [...displayMsgs, { role: "user", text: userText }];
        setDisplayMsgs(newDisplay);
        setIsLoading(true);

        const updatedHistory = [
            ...historyMsgs,
            { role: "user", content: userText },
        ];

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [
                        { role: "system", content: SYSTEM_PROMPT },
                        ...updatedHistory,
                    ],
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.error || "API error");
            }

            const reply = data?.reply || "An unexpected error occurred. Please try again.";

            const finalHistory = [
                ...updatedHistory,
                { role: "assistant", content: reply },
            ];

            setHistoryMsgs(finalHistory);
            setDisplayMsgs([...newDisplay, { role: "assistant", text: reply }]);
            setCurrentSuggestions(generateAISuggestions(finalHistory));

        } catch (err) {
            console.error("ChatBot error:", err);
            setDisplayMsgs([
                ...newDisplay,
                { role: "assistant", text: "A network connectivity issue occurred. Please try your request again." },
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

                .sx-chip{ transition:all .2s; will-change:background, transform; }
                .sx-chip:hover{ background:rgba(37,99,235,0.08)!important; transform:translateY(-1px); }

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
                    height:min(72vh,520px)!important;
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

            {/* FAB Button */}
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
                aria-label="Chat Support"
            >
                {isOpen
                    ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                    : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                }
            </button>

            {/* Chat Box Window */}
            {isOpen && (
                <div
                    className="sx-win"
                    style={{
                        position: "fixed", bottom: 100, right: 28, width: 380, height: 560,
                        background: t.window, border: `1px solid ${t.windowBorder}`,
                        borderRadius: 16, boxShadow: t.windowShadow,
                        display: "flex", flexDirection: "column", overflow: "hidden",
                        zIndex: 9998, transformOrigin: "bottom right",
                        transform: "translateZ(0)",
                        fontFamily: "var(--font-outfit), sans-serif",
                        "--sx-close-hover": t.closeHoverBg,
                    }}
                >
                    {/* Header */}
                    <div style={{
                        padding: "14px 18px", background: t.header,
                        borderBottom: `1px solid ${t.headerBorder}`,
                        display: "flex", alignItems: "center", gap: 12,
                    }}>
                        <Image
                            src="/assets/X Logo.png"
                            alt="StudioXenos Logo"
                            width={34}
                            height={34}
                            style={{
                                width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                                background: "#2563eb", objectFit: 'contain', padding: 5,
                            }}
                        />

                        <div>
                            <div style={{ margin: 0, fontFamily: "var(--font-syne), sans-serif", fontWeight: 700, fontSize: 13.5, color: t.titleColor }}>
                                StudioXenos Support
                            </div>
                            <div style={{ fontSize: 10.5, color: "#16a34a", display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                                <span style={{ width: 6, height: 6, background: "#16a34a", borderRadius: "50%", display: "inline-block" }} />
                                Online and ready
                            </div>
                        </div>

                        <button
                            className="sx-close"
                            onClick={closeChat}
                            style={{
                                marginLeft: "auto", background: t.closeBg, border: "none",
                                color: t.closeColor, width: 26, height: 26, borderRadius: 6,
                                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                            }}
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages Body */}
                    <div className="sx-msgs" style={{
                        flex: 1, overflowY: "auto", padding: 14,
                        display: "flex", flexDirection: "column", gap: 10,
                        background: t.msgsBg,
                    }}>
                        {displayMsgs.map((msg, i) => (
                            <MessageBubble key={i} msg={msg} t={t} />
                        ))}

                        {isLoading && <TypingDots t={t} />}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Spam Warning Prompt Banner */}
                    {spamWarning && (
                        <div style={{
                            background: "#fef2f2", color: "#dc2626", fontSize: 11.5,
                            padding: "6px 14px", textAlign: "center", borderTop: "1px solid #fee2e2",
                            fontWeight: 500,
                        }}>
                            {spamWarning}
                        </div>
                    )}

                    {/* Dynamic AI Contextual Suggestions Bar */}
                    <div style={{
                        padding: "6px 12px", display: "flex", flexWrap: "wrap", gap: 5,
                        background: t.msgsBg, borderTop: `1px solid ${t.headerBorder}`,
                        alignItems: "center",
                    }}>
                        <SuggestionChips t={t} onPick={handleChipPick} suggestions={currentSuggestions} />
                    </div>

                    {/* Input Bar */}
                    <div style={{
                        padding: "10px 14px 14px", display: "flex", gap: 8, alignItems: "flex-end",
                        background: t.inputAreaBg, borderTop: `1px solid ${t.inputAreaBorder}`,
                    }}>
                        <textarea
                            ref={textareaRef}
                            className="sx-textarea"
                            placeholder="Type your message here..."
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            rows={1}
                            style={{
                                flex: 1, background: t.textareaBg, border: `1px solid ${t.textareaBorder}`,
                                borderRadius: 10, padding: "9px 12px", color: t.textareaColor,
                                fontSize: 13, fontFamily: "var(--font-outfit), sans-serif",
                                resize: "none", outline: "none", maxHeight: 90, minHeight: 38,
                                lineHeight: 1.45,
                            }}
                        />
                        <button
                            className="sx-send"
                            onClick={handleSend}
                            disabled={sendDisabled}
                            style={{
                                width: 38, height: 38, borderRadius: 10,
                                background: t.userBubbleBg, border: "none",
                                cursor: sendDisabled ? "not-allowed" : "pointer",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0, opacity: sendDisabled ? 0.4 : 1,
                                boxShadow: "0 2px 8px rgba(37, 99, 235, 0.2)",
                            }}
                        >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
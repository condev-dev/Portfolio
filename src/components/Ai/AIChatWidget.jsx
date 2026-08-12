import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./index.css";

const API_URL = "https://ai-portfolio-backend-five.vercel.app/api/chat";

const SparkleIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 2.4l2.1 6.3 6.3 2.1-6.3 2.1L12 19.2l-2.1-6.3L3.6 10.8l6.3-2.1L12 2.4z"
      fill="currentColor"
    />
    <circle cx="18.8" cy="4.9" r="1.5" fill="currentColor" opacity="0.85" />
    <circle cx="5.2" cy="18.8" r="1.1" fill="currentColor" opacity="0.55" />
  </svg>
);

export default function AIChatWidget() {
  const { i18n, t } = useTranslation();
  const isFa = i18n.language === "fa";

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesRef = useRef(null);

  const suggestions = isFa
    ? [
        "چه مهارت‌هایی داری؟",
        "پروژه‌های شاخصت چیه؟",
        "چطور می‌تونم باهات در ارتباط باشم؟",
      ]
    : [
        "What are your skills?",
        "Tell me about your projects",
        "How can I contact you?",
      ];

  useEffect(() => {
    setMessages([{ role: "assistant", content: t("chat.initialMsg") }]);
  }, [i18n.language, t]);

  useEffect(() => {
    const el = messagesRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isLoading]);

  const handleSubmit = async (e, presetText) => {
    if (e) e.preventDefault();
    const content = presetText ?? input;
    if (!content.trim() || isLoading) return;

    const userMsg = { role: "user", content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          lang: i18n.language,
        }),
      });

      if (!response.ok) throw new Error("Network error");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMsg = { role: "assistant", content: "" };

      setMessages((prev) => [...prev, assistantMsg]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        assistantMsg.content += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...assistantMsg };
          return updated;
        });
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: t("chat.error") },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestion = (q) => handleSubmit(null, q);

  const isIntro = messages.length <= 1;

  return (
    <div className={`ai-chat-widget-container ${isFa ? "rtl" : "ltr"}`}>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="ai-chat-trigger-btn"
          aria-label="AI Chat"
        >
          <span className="ai-chat-trigger-halo" />
          <span className="ai-chat-orb-spark ai-chat-orb-spark--1" />
          <span className="ai-chat-orb-spark ai-chat-orb-spark--2" />
          <span className="ai-chat-orb-spark ai-chat-orb-spark--3" />
          <span className="ai-chat-trigger-spark">
            <SparkleIcon size={22} />
          </span>
        </button>
      )}

      {isOpen && (
        <div className="ai-chat-box" role="dialog" aria-label={t("chat.title")}>
          <div className="ai-chat-aurora ai-chat-aurora--gold" />
          <div className="ai-chat-aurora ai-chat-aurora--violet" />
          <div className="ai-chat-shine" />

          <div className="ai-chat-header">
            <div className="ai-chat-avatar">
              <SparkleIcon size={22} />
            </div>
            <div className="ai-chat-header-info">
              <span className="ai-chat-title">{t("chat.title")}</span>
              <span className="ai-chat-status">
                <span className="ai-chat-status-dot" />
                <span style={{ paddingTop: "3px" }}>
                  {isFa ? "آنلاین" : "Online"}
                </span>
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="ai-chat-close-btn"
              aria-label="Close"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div ref={messagesRef} className="ai-chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`ai-chat-msg ${msg.role}`}
                style={{ animationDelay: `${Math.min(index * 70, 420)}ms` }}
              >
                {msg.role === "assistant" && (
                  <div className="ai-chat-msg-avatar">
                    <SparkleIcon size={13} />
                  </div>
                )}
                <div className="ai-chat-bubble">{msg.content}</div>
              </div>
            ))}

            {isLoading && (
              <div className="ai-chat-msg assistant">
                <div className="ai-chat-msg-avatar">
                  <SparkleIcon size={13} />
                </div>
                <div
                  className="ai-chat-typing"
                  role="status"
                  aria-label={t("chat.loading")}
                >
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            {!isLoading && isIntro && (
              <div className="ai-chat-msg assistant">
                <div className="ai-chat-msg-avatar">
                  <SparkleIcon size={13} />
                </div>
                <div className="ai-chat-suggestions">
                  {suggestions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      className="ai-chat-suggestion-chip"
                      onClick={() => handleSuggestion(q)}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="ai-chat-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chat.placeholder")}
              className="ai-chat-input"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="ai-chat-submit-btn"
              aria-label={t("chat.send")}
            >
              <svg
                className={`ai-chat-send-icon${isFa ? " flip" : ""}`}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>

          <div className="ai-chat-footer">
            <span>{isFa ? "طراحی‌شده توسط" : "Crafted with "}</span>
            <span className="ai-chat-footer-brand"> Con Dev</span>
          </div>
        </div>
      )}
    </div>
  );
}

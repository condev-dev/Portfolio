import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";
import RichText from "./RichText";
import logoCondev from "../../assets/img/logo.webp";
import "./index.css";

const API_URL = "https://ai-portfolio-backend-five.vercel.app/api/chat";
const MOBILE_QUERY = "(max-width: 560px)";

const IconAssistantMark = ({ size = 26 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
    className="ai-chat-mark"
  >
    <defs>
      <linearGradient
        id="cdMarkGrad"
        x1="3"
        y1="3"
        x2="29"
        y2="29"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFEFC0" />
        <stop offset="0.5" stopColor="#FFC700" />
        <stop offset="1" stopColor="#FF9F00" />
      </linearGradient>
    </defs>

    <path
      d="M9.2 4.8h13.6a4.6 4.6 0 0 1 4.6 4.6v7.3a4.6 4.6 0 0 1-4.6 4.6h-6.1l-5.4 4.2a.9.9 0 0 1-1.45-.71V21.3H9.2a4.6 4.6 0 0 1-4.6-4.6V9.4a4.6 4.6 0 0 1 4.6-4.6Z"
      stroke="url(#cdMarkGrad)"
      strokeWidth="1.9"
      strokeLinejoin="round"
    />

    <path
      d="M16 8.4c.95 3.2 1.45 3.7 4.65 4.65-3.2.95-3.7 1.45-4.65 4.65-.95-3.2-1.45-3.7-4.65-4.65 3.2-.95 3.7-1.45 4.65-4.65Z"
      fill="url(#cdMarkGrad)"
    />

    <circle cx="22.1" cy="8.6" r="1.15" fill="url(#cdMarkGrad)" opacity="0.9" />
    <circle
      cx="10.3"
      cy="17.1"
      r="0.95"
      fill="url(#cdMarkGrad)"
      opacity="0.65"
    />
  </svg>
);

const IconSparkle = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M12 2.6c1.35 4.6 2.2 5.45 6.8 6.8-4.6 1.35-5.45 2.2-6.8 6.8-1.35-4.6-2.2-5.45-6.8-6.8 4.6-1.35 5.45-2.2 6.8-6.8Z"
      fill="currentColor"
    />
    <circle cx="18.6" cy="17.4" r="2.2" fill="currentColor" opacity="0.85" />
    <circle cx="6.4" cy="19.6" r="1.3" fill="currentColor" opacity="0.55" />
  </svg>
);

const IconClose = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M6 6l12 12M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const IconRefresh = ({ size = 15 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M20 11a8 8 0 10-1.9 6.3M20 5v6h-6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCopy = ({ size = 13 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="9"
      y="9"
      width="11"
      height="11"
      rx="2.5"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M5.5 15A2.5 2.5 0 013 12.5v-7A2.5 2.5 0 015.5 3h7A2.5 2.5 0 0115 5.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const IconCheck = ({ size = 13 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M4 12.5l5 5L20 6.5"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconSend = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

const IconStop = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <rect x="6" y="6" width="12" height="12" rx="2.5" />
  </svg>
);

export default function AIChatWidget() {
  const { i18n, t } = useTranslation();
  const isFa = i18n.language === "fa";

  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [showJump, setShowJump] = useState(false);

  const messagesRef = useRef(null);
  const inputRef = useRef(null);
  const triggerRef = useRef(null);
  const boxRef = useRef(null);
  const abortRef = useRef(null);
  const stickToBottomRef = useRef(true);
  const lastUserMsgRef = useRef("");

  const suggestions = useMemo(() => {
    const list = t("chat.suggestions", { returnObjects: true });
    return Array.isArray(list) ? list : [];
  }, [t]);

  useEffect(() => {
    setMessages([{ role: "assistant", content: t("chat.initialMsg") }]);
  }, [i18n.language, t]);

  const scrollToBottom = useCallback((behavior = "smooth") => {
    const el = messagesRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  const handleScroll = useCallback(() => {
    const el = messagesRef.current;
    if (!el) return;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    const atBottom = distance < 80;
    stickToBottomRef.current = atBottom;
    setShowJump(!atBottom && el.scrollHeight > el.clientHeight + 160);
  }, []);

  useEffect(() => {
    if (stickToBottomRef.current) scrollToBottom("auto");
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (!isOpen) return undefined;
    if (!window.matchMedia(MOBILE_QUERY).matches) return undefined;

    const { documentElement: html, body } = document;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const focusTimer = window.setTimeout(() => {
      if (!window.matchMedia(MOBILE_QUERY).matches) inputRef.current?.focus();
    }, 260);

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !boxRef.current) return;

      const focusables = boxRef.current.querySelectorAll(
        'button:not([disabled]), input, a[href], textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setHasOpened(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 60);
  }, []);

  const abortActiveRequest = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  }, []);

  useEffect(() => () => abortActiveRequest(), [abortActiveRequest]);
  useEffect(() => {
    abortActiveRequest();
    setIsLoading(false);
    setIsStreaming(false);
  }, [i18n.language, abortActiveRequest]);

  const sendMessage = useCallback(
    async (rawContent, { replaceLastError = false } = {}) => {
      const content = String(rawContent ?? "").trim();
      if (!content || isLoading) return;

      lastUserMsgRef.current = content;
      stickToBottomRef.current = true;

      const history = replaceLastError
        ? messages.filter((m) => !m.isError)
        : [...messages, { role: "user", content }];

      if (!replaceLastError) setInput("");
      setMessages(history);
      setIsLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            messages: history.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            lang: i18n.language,
          }),
        });

        if (!response.ok || !response.body) throw new Error("Network error");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let streamed = "";

        setIsStreaming(true);
        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          streamed += decoder.decode(value, { stream: true });

          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: "assistant",
              content: streamed,
            };
            return updated;
          });
        }

        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.role === "assistant" && !last.content.trim()) {
            return prev.slice(0, -1);
          }
          return prev;
        });
      } catch (error) {
        if (error?.name === "AbortError") {
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last && last.role === "assistant" && !last.content.trim()) {
              return prev.slice(0, -1);
            }
            return prev;
          });
        } else {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: t("chat.error"), isError: true },
          ]);
        }
      } finally {
        abortRef.current = null;
        setIsLoading(false);
        setIsStreaming(false);
      }
    },
    [messages, isLoading, i18n.language, t],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(input);
  };

  const handleRetry = () => {
    if (lastUserMsgRef.current) {
      sendMessage(lastUserMsgRef.current, { replaceLastError: true });
    }
  };

  const handleClear = () => {
    abortActiveRequest();
    setIsLoading(false);
    setIsStreaming(false);
    lastUserMsgRef.current = "";
    stickToBottomRef.current = true;
    setMessages([{ role: "assistant", content: t("chat.initialMsg") }]);
  };

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      window.setTimeout(() => setCopiedIndex(null), 1800);
    } catch {}
  };

  const isIntro = messages.length <= 1 && !isLoading;

  return (
    <div className={`ai-chat-widget-container ${isFa ? "rtl" : "ltr"}`}>
      {!isOpen && (
        <button
          ref={triggerRef}
          type="button"
          onClick={openChat}
          className="ai-chat-trigger-btn"
          aria-label={t("chat.open")}
        >
          {!hasOpened && (
            <span className="ai-chat-trigger-halo" aria-hidden="true" />
          )}

          <span className="ai-chat-trigger-ring" aria-hidden="true" />
          <span className="ai-chat-trigger-orbit" aria-hidden="true">
            <i />
          </span>

          <span className="ai-chat-trigger-mark">
            <IconAssistantMark size={27} />
          </span>

          <span className="ai-chat-trigger-dot" aria-hidden="true" />

          <span className="ai-chat-trigger-label" aria-hidden="true">
            {t("chat.open")}
          </span>
        </button>
      )}

      {isOpen && (
        <>
          <button
            type="button"
            className="ai-chat-scrim"
            aria-label={t("chat.close")}
            tabIndex={-1}
            onClick={closeChat}
          />

          <div
            ref={boxRef}
            className="ai-chat-box"
            role="dialog"
            aria-modal="true"
            aria-label={t("chat.title")}
          >
            <span
              className="ai-chat-aurora ai-chat-aurora--gold"
              aria-hidden="true"
            />
            <span
              className="ai-chat-aurora ai-chat-aurora--slate"
              aria-hidden="true"
            />

            <header className="ai-chat-header">
              <span className="ai-chat-avatar">
                <img
                  src={logoCondev}
                  alt={t("chat.avatarAlt")}
                  loading="lazy"
                />
              </span>

              <div className="ai-chat-header-info">
                <span className="ai-chat-title">{t("chat.title")}</span>
                <span className="ai-chat-status">
                  <span className="ai-chat-status-dot" aria-hidden="true" />
                  <span className="pt-1" >
                  {t("chat.online")}

                  </span>
                </span>
              </div>

              <div className="ai-chat-header-actions">
                <button
                  type="button"
                  onClick={handleClear}
                  className="ai-chat-icon-btn"
                  aria-label={t("chat.clear")}
                  title={t("chat.clear")}
                >
                  <IconRefresh />
                </button>
                <button
                  type="button"
                  onClick={closeChat}
                  className="ai-chat-icon-btn ai-chat-close-btn"
                  aria-label={t("chat.close")}
                  title={t("chat.close")}
                >
                  <IconClose />
                </button>
              </div>
            </header>

            <div
              ref={messagesRef}
              onScroll={handleScroll}
              className="ai-chat-messages"
              role="log"
              aria-live="polite"
              aria-relevant="additions text"
            >
              {messages.map((msg, index) => {
                const isAssistant = msg.role === "assistant";
                const isLast = index === messages.length - 1;
                const canCopy =
                  isAssistant && !msg.isError && msg.content.trim();
                const isLive = isAssistant && isLast && isStreaming;

                return (
                  <div
                    key={index}
                    className={`ai-chat-msg ${msg.role}${msg.isError ? " is-error" : ""}`}
                    style={{ animationDelay: `${Math.min(index * 55, 330)}ms` }}
                  >
                    {isAssistant && (
                      <span className="ai-chat-msg-avatar" aria-hidden="true">
                        <IconSparkle size={13} />
                      </span>
                    )}

                    <div className="ai-chat-bubble-wrap">
                      <div className="ai-chat-bubble">
                        {isAssistant ? (
                          <RichText streaming={isLive}>{msg.content}</RichText>
                        ) : (
                          msg.content
                        )}
                        {isLive && (
                          <span className="ai-chat-caret" aria-hidden="true" />
                        )}
                      </div>

                      <div className="ai-chat-msg-tools">
                        {canCopy && (
                          <button
                            type="button"
                            className="ai-chat-tool-btn"
                            onClick={() => handleCopy(msg.content, index)}
                            aria-label={t("chat.copy")}
                            title={
                              copiedIndex === index
                                ? t("chat.copied")
                                : t("chat.copy")
                            }
                          >
                            {copiedIndex === index ? (
                              <IconCheck />
                            ) : (
                              <IconCopy />
                            )}
                            <span>
                              {copiedIndex === index
                                ? t("chat.copied")
                                : t("chat.copy")}
                            </span>
                          </button>
                        )}

                        {msg.isError && isLast && (
                          <button
                            type="button"
                            className="ai-chat-tool-btn ai-chat-tool-btn--retry"
                            onClick={handleRetry}
                            aria-label={t("chat.retry")}
                          >
                            <IconRefresh size={13} />
                            <span>{t("chat.retry")}</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isLoading && !isStreaming && (
                <div className="ai-chat-msg assistant">
                  <span className="ai-chat-msg-avatar" aria-hidden="true">
                    <IconSparkle size={13} />
                  </span>
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

              {isIntro && suggestions.length > 0 && (
                <div
                  className="ai-chat-suggestions"
                  role="group"
                  aria-label={t("chat.suggestionsLabel")}
                >
                  {suggestions.map((question, index) => (
                    <button
                      key={question}
                      type="button"
                      className="ai-chat-suggestion-chip"
                      style={{ animationDelay: `${140 + index * 70}ms` }}
                      onClick={() => sendMessage(question)}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {showJump && (
              <button
                type="button"
                className="ai-chat-jump-btn"
                onClick={() => {
                  stickToBottomRef.current = true;
                  setShowJump(false);
                  scrollToBottom("smooth");
                }}
                aria-label={t("chat.send")}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 9l6 6 6-6"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}

            <form onSubmit={handleSubmit} className="ai-chat-form ">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={t("chat.placeholder")}
                className="ai-chat-input"
                aria-label={t("chat.placeholder")}
                autoComplete="off"
                enterKeyHint="send"
              />

              {isLoading ? (
                <button
                  type="button"
                  onClick={abortActiveRequest}
                  className="ai-chat-submit-btn ai-chat-submit-btn--stop"
                  aria-label={t("chat.stop")}
                  title={t("chat.stop")}
                >
                  <IconStop />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="ai-chat-submit-btn"
                  aria-label={t("chat.send")}
                  title={t("chat.send")}
                >
                  <span className={`ai-chat-send-icon${isFa ? " flip" : ""}`}>
                    <IconSend />
                  </span>
                </button>
              )}
            </form>
          </div>
        </>
      )}
    </div>
  );
}

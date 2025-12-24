import { useState, useRef, useEffect  } from "react";
import useDraggable from "../hooks/useDraggable"

function FloatingChat({ chatId }) {
  const [open, setOpen] = useState(false);

  const { position, onMouseDown, wasDragged  } = useDraggable({
    x: window.innerWidth - 80,
    y: window.innerHeight - 140,
  });

  const [aiMessages, setAiMessages] = useState([
    "어려운 단어나, 이해가 안되는 부분이 있다면 저에게 물어보세요!",
  ]);
  const [userMessages, setUserMessages] = useState([]);
  const [input, setInput] = useState("");
  const canSend =
  input.trim().length > 0 &&
  aiMessages.length > userMessages.length;

  /* 유저 전송 */
  const onSend = () => {
    if (!input.trim()) return;

        setUserMessages(prev => [...prev, input]);
        setInput("");

        // 나중에 여기에 AI 응답 추가
    };

  return (
    <>
      {/* Floating Button */}
      <div
        onMouseDown={onMouseDown}
        onClick={(e) => {
                if (wasDragged.current) {
                e.preventDefault();
                e.stopPropagation();
                return;
                }
                setOpen(prev => !prev);
                }}
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          width: 56,
          height: 56,
          borderRadius: "50%",
          backgroundColor: "var(--color-blue-400)",
          color: "#fff",
          fontSize: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "grab",
          zIndex: 10000,
          userSelect: "none",
        }}
      >
        💬
      </div>

      {/* Chat Window */}
      {open && (
        <div
          onMouseDown={onMouseDown}
          style={{
            position: "fixed",
            left: position.x - 360,
            top: position.y - 540,
            width: 420,
            height: 600,
            backgroundColor: "#fff",
            border: "1px solid var(--color-gray-200)",
            borderRadius: 16,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 20000,
          }}
        >
          {/* Header */}
          <div  
            style={{
              height: 56,
              backgroundColor: "var(--color-blue-400)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 16px",
              fontWeight: 600,
              cursor: "grab",
              fontSize: "18px"
            }}
          >
            <span>독서 도우미</span>
            <span
              onClick={() => setOpen(false)}
              style={{ cursor: "pointer" }}
            >
              ✕
            </span>
          </div>

          {/* Body */}
          <div
            style={{
              flex: 1,
              padding: 16,
              backgroundColor: "var(--color-gray-050)",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {aiMessages.map((aiMsg, idx) => (
              <div key={idx} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {/* AI */}
                <div
                  style={{
                    alignSelf: "flex-start",
                    backgroundColor: "var(--color-gray-200)",
                    padding: "10px 14px",
                    borderRadius: 14,
                    maxWidth: "75%",
                    fontSize: 18,
                    borderBottomLeftRadius: 5,
                  }}
                >
                  {aiMsg}
                </div>

                {/* USER (있을 때만) */}
                {userMessages[idx] && (
                  <div
                    style={{
                      alignSelf: "flex-end",
                      backgroundColor: "var(--color-blue-400)",
                      color: "#fff",
                      padding: "10px 14px",
                      borderRadius: 14,
                      maxWidth: "75%",
                      fontSize: 18,
                      borderBottomRightRadius: 5,
                    }}
                  >
                    {userMessages[idx]}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              height: 56,
              display: "flex",
              borderTop: "1px solid var(--color-gray-200)",
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSend()}
              placeholder="메시지를 입력하세요"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                padding: "0 14px",
                fontSize: 18,
              }}
            />
            <button
              onClick={onSend}
              disabled={canSend}
              style={{
                width: 56,
                border: "none",
                backgroundColor: canSend
                ? "var(--color-blue-300)"
                : "var(--color-gray-100)",
                color: canSend
                ? "#fff"
                : "var(--color-gray-300)",
                fontSize: 18,
                cursor: "pointer",
              }}
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default FloatingChat;

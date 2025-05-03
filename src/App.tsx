import { createSignal } from "solid-js";

function App() {
  const listening = createSignal(false);

  const transcript = createSignal("");

  const SpeechRecognition =
    //@ts-ignore
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = true;

  recognition.onstart = () => {
    listening[1](true);
  };

  recognition.onend = () => {
    listening[1](false);
  };

  recognition.onresult = (event: any) => {
    const _transcript = Array.from(event.results)
      .map((result: any) => result[0].transcript)
      .join("");
    transcript[1](_transcript);
  };

  return (
    <>
      <div class="cnt">
        <textarea readOnly value={transcript[0]()}></textarea>
        <button
          class={listening[0]() ? "active" : ""}
          onClick={() => {
            if (listening[0]()) {
              recognition.stop();
            } else {
              recognition.start();
            }
          }}
        >
          <span>
            <div class="light"></div> Listen
          </span>
        </button>
      </div>
    </>
  );
}

export default App;

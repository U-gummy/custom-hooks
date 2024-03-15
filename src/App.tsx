import { useToast } from "@u-gummy/use-toast";

function App() {
  const { toasts, showToast } = useToast();

  return (
    <>
      <button
        onClick={() => {
          showToast({
            title: "title입니다",
            type: "success",
            message: "이렇게 저렇게 되었습니다.",
          });
        }}
      >
        toast
      </button>
      <button
        onClick={() => {
          showToast({
            type: "success",
            message: "이렇게 111212 되었습니다.",
          });
        }}
      >
        toast
      </button>
      <button
        onClick={() => {
          showToast({
            type: "success",
            message: "이렇게 12122 되었습니다.",
          });
        }}
      >
        toast
      </button>
      {toasts &&
        toasts.map(({ title, message, id }) => (
          <div key={id}>
            {title} {message}
          </div>
        ))}
    </>
  );
}

export default App;

# Use Toast

### Install

`npm install @ugly/use-toast`

### Quick Start

```apache
import { ToastContextProvider } from "@ugly/use-toast";

export default function App({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastContextProvider>
      {children}
    </ToastContextProvider>
  );
}

```

```apache
import { useToast } from "@ugly/use-toast";

export default function UserRegisterPage() {
  const handleClick = () => {
    showToast({
      type: "error",
      title: "title",
      message: "meaasge"
    });
  }

  return (
    <button onClick={handleClick}>
      show toast
    </button>
  )
}

```

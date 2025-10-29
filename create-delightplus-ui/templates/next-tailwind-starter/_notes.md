# Understanding `"use client"` in Next.js

Next.js 14+ introduces **Server Components** and **Client Components**:

## Server Components (Default)
- Rendered on the **server**.
- Can fetch data directly from the server.
- **Cannot use React hooks** like `useState`, `useEffect`, `useRef`, or `createContext`.
- Ideal for static rendering and improving performance.

## Client Components
- Rendered in the **browser**.
- Can use React hooks and browser APIs.
- Handle user interactions like clicks or form input.

### `"use client"` Directive
- Place `"use client";` **at the very top** of a file to mark it as a Client Component.
- **Example:**

```tsx
"use client";

import { useState, useEffect } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component mounted");
  }, []);

  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}
```
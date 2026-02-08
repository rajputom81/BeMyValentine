# Understanding SPA Routing & Vercel 404 Errors

## The Problem: Why 404?

When you deploy a React Single Page Application (SPA) to Vercel (or Netlify, AWS S3, etc.), you might notice that:
1.  Clicking links *inside* the app works fine.
2.  **Refreshing** the page on a route like `/valentine` gives a **404 Not Found**.
3.  **Directly visiting** a link like `https://your-app.com/valentine` gives a **404 Not Found**.

### Root Cause: Server vs. Client Routing

-   **Client-Side Routing (React Router):**
    React loads *once* (`index.html`). JavaScript then takes over. When you click a link to `/valentine`, JavaScript intercepts the click, updates the URL in the browser bar, and renders the "Valentine" component *without* sending a request to the server. The server sees nothing.

-   **Server-Side Routing (Vercel):**
    When you refresh the page or visit a URL directly, the browser sends a request to the Vercel server for that specific file.
    -   Request: `GET /valentine`
    -   Server: "I don't have a file named 'valentine' in the public folder. I only have `index.html`, `favicon.svg`, etc."
    -   Result: **404 Not Found**.

## The Solution: Rewrites

To fix this, we need to tell the Vercel server:
> "If you receive a request for *any* path that doesn't match a real file (like an image or JS file), serve `index.html` instead."

Once `index.html` loads, React starts up, looks at the URL (`/valentine`), and renders the correct component.

### The Fix: `vercel.json`

Create a `vercel.json` file in the root of your project with this configuration:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

-   **`source`: `/(.*)`**: Matches *all* incoming routes.
-   **`destination`: `/index.html`**: Serves the main HTML file for all those routes.

## Warning Signs & Common Mistakes

### 1. Missing Rewrites
-   **Sign:** App works on `localhost` dev server but breaks on refresh in production.
-   **Why:** Vite's dev server handles these rewrites for you automatically. Production servers (Vercel, Nginx, Apache) are "dumb" and need explicit instructions.

### 2. HashRouter vs. BrowserRouter
-   **BrowserRouter (Best Practice):** Uses clean URLs (`/valentine`). Requires server configuration (rewrites).
-   **HashRouter (Alternative):** Uses hash URLs (`/#/valentine`). Works everywhere without server config because the part after `#` is never sent to the server. *Use this only if you can't configure the server (e.g., GitHub Pages).*

### 3. "Hard" Navigation
-   Using `<a href="/valentine">` instead of `<Link to="/valentine">`.
-   **Mistake:** This forces a browser refresh, triggering a server request.
-   **Fix:** Always use `Link` components for internal navigation to keep it a generic SPA transition.

## Testing Before Deploy
You can test this behavior locally by building your app and serving it:

1.  `npm run build`
2.  `npx serve -s dist` (The `-s` flag tells `serve` to rewrite 404s to index.html, simulating the Vercel fix).

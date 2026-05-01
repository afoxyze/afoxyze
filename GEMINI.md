# Portfolio Project Instructions

## Architectural Rules

- **STRICT BAN ON `useEffect`**: The `useEffect` hook is strictly prohibited in this project.
    - **Reasoning**: To prevent uncontrolled side effects and ensure clean, predictable state management.
    - **Alternatives**:
        - Use event handlers for side effects triggered by user actions.
        - Use Astro's server-side logic or client-side scripts for initial data fetching or DOM manipulation where appropriate.
        - Use Framer Motion's internal state for animations.
        - Use derived state (memoized values) for computations based on existing state.

- **CODE QUALITY STANDARDS**:
    - **Clean & Professional**: Write only the cleanest, most elegant, and professional code possible.
    - **DRY (Don't Repeat Yourself)**: Never duplicate logic; use proper abstractions and reusable utilities.
    - **No Redundancy or Dead Code**: Every line must be necessary. Strictly remove unused variables, functions, or dead/commented code immediately.
    - **Avoid Hardcoding**: Use variables, constants, or dynamic derivation. Never use "magic numbers" or hardcoded strings without a clear reason.
    - **Detail-Oriented**: Pay extreme attention to detail, clarity, and code beauty.

## Tech Stack
- **Framework**: Astro
- **Styling**: Tailwind CSS
- **Interactivity**: React (without `useEffect`) & Framer Motion
- **Deployment**: Cloudflare Pages

# Once UI

A simple and lightweight UI component library with a CLI tool for easy component integration.

## Installation

You don't need to install the package directly. Simply use npx to add components as needed:

```bash
npx once-ui@latest add <component-name>
```

## Available Components

- accordion
- button

## Usage

1. Add a component to your project:

```bash
npx once-ui@latest add accordion
```

2. Import and use the component:

```jsx
import { Accordion } from './once-ui/accordion';

function App() {
  return (
    <Accordion title="Click me">
      <p>Content goes here</p>
    </Accordion>
  );
}
```

## Component Documentation

### Accordion

Props:
- `title`: string - The header text
- `children`: ReactNode - The content to be shown/hidden
- `className`: string (optional) - Additional CSS classes

### Button

Props:
- `variant`: 'primary' | 'secondary' | 'outline' (default: 'primary')
- `size`: 'small' | 'medium' | 'large' (default: 'medium')
- All standard button HTML attributes

## License

MIT

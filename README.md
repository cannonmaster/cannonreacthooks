# Cannon React Hooks

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/@cannonui%2Freacthooks.svg)](https://badge.fury.io/js/@cannonui%2Freacthooks)

Cannon React Hooks is a collection of useful custom hooks for React applications. It provides a set of reusable hooks that solve common problems and enhance the functionality of your React components.

## Features

- **useDebounce**: A hook for debouncing the value of an input field.

And many more will be available soon!

## Installation

Install the package using npm:

```bash
npm install @cannonui/reacthooks
```

## Usage

Here's how you can use the hook from this library:

```typescript
import { useState } from "react";
import { useDebounce } from "@cannonui/reacthooks";

const TestUseDebounce = () => {
  const [inputValue, setInputValue] = useState("");

  const debouncedValue = useDebounce(inputValue, 1000);

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
      <p>Debounced value: {debouncedValue}</p>
    </div>
  );
};

export default TestUseDebounce;
```

## Contributing

Contributions are welcome! If you have any bug reports, feature requests, or suggestions, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

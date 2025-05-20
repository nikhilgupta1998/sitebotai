// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
});
const model = "gemini-2.5-flash-preview-04-17";
export async function googleChatAI(prompt: string) {
  const config = {
    responseMimeType: "text/plain",
  };
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let resultText = "";

  for await (const chunk of response) {
    resultText += chunk.text ?? "";
  }
  return resultText;
}

export async function GenAICode(prompt: string) {
  const config = {
    responseMimeType: "application/json", // Use "application/json" if you're sure the output will be pure JSON
  };

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `generate todo app Generate a Project in React. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, 
without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.
also you can use date-fns for date format and react-chartjs-2 chart, graph library

Return the response in JSON format with the following schema:
{
  "projectTitle": "",
  "explanation": "",
  "files": {
    "/App.js": {
      "code": ""
    },
    ...
  },
  "generatedFiles": []
}

Here’s the reformatted and improved version of your prompt:

Generate a programming code structure for a React project using Vite. Create multiple components, organizing them in separate folders with filenames using the .js extension, if needed. The output should use Tailwind CSS for styling, without any third-party dependencies or libraries, except for icons from the lucide-react library, which should only be used when necessary. Available icons include: Heart, Shield, Clock, Users, Play, Home, Search, Menu, User, Settings, Mail, Bell, Calendar, Star, Upload, Download, Trash, Edit, Plus, Minus, Check, X, and ArrowRight. For example, you can import an icon as import { Heart } from "lucide-react" and use it in JSX as <Heart className="" />.

Return the response in JSON format with the following schema:

json
Copy code
{
  "projectTitle": "",
  "explanation": "",
  "files": {
    "/App.js": {
      "code": ""
    },
    ...
  },
  "generatedFiles": []
}
Ensure the files field contains all created files, and the generatedFiles field lists all the filenames. Each file's code should be included in the code field, following this example:
files:{
  "/App.js": {
    "code": "import React from 'react';\\nimport './styles.css';\\nexport default function App() {\\n  return (\\n    <div className='p-4 bg-gray-100 text-center'>\\n      <h1 className='text-2xl font-bold text-blue-500'>Hello, Tailwind CSS with Sandpack!</h1>\\n      <p className='mt-2 text-gray-700'>This is a live code editor.</p>\\n    </div>\\n  );\\n}"
  }
}
  Additionally, include an explanation of the project's structure, purpose, and functionality in the explanation field. Make the response concise and clear in one paragraph.
  - When asked then only use this package to import, here are some packages available to import and use (date-fns,react-chartjs-2,"firebase","@google/generative-ai" ) only when it required
  
  - For placeholder images, please use a https://archive.org/download/placeholder-image/placeholder-image.jpg
  -Add Emoji icons whenever needed to give good user experinence
  - all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.

- By default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.

- Use icons from lucide-react for logos.

- Use stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.
   \``,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `The user wants a React Todo application code structure generated in JSON format.
The application should use:
- React with Vite.
- Multiple components organized in folders.
- Filenames with \`.js\` extension.
- Tailwind CSS for styling.
- \`lucide-react\` for icons (specifically \`Heart\`, \`Shield\`, \`Clock\`, \`Users\`, \`Play\`, \`Home\`, \`Search\`, \`Menu\`, \`User\`, \`Settings\`, \`Mail\`, \`Bell\`, \`Calendar\`, \`Star\`, \`Upload\`, \`Download\`, \`Trash\`, \`Edit\`, \`Plus\`, \`Minus\`, \`Check\`, \`X\`, and \`ArrowRight\`).
- \`date-fns\` for date formatting (only if needed).
- \`react-chartjs-2\` for charts/graphs (only if needed).
- No other third-party dependencies for UI/icons unless specified.
- Placeholder images from \`https://archive.org/download/placeholder-image/placeholder-image.jpg\`.
- Emoji icons for UX.
- Beautiful, fully featured, production-worthy design.
- Lucide icons for logos.
- Unsplash stock photos (link URLs) where appropriate.

The output must be a JSON object with the following structure:
\`\`\`json
{
  "projectTitle": "React Todo App",
  "explanation": "...",
  "files": {
    "/App.js": { "code": "..." },
    "/src/index.js": { "code": "..." },
    "/src/components/TodoList.js": { "code": "..." },
    "/src/components/TodoItem.js": { "code": "..." },
    "/src/components/AddTodoForm.js": { "code": "..." },
    "/src/context/TodoContext.js": { "code": "..." },
    "/src/hooks/useTodoState.js": { "code": "..." },
    "/src/styles/tailwind.css": { "code": "..." }, // Or similar structure if postcss/tailwind setup is needed
    "/postcss.config.js": { "code": "..." }, // Needed for Tailwind
    "/tailwind.config.js": { "code": "..." }, // Needed for Tailwind
    // Add other necessary files like index.html, vite.config.js if it's a Vite project
    "/index.html": { "code": "..." },
    "/vite.config.js": { "code": "..." },
  },
  "generatedFiles": [
    "/App.js",
    "/src/index.js",
    "/src/components/TodoList.js",
    "/src/components/TodoItem.js",
    "/src/components/AddTodoForm.js",
    "/src/context/TodoContext.js",
    "/src/hooks/useTodoState.js",
    "/src/styles/tailwind.css",
    "/postcss.config.js",
    "/tailwind.config.js",
    "/index.html",
    "/vite.config.js"
  ]
}
\`\`\`

Let's break down the requirements and plan the components and files:

1.  **Core Functionality:** Add, delete, toggle completion of todos. Maybe display count of active/completed todos.
2.  **State Management:** A simple React Context or a custom hook (\`useTodoState\`) would work well for passing todo state down.
3.  **Components:**
    *   \`App.js\`: Main container, likely holding the state and rendering other components.
    *   \`AddTodoForm.js\`: Input field and button to add new todos.
    *   \`TodoList.js\`: Container for rendering the list of \`TodoItem\` components.
    *   \`TodoItem.js\`: Displays a single todo, including text, completion status, edit button, delete button.
    *   Maybe a header/footer component? Let's keep it simple for now.
4.  **Styling:** Tailwind CSS. This requires setup files (\`tailwind.config.js\`, \`postcss.config.js\`) and including the directives in a CSS file.
5.  **Icons:** Use \`lucide-react\`. Need \`Plus\` for add, \`Trash\` for delete, \`Edit\` for edit (if implementing), \`Check\` for complete, \`X\` for incomplete or cancel edit.
6.  **Date Formatting:** \`date-fns\` isn't strictly necessary for a basic todo app unless we want to show creation/completion dates. Let's omit it for simplicity unless the user explicitly asks for date features.
7.  **Charts:** \`react-chartjs-2\` is not relevant for a basic todo app. Omit.
8.  **Firebase/Generative AI:** Not relevant for a basic todo app. Omit.
9.  **Placeholder Images/Unsplash:** Not relevant for a basic todo app unless we add user avatars or project images, which is out of scope for a basic todo app. Omit.
10. **Emoji Icons:** Can be used in buttons or status indicators (e.g., ✅, ❌).
11. **Structure:**
    *   \`src/\`
        *   \`App.js\`
        *   \`index.js\` (or \`main.jsx\` for Vite)
        *   \`components/\`
            *   \`AddTodoForm.js\`
            *   \`TodoList.js\`
            *   \`TodoItem.js\`
        *   \`context/\`
            *   \`TodoContext.js\`
        *   \`hooks/\`
            *   \`useTodoState.js\` (Optional, could put state logic in App or Context)
        *   \`styles/\`
            *   \`tailwind.css\`
    *   \`index.html\`
    *   \`vite.config.js\`
    *   \`tailwind.config.js\`
    *   \`postcss.config.js\`

Let's refine the structure and content:

*   **\`index.html\`**: Standard Vite entry point. Links the root JS file.
*   **\`vite.config.js\`**: Standard Vite config for React.
*   **\`tailwind.config.js\`**: Configure Tailwind to scan \`src\` files.
*   **\`postcss.config.js\`**: Add postcss-import and tailwindcss plugins.
*   **\`src/index.js\` (or \`main.jsx\`)**: Renders the \`App\` component.
*   **\`src/App.js\`**: The main application component. It will manage the overall todo state (an array of todo objects) and pass it down via context or props. It will render \`AddTodoForm\` and \`TodoList\`.
*   **\`src/context/TodoContext.js\`**: Creates a React Context to provide todos and dispatch/action functions (\`addTodo\`, \`deleteTodo\`, \`toggleTodo\`, \`editTodo\`).
*   **\`src/components/AddTodoForm.js\`**: A form with an input and a button. Uses \`useState\` for input value. Dispatches an 'add' action via context.
*   **\`src/components/TodoList.js\`**: Receives todos from context. Maps over the todos array and renders \`TodoItem\` for each todo.
*   **\`src/components/TodoItem.js\`**: Receives a single todo object and dispatch function. Displays todo text, a checkbox/button for completion, and buttons for edit/delete. Uses Lucide icons. Manages its own editing state (\`isEditing\`, input value).
*   **\`src/styles/tailwind.css\`**: Includes the Tailwind directives (\`@tailwind base;\`, \`@tailwind components;\`, \`@tailwind utilities;\`).

Let's consider the design aspect. Make it visually appealing with Tailwind classes. Use subtle shadows, rounded corners, appropriate padding/margins.

**JSON Structure Population:**

*   \`projectTitle\`: "Beautiful React Todo App"
*   \`explanation\`: A concise paragraph explaining the structure and features.
*   \`files\`: Object containing path-to-code mapping for all planned files.
*   \`generatedFiles\`: Array of all file paths used as keys in the \`files\` object.

Let's start coding the files.

**\`index.html\`**
Standard Vite template.

**\`vite.config.js\`**
Standard Vite config with React plugin.

**\`tailwind.config.js\`**
Configure \`content\` to include \`src/**/*.{js,jsx,ts,tsx}\`.

**\`postcss.config.js\`**
Add \`tailwindcss\` and \`autoprefixer\` (autoprefixer is good practice though not strictly required by the prompt's minimal deps list, but needed for Tailwind). Let's stick strictly to the prompt and only include \`tailwindcss\`.

**\`src/styles/tailwind.css\`**
Include the base, components, and utilities directives.

**\`src/index.js\`**
Basic React DOM render.

**\`src/context/TodoContext.js\`**
Create context, maybe a provider component that manages the state using \`useReducer\` or \`useState\`. \`useReducer\` is better for state with multiple transitions (add, delete, toggle, edit).

**\`src/App.js\`**
Wrap the main content with \`TodoProvider\`.

**\`src/components/AddTodoForm.js\`**
Input and button. Use \`useState\` for input value. Call \`addTodo\` from context on submit. Use \`Plus\` icon on the button.

**\`src/components/TodoList.js\`**
Get todos from context. Map and render \`TodoItem\`. Add a message if no todos.

**\`src/components/TodoItem.js\`**
Display todo text. Button/icon for toggle completion (\`Check\` or \`X\` or just styled text/div). Buttons for edit (\`Edit\` icon) and delete (\`Trash\` icon). Implement local editing state.

Let's make sure the design is "beautiful". Use calming background colors, subtle borders, nice spacing, distinct button styles (primary, danger).

Example styling ideas:
- App background: Soft gray or light blue.
- Todo container: White or light card with shadow.
- Todo item: Border bottom, padding, flexbox for layout.
- Completed todo: Strikethrough text, perhaps lighter color.
- Buttons: Rounded, colored backgrounds (e.g., blue for add, green for check, red for delete, gray for edit). Hover effects. Icons inside buttons.
- Form: Input with border, button next to it.

Let's write the code for each file, keeping the styling in mind.

**Refinement on Context/State:**
A \`useReducer\` hook is ideal for managing the array of todos. The state shape would be \`[{ id: ..., text: ..., completed: ... }, ...]\`. The reducer would handle actions like 'ADD', 'DELETE', 'TOGGLE', 'EDIT'. The Context will provide the state and the \`dispatch\` function.

**Icons to use:**
- \`AddTodoForm\`: \`Plus\` for the add button.
- \`TodoItem\`: \`Check\` for complete, \`X\` for incomplete (or just style based on state), \`Edit\` for edit button, \`Trash\` for delete button.

Let's structure the \`files\` object and then fill in the \`code\` for each.

\`\`\`json
{
  "projectTitle": "Beautiful React Todo App",
  "explanation": "This project is a simple yet beautifully designed Todo application built with React and Vite. It leverages Tailwind CSS for responsive and clean styling, and uses lucide-react for modern icons. The application structure includes separate components for managing the todo list, individual todo items, and the form for adding new todos. State management is handled locally within the main component or via Context for passing data down, allowing users to add, delete, and toggle the completion status of their tasks with a smooth user experience.",
  "files": {
    "/index.html": {
      "code": "<!DOCTYPE html>\\n<html lang=\\"en\\">\\n  <head>\\n    <meta charset=\\"UTF-8\\" />\\n    <link rel=\\"icon\\" type=\\"image/svg+xml\\" href=\\"/vite.svg\\" />\\n    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />\\n    <title>Vite + React Todo</title>\\n  </head>\\n  <body>\\n    <div id=\\"root\\"></div>\\n    <script type=\\"module\\" src=\\"/src/index.js\\"></script>\\n  </body>\\n</html>"
    },
    "/vite.config.js": {
      "code": "import { defineConfig } from 'vite'\\nimport react from '@vitejs/plugin-react'\\n\\n// https://vitejs.dev/config/\\nexport default defineConfig({\\n  plugins: [react()],\\n})"
    },
    "/tailwind.config.js": {
      "code": "/** @type {import('tailwindcss').Config} */\\nexport default {\\n  content: [\\n    \\"./index.html\\",\\n    \\"./src/**/*.{js,ts,jsx,tsx}\\",\\n  ],\\n  theme: {\\n    extend: {},\\n  },\\n  plugins: [],\\n}"
    },
    "/postcss.config.js": {
      "code": "export default {\\n  plugins: {\\n    tailwindcss: {},\\n  },\\n}"
    },
    "/src/index.js": {
      "code": "import React from 'react';\\nimport ReactDOM from 'react-dom/client';\\nimport App from './App.js';\\nimport './styles/tailwind.css'; // Import Tailwind CSS\\n\\nReactDOM.createRoot(document.getElementById('root')).render(\\n  <React.StrictMode>\\n    <App />\\n  </React.StrictMode>\\n);"
    },
    "/src/styles/tailwind.css": {
      "code": "@tailwind base;\\n@tailwind components;\\n@tailwind utilities;"
    },
    "/src/App.js": {
      "code": "import React, { useReducer, useEffect } from 'react';\\nimport AddTodoForm from './components/AddTodoForm.js';\\nimport TodoList from './components/TodoList.js';\\nimport { TodoProvider } from './context/TodoContext.js';\\n\\n// Reducer function to handle todo actions\\nconst todoReducer = (state, action) => {\\n  switch (action.type) {\\n    case 'ADD':\\n      return [\\n        ...state,\\n        { id: Date.now(), text: action.payload, completed: false }\\n      ];\\n    case 'DELETE':\\n      return state.filter(todo => todo.id !== action.payload);\\n    case 'TOGGLE':\\n      return state.map(todo =>\\n        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo\\n      );\\n    case 'EDIT':\\n        return state.map(todo =>\\n            todo.id === action.payload.id ? { ...todo, text: action.payload.newText } : todo\\n        );\\n    default:\\n      return state;\\n  }\\n};\\n\\nfunction App() {\\n  // Initialize state from localStorage or use an empty array\\n  const [todos, dispatch] = useReducer(todoReducer, [], (initialState) => {\\n    try {\\n      const storedTodos = localStorage.getItem('todos');\\n      return storedTodos ? JSON.parse(storedTodos) : initialState;\\n    } catch (error) {\\n      console.error(\\"Could not load todos from localStorage\\", error);\\n      return initialState;\\n    }\\n  });\\n\\n  // Save state to localStorage whenever todos change\\n  useEffect(() => {\\n    try {\\n      localStorage.setItem('todos', JSON.stringify(todos));\\n    } catch (error) {\\n      console.error(\\"Could not save todos to localStorage\\", error);\\n    }\\n  }, [todos]);\\n\\n  return (\\n    <TodoProvider value={{ todos, dispatch }}>\\n      <div className=\\"min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8\\">\\n        <div className=\\"container mx-auto bg-white rounded-xl shadow-2xl p-6 md:p-10 max-w-md\\">\\n          <h1 className=\\"text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-8\\">Awesome Todo App ✨</h1>\\n          <AddTodoForm />\\n          <TodoList />\\n        </div>\\n      </div>\\n    </TodoProvider>\\n  );\\n}\\n\\nexport default App;"
    },
    "/src/context/TodoContext.js": {
        "code": "import { createContext, useContext } from 'react';\\n\\nconst TodoContext = createContext();\\n\\nexport const useTodoContext = () => useContext(TodoContext);\\n\\nexport const TodoProvider = TodoContext.Provider;"
    },
    "/src/components/AddTodoForm.js": {
        "code": "import React, { useState } from 'react';\\nimport { Plus } from 'lucide-react';\\nimport { useTodoContext } from '../context/TodoContext.js';\\n\\nfunction AddTodoForm() {\\n  const [input, setInput] = useState('');\\n  const { dispatch } = useTodoContext();\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    if (input.trim()) {\\n      dispatch({ type: 'ADD', payload: input.trim() });\\n      setInput('');\\n    }\\n  };\\n\\n  return (\\n    <form onSubmit={handleSubmit} className=\\"flex gap-2 mb-8\\">\\n      <input\\n        type=\\"text\\"\\n        value={input}\\n        onChange={(e) => setInput(e.target.value)}\\n        placeholder=\\"What needs to be done? 🤔\\"\\n        className=\\"flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400\\"\\n      />\\n      <button\\n        type=\\"submit\\"\\n        className=\\"bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out flex items-center justify-center\\"\\n        aria-label=\\"Add todo\\"\\n      >\\n        <Plus className=\\"w-6 h-6\\" />\\n      </button>\\n    </form>\\n  );\\n}\\n\\nexport default AddTodoForm;"
    },
    "/src/components/TodoList.js": {
        "code": "import React from 'react';\\nimport TodoItem from './TodoItem.js';\\nimport { useTodoContext } from '../context/TodoContext.js';\\n\\nfunction TodoList() {\\n  const { todos } = useTodoContext();\\n\\n  if (todos.length === 0) {\\n    return (\\n      <p className=\\"text-center text-gray-500 text-lg\\">No todos yet! Add some above ⬆️</p>\\n    );\\n  }\\n\\n  return (\\n    <ul className=\\"space-y-3\\">\\n      {todos.map(todo => (\\n        <TodoItem key={todo.id} todo={todo} />\\n      ))}\\n    </ul>\\n  );\\n}\\n\\nexport default TodoList;"
    },
    "/src/components/TodoItem.js": {
        "code": "import React, { useState } from 'react';\\nimport { Trash, Edit, Check, X } from 'lucide-react';\\nimport { useTodoContext } from '../context/TodoContext.js';\\n\\nfunction TodoItem({ todo }) {\\n  const [isEditing, setIsEditing] = useState(false);\\n  const [newText, setNewText] = useState(todo.text);\\n  const { dispatch } = useTodoContext();\\n\\n  const handleDelete = () => {\\n    dispatch({ type: 'DELETE', payload: todo.id });\\n  };\\n\\n  const handleToggle = () => {\\n    dispatch({ type: 'TOGGLE', payload: todo.id });\\n  };\\n\\n  const handleEdit = () => {\\n    if (isEditing && newText.trim() && newText !== todo.text) {\\n      dispatch({ type: 'EDIT', payload: { id: todo.id, newText: newText.trim() } });\\n    }\\n    setIsEditing(!isEditing);\\n    setNewText(todo.text); // Reset text if canceling edit\\n  };\\n\\n  const handleKeyDown = (e) => {\\n      if (e.key === 'Enter') {\\n          handleEdit();\\n      } else if (e.key === 'Escape') {\\n          setIsEditing(false);\\n          setNewText(todo.text); // Revert to original text\\n      }\\n  }\\n\\n  return (\\n    <li className={\`flex items-center justify-between p-4 bg-gray-50 rounded-md shadow-sm transition duration-200 ease-in-out \`}>\\n      <div className=\\"flex items-center flex-grow mr-4\\">\\n        <input\\n          type=\\"checkbox\\"\\n          checked={todo.completed}\\n          onChange={handleToggle}\\n          className=\\"form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 transition duration-150 ease-in-out cursor-pointer\\"\\n        />\\n        {isEditing ? (\\n          <input\\n            type=\\"text\\"\\n            value={newText}\\n            onChange={(e) => setNewText(e.target.value)}\\n            onBlur={handleEdit} // Auto-save on blur\\n            onKeyDown={handleKeyDown}\\n            className=\\"ml-3 flex-grow p-1 border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400\\"\\n            autoFocus\\n          />\\n        ) : (\\n          <span className={\`ml-3 text-lg break-words\`}>\\n            {todo.text}\\n          </span>\\n        )}\\n      </div>\\n\\n      <div className=\\"flex-shrink-0 flex items-center gap-2\\">\\n        {isEditing ? (\\n           <button\\n            onClick={handleEdit}\\n            className=\\"p-2 rounded-full text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 ease-in-out\\"\\n            aria-label={newText.trim() ? \\"Save edit\\" : \\"Cancel edit\\"}\\n           >\\n             {newText.trim() ? <Check className=\\"w-5 h-5\\" /> : <X className=\\"w-5 h-5\\" />}\\n           </button>\\n        ) : (\\n          <button\\n            onClick={() => setIsEditing(true)}\\n            className=\\"p-2 rounded-full text-gray-600 hover:text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200 ease-in-out\\"\\n            aria-label=\\"Edit todo\\"\\n          >\\n            <Edit className=\\"w-5 h-5\\" />\\n          </button>\\n        )}\\n        <button\\n          onClick={handleDelete}\\n          className=\\"p-2 rounded-full text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 ease-in-out\\"\\n          aria-label=\\"Delete todo\\"\\n        >\\n          <Trash className=\\"w-5 h-5\\" />\\n        </button>\\n      </div>\\n    </li>\\n  );\\n}\\n\\nexport default TodoItem;"
    }
  },
  "generatedFiles": [
    "/index.html",
    "/vite.config.js",
    "/tailwind.config.js",
    "/postcss.config.js",
    "/src/index.js",
    "/src/styles/tailwind.css",
    "/src/App.js",
    "/src/context/TodoContext.js",
    "/src/components/AddTodoForm.js",
    "/src/components/TodoList.js",
    "/src/components/TodoItem.js"
  ]
}
\`\`\`

Reviewing the requirements:
- React project with Vite: Yes.
- Multiple components, separate folders, \`.js\` extension: Yes (\`components\`, \`context\`).
- Tailwind CSS: Yes, included config and CSS file.
- No other third-party deps except \`lucide-react\`, \`date-fns\`, \`react-chartjs-2\`: Only \`lucide-react\` is used as needed (\`Plus\`, \`Trash\`, \`Edit\`, \`Check\`, \`X\`). No \`date-fns\` or \`react-chartjs-2\` needed for basic todo.
- JSON format with schema: Yes.
- \`projectTitle\`, \`explanation\`, \`files\`, \`generatedFiles\`: Yes.
- File code included: Yes.
- \`generatedFiles\` list matches \`files\` keys: Yes.
- Explanation concise one paragraph: Yes.
- Placeholder image: Not used, not relevant to a basic todo item itself.
- Emoji icons: Added ✨ in title, 🤔 in placeholder, ⬆️ in empty message.
- Beautiful design: Used Tailwind classes for gradients, shadows, rounded corners, distinct button styles, hover effects, appropriate spacing. Aesthetically pleasing.
- Production worthy: Basic functionality covered, uses standard hooks/context, local storage persistence added for better UX.
- Lucide for logos: Not applicable, no specific logo design requested, just a title.
- Unsplash links: Not applicable, no place for photos in this basic todo app structure.

Local storage persistence is a good addition for a "production-worthy" feel, so I'll add that using \`useEffect\` and \`useReducer\`'s third argument for lazy initialization.

The \`TodoItem\` editing logic needs careful handling:
- On click \`Edit\`, set \`isEditing(true)\`.
- Render input field when \`isEditing\` is true.
- Input \`onBlur\` should trigger save.
- Input \`onKeyDown\` for Enter (save) and Escape (cancel).
- The "Save" button should show \`Check\` icon, "Cancel" could show \`X\` icon or the \`Edit\` button could toggle text/icon based on \`isEditing\`. Let's make the button change to save/cancel.

Updated \`TodoItem.js\` to handle edit save/cancel logic and icon changes based on \`isEditing\` and input state.

The \`handleEdit\` function now toggles \`isEditing\`. When \`isEditing\` becomes \`false\` (after clicking the Save button or blurring the input), it checks if the text changed and is not empty before dispatching 'EDIT'. If the text is empty, it might be better to cancel the edit or even delete the todo, but for now, let's just prevent saving empty text. Added \`handleKeyDown\` for Enter/Escape.

Final check on the JSON structure and content before generating the output. Looks good.`,
        },
        {
          text: `\`\`\`json
{
  "projectTitle": "Beautiful React Todo App",
  "explanation": "This project is a simple yet beautifully designed Todo application built with React and Vite. It leverages Tailwind CSS for responsive and clean styling, and uses lucide-react for modern icons. The application structure includes separate components for managing the todo list, individual todo items, and the form for adding new todos. State management is handled using React's useReducer hook within the main App component, and state is passed down via Context. Todos are persisted in the browser's local storage, allowing users to add, delete, toggle completion, and edit tasks with a smooth and persistent user experience.",
  "files": {
    "/index.html": {
      "code": "<!DOCTYPE html>\\n<html lang=\\"en\\">\\n  <head>\\n    <meta charset=\\"UTF-8\\" />\\n    <link rel=\\"icon\\" type=\\"image/svg+xml\\" href=\\"/vite.svg\\" />\\n    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />\\n    <title>Vite + React Todo</title>\\n  </head>\\n  <body>\\n    <div id=\\"root\\"></div>\\n    <script type=\\"module\\" src=\\"/src/index.js\\"></script>\\n  </body>\\n</html>"
    },
    "/vite.config.js": {
      "code": "import { defineConfig } from 'vite'\\nimport react from '@vitejs/plugin-react'\\n\\n// https://vitejs.dev/config/\\nexport default defineConfig({\\n  plugins: [react()],\\n})"
    },
    "/tailwind.config.js": {
      "code": "/** @type {import('tailwindcss').Config} */\\nexport default {\\n  content: [\\n    \\"./index.html\\",\\n    \\"./src/**/*.{js,ts,jsx,tsx}\\",\\n  ],\\n  theme: {\\n    extend: {},\\n  },\\n  plugins: [],\\n}"
    },
    "/postcss.config.js": {
      "code": "export default {\\n  plugins: {\\n    tailwindcss: {},\\n  },\\n}"
    },
    "/src/index.js": {
      "code": "import React from 'react';\\nimport ReactDOM from 'react-dom/client';\\nimport App from './App.js';\\nimport './styles/tailwind.css'; // Import Tailwind CSS\\n\\nReactDOM.createRoot(document.getElementById('root')).render(\\n  <React.StrictMode>\\n    <App />\\n  </React.StrictMode>\\n);"
    },
    "/src/styles/tailwind.css": {
      "code": "@tailwind base;\\n@tailwind components;\\n@tailwind utilities;"
    },
    "/src/App.js": {
      "code": "import React, { useReducer, useEffect } from 'react';\\nimport AddTodoForm from './components/AddTodoForm.js';\\nimport TodoList from './components/TodoList.js';\\nimport { TodoProvider } from './context/TodoContext.js';\\n\\n// Reducer function to handle todo actions\\nconst todoReducer = (state, action) => {\\n  switch (action.type) {\\n    case 'ADD':\\n      return [\\n        ...state,\\n        { id: Date.now(), text: action.payload, completed: false }\\n      ];\\n    case 'DELETE':\\n      return state.filter(todo => todo.id !== action.payload);\\n    case 'TOGGLE':\\n      return state.map(todo =>\\n        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo\\n      );\\n    case 'EDIT':\\n        return state.map(todo =>\\n            todo.id === action.payload.id ? { ...todo, text: action.payload.newText } : todo\\n        );\\n    default:\\n      return state;\\n  }\\n};\\n\\n// Lazy initializer for useReducer to load from localStorage\\nconst loadTodos = (initialState) => {\\n  try {\\n    const storedTodos = localStorage.getItem('todos');\\n    return storedTodos ? JSON.parse(storedTodos) : initialState;\\n  } catch (error) {\\n    console.error(\\"Could not load todos from localStorage\\", error);\\n    return initialState;\\n  }\\n};\\n\\nfunction App() {\\n  const [todos, dispatch] = useReducer(todoReducer, [], loadTodos);\\n\\n  // Effect to save state to localStorage whenever todos change\\n  useEffect(() => {\\n    try {\\n      localStorage.setItem('todos', JSON.stringify(todos));\\n    } catch (error) {\\n      console.error(\\"Could not save todos to localStorage\\", error);\\n    }\\n  }, [todos]);\\n\\n  return (\\n    <TodoProvider value={{ todos, dispatch }}>\\n      <div className=\\"min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-4 md:p-8 flex items-start justify-center\\">\\n        <div className=\\"w-full max-w-md bg-white rounded-xl shadow-2xl p-6 md:p-8\\">\\n          <h1 className=\\"text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-8\\">Awesome Todo App ✨</h1>\\n          <AddTodoForm />\\n          <TodoList />\\n        </div>\\n      </div>\\n    </TodoProvider>\\n  );\\n}\\n\\nexport default App;"
    },
    "/src/context/TodoContext.js": {
        "code": "import { createContext, useContext } from 'react';\\n\\nconst TodoContext = createContext();\\n\\nexport const useTodoContext = () => useContext(TodoContext);\\n\\nexport const TodoProvider = TodoContext.Provider;"
    },
    "/src/components/AddTodoForm.js": {
        "code": "import React, { useState } from 'react';\\nimport { Plus } from 'lucide-react';\\nimport { useTodoContext } from '../context/TodoContext.js';\\n\\nfunction AddTodoForm() {\\n  const [input, setInput] = useState('');\\n  const { dispatch } = useTodoContext();\\n\\n  const handleSubmit = (e) => {\\n    e.preventDefault();\\n    if (input.trim()) {\\n      dispatch({ type: 'ADD', payload: input.trim() });\\n      setInput('');\\n    }\\n  };\\n\\n  return (\\n    <form onSubmit={handleSubmit} className=\\"flex gap-2 mb-8\\">\\n      <input\\n        type=\\"text\\"\\n        value={input}\\n        onChange={(e) => setInput(e.target.value)}\\n        placeholder=\\"What needs to be done? 🤔\\"\\n        className=\\"flex-grow p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out\\"\\n        aria-label=\\"New todo text\\"\\n      />\\n      <button\\n        type=\\"submit\\"\\n        className=\\"bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 ease-in-out flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed\\"\\n        aria-label=\\"Add todo\\"\\n        disabled={!input.trim()}\\n      >\\n        <Plus className=\\"w-6 h-6\\" />\\n      </button>\\n    </form>\\n  );\\n}\\n\\nexport default AddTodoForm;"
    },
    "/src/components/TodoList.js": {
        "code": "import React from 'react';\\nimport TodoItem from './TodoItem.js';\\nimport { useTodoContext } from '../context/TodoContext.js';\\n\\nfunction TodoList() {\\n  const { todos } = useTodoContext();\\n\\n  if (todos.length === 0) {\\n    return (\\n      <p className=\\"text-center text-gray-500 text-lg py-4\\">No todos yet! Add some above ⬆️</p>\\n    );\\n  }\\n\\n  return (\\n    <ul className=\\"space-y-3\\">\\n      {todos.map(todo => (\\n        <TodoItem key={todo.id} todo={todo} />\\n      ))}\\n    </ul>\\n  );\\n}\\n\\nexport default TodoList;"
    },
    "/src/components/TodoItem.js": {
        "code": "import React, { useState } from 'react';\\nimport { Trash, Edit, Check, X } from 'lucide-react';\\nimport { useTodoContext } from '../context/TodoContext.js';\\n\\nfunction TodoItem({ todo }) {\\n  const [isEditing, setIsEditing] = useState(false);\\n  const [newText, setNewText] = useState(todo.text);\\n  const { dispatch } = useTodoContext();\\n\\n  const handleDelete = () => {\\n    // Optional: Add a confirmation dialog here\\n    dispatch({ type: 'DELETE', payload: todo.id });\\n  };\\n\\n  const handleToggle = () => {\\n    dispatch({ type: 'TOGGLE', payload: todo.id });\\n  };\\n\\n  const handleSaveEdit = () => {\\n    if (newText.trim() && newText.trim() !== todo.text) {\\n      dispatch({ type: 'EDIT', payload: { id: todo.id, newText: newText.trim() } });\\n    }\\n    setIsEditing(false);\\n  };\\n\\n  const handleCancelEdit = () => {\\n    setIsEditing(false);\\n    setNewText(todo.text); // Revert to original text\\n  };\\n\\n  const handleKeyDown = (e) => {\\n      if (e.key === 'Enter') {\\n          handleSaveEdit();\\n      } else if (e.key === 'Escape') {\\n          handleCancelEdit();\\n      }\\n  }\\n\\n  return (\\n    <li className={\`flex items-center justify-between p-4 bg-gray-50 rounded-md shadow-sm transition duration-200 ease-in-out \`}>\\n      <div className=\\"flex items-center flex-grow mr-4\\">\\n        {/* Checkbox */}\\n        <input\\n          type=\\"checkbox\\"\\n          checked={todo.completed}\\n          onChange={handleToggle}\\n          className=\\"form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 transition duration-150 ease-in-out cursor-pointer\\"\\n          aria-label={\`Mark todo as \`}\\n        />\\n\\n        {/* Todo Text or Edit Input */}\\n        {isEditing ? (\\n          <input\\n            type=\\"text\\"\\n            value={newText}\\n            onChange={(e) => setNewText(e.target.value)}\\n            onBlur={handleSaveEdit} // Auto-save on blur\\n            onKeyDown={handleKeyDown}\\n            className=\\"ml-3 flex-grow p-1 border border-blue-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-400\\"\\n            autoFocus\\n            aria-label=\\"Edit todo text\\"\\n          />\\n        ) : (\\n          <span\\n            className={\`ml-3 text-lg break-words cursor-pointer flex-grow\`}\\n            onClick={handleToggle} // Toggle completion by clicking text\\n          >\\n            {todo.text}\\n          </span>\\n        )}\\n      </div>\\n\\n      {/* Action Buttons */}\\n      <div className=\\"flex-shrink-0 flex items-center gap-2\\">\\n        {isEditing ? (\\n           <button\\n            onClick={handleSaveEdit}\\n            className=\\"p-2 rounded-full text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed\\"\\n            aria-label=\\"Save edit\\"\\n            disabled={!newText.trim()}\\n           >\\n             <Check className=\\"w-5 h-5\\" />\\n           </button>\\n        ) : (\\n          <button\\n            onClick={() => setIsEditing(true)}\\n            className=\\"p-2 rounded-full text-gray-600 hover:text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200 ease-in-out\\"\\n            aria-label=\\"Edit todo\\"\\n          >\\n            <Edit className=\\"w-5 h-5\\" />\\n          </button>\\n        )}\\n         {isEditing && (\\n             <button\\n                onClick={handleCancelEdit}\\n                className=\\"p-2 rounded-full text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200 ease-in-out\\"\\n                aria-label=\\"Cancel edit\\"\\n             >\\n                <X className=\\"w-5 h-5\\" />\\n             </button>\\n         )}\\n\\n        <button\\n          onClick={handleDelete}\\n          className=\\"p-2 rounded-full text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200 ease-in-out\\"\\n          aria-label=\\"Delete todo\\"\\n        >\\n          <Trash className=\\"w-5 h-5\\" />\\n        </button>\\n      </div>\\n    </li>\\n  );\\n}\\n\\nexport default TodoItem;"
    }
  },
  "generatedFiles": [
    "/index.html",
    "/vite.config.js",
    "/tailwind.config.js",
    "/postcss.config.js",
    "/src/index.js",
    "/src/styles/tailwind.css",
    "/src/App.js",
    "/src/context/TodoContext.js",
    "/src/components/AddTodoForm.js",
    "/src/components/TodoList.js",
    "/src/components/TodoItem.js"
  ]
}
\`\`\``,
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });

  let resultCode = "";
  for await (const chunk of response) {
    resultCode += chunk.text ?? "";
  }

  return resultCode;
}

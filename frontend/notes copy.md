Create new react app:

    npm create vite@latest

    clear app.css, index.css


Install tailwind css:
    npm install tailwindcss @tailwindcss/vite


Correction step (if Tailwind classes are not applying):
        In vite.config.js add:

        import { defineConfig } from 'vite'
        import react from '@vitejs/plugin-react'
        import tailwindcss from '@tailwindcss/vite'

        export default defineConfig({
            plugins: [react(), tailwindcss()],
        })

        Also keep this in src/index.css:
        @import "tailwindcss";

        Then restart dev server:
        npm run dev

React-Hook:
    Install:
        npm install react-hook-form

    Import:
        import {useForm} from "react-hook-form"
    
    Returns:
        Object
        usage: const {register,handleSubmit} =useForm()

    Register() function:

    
    Component Side Effects:

        A component can render initially before displaying content.
        
        If the component is about to make an api request it should wait untill the initial rendering is completed.

        If both initial rendering and api request happen together, it leads to unexpected bugs in the application.

        No dependency array - run after every render
            useEffect(()=>{side effect})

        Empty array [] - runs once on mount
            useEffect(()=>{side effect},[])

        With dependencies - 
            useEffect(()=>{side Effect},[dependency])
    

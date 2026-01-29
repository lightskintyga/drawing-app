import { useRef, useState } from "react";
import type { Tool } from "@/types";
import { Toolbar, Canvas } from "@/components";
import './App.css';


function App() {
    const [tool, setTool] = useState<Tool>('brush')
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    const clearCanvas = () => {
        const ctx = ctxRef.current;
        if (!ctx)
            return;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }

    return (
        <div style={{ width: 600 }}>
            <Toolbar
                tool={tool}
                setTool={setTool}
                clearCanvas={clearCanvas}
            />
            <Canvas
                tool={tool}
                onReady={(ctx) => (ctxRef.current = ctx)}
            />
        </div>
    )
}

export default App

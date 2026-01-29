import type { Tool } from "@/types";
import { useEffect, useRef } from "react";

interface CanvasProps {
    tool: Tool;
    onReady: (ctx: CanvasRenderingContext2D) => void;
}

export const Canvas = ({ tool, onReady }: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const isDrawing = useRef<boolean>(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas)
            return;

        const ctx = canvas.getContext('2d');
        if (!ctx)
            return;

        onReady(ctx);

        ctx.lineWidth = 5;
        ctx.lineCap = 'round';

        const startDrow = (e: MouseEvent) => {
            isDrawing.current = true;
            ctx.beginPath();
            ctx.moveTo(e.offsetX, e.offsetY);
        };

        const draw = (e: MouseEvent) => {
            if (!isDrawing.current)
                return;

            if (tool === 'eraser') {
                ctx.globalCompositeOperation = 'destination-out';
            } else {
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = '#000';
            }

            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        };

        const stopDraw = () => {
            isDrawing.current = false;
            ctx.closePath();
        };

        canvas.addEventListener('mousedown', startDrow);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDraw);
        canvas.addEventListener('mouseleave', stopDraw);

        return () => {
            canvas.removeEventListener('mousedown', startDrow);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('mouseup', stopDraw);
            canvas.removeEventListener('mouseleave', stopDraw);
        }
    }, [tool]);

    return (
        <canvas
            ref={canvasRef}
            width={600}
            height={400}
            style={{ border: '1px solid #ccc' }}
        />
    );
};
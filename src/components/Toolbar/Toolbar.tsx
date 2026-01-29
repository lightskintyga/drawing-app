import type { Tool } from "@/types";
import styles from "./Toolbar.module.css";

interface ToolbarProps {
    tool: Tool;
    setTool: (tool: Tool) => void;
    clearCanvas: () => void;
}

export const Toolbar = ({ tool, setTool, clearCanvas }: ToolbarProps) => {
    return (
        <div className={styles.toolbar}>
            <div className={styles.tools}>
                <button
                    className={`${styles.button} ${tool === 'brush' ? styles.active : ''}`}
                    onClick={() => setTool('brush')}
                >
                    🖌 Кисть
                </button>
                <button
                    className={`${styles.button} ${tool === 'eraser' ? styles.active : ''}`}
                    onClick={() => setTool('eraser')}
                >
                    🧽 Ластик
                </button>
            </div>
            <button
                className={`${styles.button} ${styles.clear}`}
                onClick={clearCanvas}
            >
                🗑 Стереть всё
            </button>
        </div>
    );
};
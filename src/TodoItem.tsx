import type { Todo } from "./App.tsx"
import { X, AlertTriangle, Minus, ArrowDown } from "lucide-react";

type Props = {
    todo: Todo,
    onToggle: (id: string) => void,
    onDelete: (id: string) => void
}

const priorityConfig = {
    Urgente: { icon: AlertTriangle, badge: "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400", dot: "bg-red-500" },
    Moyenne: { icon: Minus, badge: "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400", dot: "bg-amber-500" },
    Basse: { icon: ArrowDown, badge: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400", dot: "bg-emerald-500" },
}

function TodoItem({todo, onDelete, onToggle}: Props) {
    const config = priorityConfig[todo.priority];
    const Icon = config.icon;

    return (
        <div className={`group flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all ${
            todo.done
                ? "bg-slate-50/50 dark:bg-slate-800/30 border-slate-100 dark:border-slate-800"
                : "bg-white dark:bg-slate-800/80 border-slate-100 dark:border-slate-700/50 hover:border-slate-200 dark:hover:border-slate-600 hover:shadow-md hover:shadow-slate-100 dark:hover:shadow-black/10"
        }`}>
            <label className="relative flex items-center cursor-pointer shrink-0">
                <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => onToggle(todo.id)}
                    className="peer absolute opacity-0 w-0 h-0"
                />
                <span className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all ${
                    todo.done
                        ? "bg-linear-to-br from-indigo-500 to-violet-500 border-transparent"
                        : "border-slate-300 dark:border-slate-600 peer-hover:border-violet-400"
                }`}>
                    {todo.done && <span className="text-white text-[10px] font-bold leading-none">✓</span>}
                </span>
            </label>

            <span className={`flex-1 text-sm leading-snug transition-all ${
                todo.done
                    ? "line-through text-slate-400 dark:text-slate-600"
                    : "text-slate-700 dark:text-slate-200"
            }`}>
                {todo.titre}
            </span>

            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[0.65rem] font-semibold uppercase tracking-wider shrink-0 ${config.badge}`}>
                <Icon size={10} />
                {todo.priority}
            </span>

            <button
                onClick={() => onDelete(todo.id)}
                aria-label="Supprimer"
                className="shrink-0 w-7 h-7 flex items-center justify-center bg-transparent text-slate-300 dark:text-slate-600 rounded-lg cursor-pointer transition-all opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400"
            >
                <X size={14} />
            </button>
        </div>
    );
}

export default TodoItem;

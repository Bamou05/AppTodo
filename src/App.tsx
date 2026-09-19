import './App.css'
import {useState, useEffect} from "react";
import TodoItem from "./TodoItem";
import { AlertTriangle, Minus, ArrowDown, Plus, ClipboardList, ListFilter } from "lucide-react";


export  type Priority = "Urgente" | "Moyenne" | "Basse"
export type Todo = {
    id: string;
    titre: string;
    priority: Priority;
    done: boolean;
}

const priorityOptions = [
    { value: "Urgente" as Priority, icon: AlertTriangle, label: "Urgente",
      active: "bg-red-50 border-red-500 text-red-600 dark:bg-red-950/60 dark:border-red-400 dark:text-red-400",
      ring: "ring-red-200 dark:ring-red-500/20" },
    { value: "Moyenne" as Priority, icon: Minus, label: "Moyenne",
      active: "bg-amber-50 border-amber-500 text-amber-600 dark:bg-amber-950/60 dark:border-amber-400 dark:text-amber-400",
      ring: "ring-amber-200 dark:ring-amber-500/20" },
    { value: "Basse" as Priority, icon: ArrowDown, label: "Basse",
      active: "bg-emerald-50 border-emerald-500 text-emerald-600 dark:bg-emerald-950/60 dark:border-emerald-400 dark:text-emerald-400",
      ring: "ring-emerald-200 dark:ring-emerald-500/20" },
];

function App() {
    const [input, setInput] = useState("");
    const [priority, setPriority] = useState<Priority>("Moyenne");
    const [todos, setTodos] = useState<Todo[]>(() => {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    });
    const [filter, setFilter] = useState<Priority | "Tous">("Tous");

    function addTodo() {
        if (input.trim() === "") return;
        const newTodo: Todo = { id: Date.now().toString(), titre: input.trim(), priority, done: false };
        setTodos([...todos, newTodo]);
        setInput("");
        setPriority("Moyenne");
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const filteredTodos = filter === "Tous" ? todos : todos.filter((t) => t.priority === filter);

    function toggleTodo(id: string) {
        setTodos(todos.map((t) => t.id === id ? { ...t, done: !t.done } : t));
    }

    function deleteTodo(id: string) {
        setTodos(todos.filter((t) => t.id !== id));
    }

    const doneCount = todos.filter(t => t.done).length;
    const progress = todos.length > 0 ? (doneCount / todos.length) * 100 : 0;

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-violet-50/40 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-12 px-4 sm:px-6">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <header className="mb-10 text-center">
                    <div className="inline-flex items-center gap-3 mb-3 px-4 py-1.5 rounded-full bg-indigo-100/60 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-medium tracking-wide uppercase">
                        <ClipboardList size={14} />
                        Todo App
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-extrabold bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 dark:from-indigo-400 dark:via-violet-400 dark:to-purple-400 bg-clip-text text-transparent leading-tight">
                        Mes Tâches
                    </h1>
                    <p className="mt-3 text-slate-400 dark:text-slate-500 text-base">
                        {todos.length === 0
                            ? "Commencez par ajouter votre première tâche"
                            : `${doneCount} sur ${todos.length} terminée${doneCount > 1 ? 's' : ''}`
                        }
                    </p>
                    {todos.length > 0 && (
                        <div className="mt-5 mx-auto max-w-xs">
                            <div className="h-2 bg-slate-200/70 dark:bg-slate-700/50 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-linear-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5">{Math.round(progress)}% complété</p>
                        </div>
                    )}
                </header>

                {/* Card principale */}
                <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 rounded-3xl shadow-xl shadow-slate-200/40 dark:shadow-black/20 p-6 sm:p-8">
                    {/* Formulaire */}
                    <div className="flex flex-col gap-3 mb-6">
                        <div className="flex gap-2.5">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addTodo()}
                                placeholder="Qu'avez-vous à faire ?"
                                className="flex-1 px-4 py-3.5 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm bg-white dark:bg-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none transition-all focus:border-violet-400 dark:focus:border-violet-500 focus:ring-4 focus:ring-violet-100 dark:focus:ring-violet-500/10"
                            />
                            <button
                                onClick={addTodo}
                                className="px-5 py-3.5 bg-linear-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-2xl text-sm font-semibold cursor-pointer transition-all whitespace-nowrap flex items-center gap-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                <Plus size={18} strokeWidth={2.5} />
                                <span className="hidden sm:inline">Ajouter</span>
                            </button>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium self-center mr-1">Priorité :</span>
                            {priorityOptions.map((p) => {
                                const Icon = p.icon;
                                const isActive = priority === p.value;
                                return (
                                    <button
                                        key={p.value}
                                        type="button"
                                        onClick={() => setPriority(p.value)}
                                        className={`flex items-center gap-1.5 px-3 py-1.5 border-2 rounded-xl text-xs font-medium cursor-pointer transition-all whitespace-nowrap ${
                                            isActive
                                                ? `${p.active} ring-2 ${p.ring}`
                                                : "border-slate-200 dark:border-slate-700 bg-transparent text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600"
                                        }`}
                                    >
                                        <Icon size={14} />
                                        {p.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Séparateur + Filtres */}
                    <div className="flex items-center gap-3 mb-5 pb-5 border-b border-slate-100 dark:border-slate-800">
                        <ListFilter size={14} className="text-slate-400 dark:text-slate-500" />
                        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Filtrer :</span>
                        <div className="flex gap-1.5">
                            {(["Tous", "Urgente", "Moyenne", "Basse"] as const).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                                        filter === f
                                            ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/25"
                                            : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                        {todos.length > 0 && (
                            <span className="ml-auto text-xs text-slate-300 dark:text-slate-600 tabular-nums">
                                {filteredTodos.length} tâche{filteredTodos.length > 1 ? 's' : ''}
                            </span>
                        )}
                    </div>

                    {/* Liste */}
                    <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                        {filteredTodos.length === 0 && (
                            <li className="text-center py-16 flex flex-col items-center gap-3">
                                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                    <ClipboardList size={28} className="text-slate-300 dark:text-slate-600" />
                                </div>
                                <p className="text-slate-400 dark:text-slate-500 text-sm">
                                    {todos.length === 0 ? "Votre liste est vide" : "Aucun résultat pour ce filtre"}
                                </p>
                            </li>
                        )}
                        {filteredTodos.map((todo) => (
                            <li key={todo.id} className="animate-[slideIn_0.25s_ease-out]">
                                <TodoItem todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="text-center text-xs text-slate-300 dark:text-slate-700 mt-6">
                    Appuyez sur Entrée pour ajouter rapidement
                </p>
            </div>
        </div>
    )
}

export default App

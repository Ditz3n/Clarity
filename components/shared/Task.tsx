import { ChangeTask } from "./ChangeTask"
import { TaskType } from "../../types/taskType"
import { EditTask } from "./EditTask"
import { DeleteTask } from "./DeleteTask"

export const Task = ({ task } : { task: TaskType }) => {

  const taskStyle = {
    textDecoration: task.isCompleted === true ? "line-through" : "none",
    color: task.isCompleted === true ? "gray" : "black",
    opacity: task.isCompleted === true ? 0.5 : 1
  }

  return (
    <div style={taskStyle} className="w-full flex justify-between items-center bg-white py-3 px-20 rounded-2xl shadow-md">
      <ChangeTask task={task} />
      <span className="text-black text-lg font-bold uppercase">
        {task.title}
      </span>
      <div className="flex items-center gap-5">
        <EditTask task={task} />
        <DeleteTask task={task} />
      </div>
    </div>
  )
}

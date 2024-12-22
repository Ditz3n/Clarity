import { ChangeTask } from "./ChangeTask"

export const Task = ({task}) => {

  const taskStyle = {
    textDecoration: task.isCompleted === true ? "line-through" : "none",
    color: task.isCompleted === true ? "green" : "red"
  }

  return (
    <div style={taskStyle} className="width-full flex justify-between items-center bg-blue p-3 px-20 rounded-2xl shadow-md">
      <ChangeTask task={task} />
      <span className="text-black text-lg font-bold uppercase">
        {task.title}
      </span>
    </div>
  )
}

import { Form } from "../ui/Form"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { updateTask } from "../../lib/database/taskActions"
import { AiOutlineCheckCircle } from "react-icons/ai"
import { TaskType } from "../../types/taskType" // Adjust the import path as necessary


export const ChangeTask = ({ task } : { task : TaskType }) => {

  return (
    <Form action={updateTask}>
        <Input 
            name="inputId"
            type="hidden"
            value={task.id}
            onChange={() => {}}
            placeholder=""
        />
        <Button 
            actionButton
            type="submit"
            text={<AiOutlineCheckCircle />}
        />
    </Form>
  )
}

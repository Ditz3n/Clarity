"use client";

import { deleteTask } from "../../app/actions/taskActions";
import { Form } from "../ui/Form";
import { Button} from "../ui/Button";
import { TaskType } from "../../types/taskType";
import { Input } from "../ui/Input";
import { BsFillTrashFill } from "react-icons/bs";


export const DeleteTask = ({ task } : { task: TaskType }) => {
    return (
        <Form action={deleteTask}>
            <input
                name="inputId"
                type="hidden"
                value={task.id}
            />
            <Button
                actionButton
                type="submit"
                text={<BsFillTrashFill />}
            />
        </Form>
    )
};
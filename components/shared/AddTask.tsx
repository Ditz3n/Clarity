import { Form } from "../ui/Form";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { createFormData } from "../../src/app/actions/taskActions";
import { FaPlus } from "react-icons/fa";

export const AddTask = () => {
  return (
    <Form className="w-1/2 m-auto" action={createFormData}>
      <div className="flex">
        <Input 
          name="input"
          type="text"
          placeholder="Add a new todo..."
        />
        <Button 
          type="submit"
          text={<FaPlus />}
        />
      </div>
    </Form>
  );
}
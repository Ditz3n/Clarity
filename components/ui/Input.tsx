interface InputProps {
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
}

export const Input = ({name, type, placeholder, value}: InputProps) => {
  return (
    <>
      <input
        className="border w-full border-gray-300 rounded-md p-2"
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
      />
    </>
  )
}

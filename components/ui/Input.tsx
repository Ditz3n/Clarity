interface InputProps {
  name: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({ name, type, placeholder, value, onChange }: InputProps) => {
  return (
    <input
      className="border w-full border-gray-300 bg-white p-2 rounded-md dark:bg-[#272727] dark:border-[#202020] dark:text-white shadow-md"
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange} // Forward onChange to the input
    />
  );
};

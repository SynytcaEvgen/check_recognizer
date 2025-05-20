import './selectModel.css'
interface SelectModelProps {
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}
export function SelectModel({ handleChange, value }: SelectModelProps) {
  return (
    <div className='select-wrapper'>
      <label>
        Current LLM model:
      </label>
      <select
        value={value}
        onChange={handleChange}
        name="model"
        id="model">
        <option value="gemini_15_pro">Gemini 1.5pro(Google)</option>
        <option value="gpt_4o">GPT-4o(Microsoft Azure Service)</option>
      </select>
    </div>
  );
}

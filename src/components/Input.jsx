export default function Input({ label, value, onChange, type = 'text' }) {
    return (
      <div className="mb-4">
        <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
    );
  }
  
interface ContadorProps {
  count: number | string;
  active?: boolean;
}

export function Contador({ count, active }: ContadorProps) {
  return (
    <span
      className={`ml-1 px-2 py-0.5 text-xs font-semibold rounded-full ${
        active
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-700'
      }`}
    >
      {count}
    </span>
  );
}

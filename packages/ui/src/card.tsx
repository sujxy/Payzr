interface CardProps {
  title: string;
  children: React.ReactNode;
}

export function Card({ title, children }: CardProps): JSX.Element {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md  flex flex-col h-fit gap-2">
      <h2 className="text-lg border-b pb-2 text-gray-600 text-left font-bold ">
        {title}
      </h2>
      <div className="flex flex-col justify-evenly gap-1">{children}</div>
    </div>
  );
}

import Link from "next/link";

interface DosesCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
}

export default function DosesCard({
  id,
  title,
  description,
  category,
}: DosesCardProps) {
  return (
    <Link href={`/p/doses/${id}`}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg dark:hover:shadow-gray-700 transition-shadow cursor-pointer h-full">
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {category}
        </span>
        <h3 className="text-xl font-semibold mt-2 mb-3 text-gray-800 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </Link>
  );
}

interface TagProps {
  tag: string;
}

export default async function Tag({ tag }: TagProps) {

  if(!tag) return null;

  return (
    <span
      className="whitespace-nowrap bg-primary-black font-bold leading-none text-primary-white px-2 py-1">
      {tag}
    </span>
  );
}
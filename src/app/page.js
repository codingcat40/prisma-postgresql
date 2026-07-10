import Image from "next/image";

export default function Home() {
  const posts = [
    {
      id: 1,
      title: "First post title",
      description: "First Post description"
    },
    {
      id: 2,
      title: "Second post title",
      description: "Second Post description"
    },
    {
      id: 3,
      title: "Third post title",
      description: "Third Post description"
    },
    {
      id: 4,
      title: "Fouth post title",
      description: "Fourth Post description"
    },
    {
      id: 5,
      title: "Fifth post title",
      description: "Fifth Post description"
    },
  ]
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      
    </div>
  );
}

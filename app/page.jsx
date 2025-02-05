import Feed from "@/components/Feed";

export default function Home() {
  return (
    <>
      <section className="flex flex-center flex-col">
        <h1 className=" mt-20 text-5xl font-extrabold leading-[1.15] text-gray-200 sm:text-6xl text-center">
          Add & Manage Your Notes
          <br className="max-md:hidden" />
        </h1>
        <p className="mt-8 text-lg text-gray-400 sm:text-xl text-center">
          Stay organized and productive. <br /> A minimal notes app to add and
          manage your notes easily. <br /> Capture ideas, track tasks, and keep
          everything in one place!
        </p>
        <Feed />
      </section>
    </>
  );
}

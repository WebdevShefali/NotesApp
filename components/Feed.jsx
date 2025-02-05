"use client";

import NoteCard from "./NoteCard";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const NoteCardList = ({ data, setAllNotes }) => {
  return (
    <div className="mt-16 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
      {data.map((post) => (
        <NoteCard
          key={post._id}
          post={post}
          setAllNotes={setAllNotes}
          data={data}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const { data: session } = useSession();
  const [allNotes, setAllNotes] = useState([]);
  const fetchNotes = async () => {
    const response = await fetch("/api/note");
    const data = await response.json();
    setAllNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <section className="mt-16 mx-auto w-full max-w-xl flex justify-center items-center flex-col gap-2">
      {session?.user ? (
        <NoteCardList data={allNotes} setAllNotes={setAllNotes} />
      ) : (
        <p className="mt-5 text-lg text-gray-400 sm:text-xl text-center">
          Please signin to create and view your notes!
        </p>
      )}
    </section>
  );
};
export default Feed;

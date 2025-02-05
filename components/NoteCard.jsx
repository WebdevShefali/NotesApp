"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NoteCard = ({ post, setAllNotes }) => {
  const router = useRouter();
  const [copied, setCopied] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (post) => {
    router.push(`/update-note?id=${post._id}`);
  };

  const handleDelete = async () => {
    setShowModal(false);

    try {
      await fetch(`/api/note/${post._id.toString()}`, {
        method: "DELETE",
      });

      setAllNotes((prevNotes) =>
        prevNotes.filter((item) => item._id !== post._id)
      );
    } catch (error) {}
  };

  const handleCopy = () => {
    setCopied(post.note);
    navigator.clipboard.writeText(post.note);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <>
      <div className="flex-1 break-inside-avoid rounded-lg border border-gray-500 bg-transparent bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit">
        <div className="flex justify-between items-start gap-5">
          <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
            <div className="flex flex-col">
              <h3 className="font-satoshi font-semibold text-gray-200">
                #{post.tag}
              </h3>
            </div>
          </div>
          <div
            className="w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer"
            onClick={handleCopy}
          >
            <Image
              src={
                copied === post.note
                  ? "/assets/icons/tick.svg"
                  : "/assets/icons/copy.svg"
              }
              alt={copied === post.note ? "tick_icon" : "copy_icon"}
              width={16}
              height={16}
            />
          </div>
        </div>
        <p className="my-4 font-satoshi text-sm text-gray-400">{post.note}</p>

        <div className="mt-5 flex flex-center gap-4 border-t border-gray-500 pt-3">
          <p
            className="font-inter text-sm bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent cursor-pointer"
            onClick={() => handleEdit(post)}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm bg-gradient-to-r from-red-400  to-red-500 bg-clip-text text-transparent cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            Delete
          </p>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50  h-full w-full">
          <div className="p-6 border border-gray-500 rounded-lg shadow-lg max-w-sm w-full text-center mx-4">
            <p className="text-lg font-semibold text-gray-200 mb-6">
              Are you sure you want to delete this note?
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NoteCard;

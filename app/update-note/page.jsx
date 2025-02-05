"use client";
import { Suspense } from "react";
import Form from "@/components/Form";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const UpdateNote = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const noteId = searchParams.get("id");

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ note: "", tag: "" });

  useEffect(() => {
    const getNoteDetails = async () => {
      const response = await fetch(`/api/note/${noteId}`);
      const data = await response.json();
      setPost({
        note: data.note,
        tag: data.tag,
      });
    };

    if (noteId) getNoteDetails();
  }, [noteId]);

  const updateNote = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!noteId) return alert("Missing NoteId!");
    try {
      const response = await fetch(`/api/note/${noteId}`, {
        method: "PATCH",
        body: JSON.stringify({
          note: post.note,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Form
          type="Edit"
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={updateNote}
        />
      </Suspense>
    </div>
  );
};
export default UpdateNote;

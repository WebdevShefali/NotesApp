"use client";

import { useState } from "react";
import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const CreateNote = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    note: "",
    tag: "",
  });

  const createNote = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/note/new", {
        method: "POST",
        body: JSON.stringify({
          note: post.note,
          creator: session?.user?.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createNote}
    />
  );
};
export default CreateNote;

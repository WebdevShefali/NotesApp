import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex justify-center items-center flex-col">
      <h1 className="mt-10 text-3xl font-extrabold leading-[1.15] text-black sm:text-4xl text-left">
        <span className="bg-gradient-to-r from-gray-200 to-gray-700 bg-clip-text text-transparent">
          {type} Note
        </span>
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 rounded-xl bg-transparent shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-10"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-200">
            Your Note
          </span>
          <textarea
            value={post.note}
            onChange={(e) => setPost({ ...post, note: e.target.value })}
            placeholder="Write your note here"
            required
            className="w-full flex rounded-lg bg-transparent border border-gray-500 h-[200px] mt-2 p-3 text-sm text-white outline-0 focus:shadow-none focus:outline-none"
          />
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-200">
            Field of Note{" "}
            <span className="font-normal">(#personal, #work, #idea, etc.)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="Tag"
            required
            className="w-full flex rounded-lg bg-transparent border border-gray-500 mt-2 p-3 text-sm text-white outline-0 focus:shadow-none focus:outline-none"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link
            href="/"
            className="rounded-full border border-gray-500 bg-transparent py-2 px-5 text-white text-sm"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="mx-2 px-5 py-1.5 text-sm border border-gray-500 bg-transparent rounded-full text-white"
          >
            {submitting ? `Updating...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;

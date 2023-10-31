"use client";

export default function FormNewPost() {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} method="post">
      <textarea
        name="content"
        cols="30"
        rows="10"
        placeholder="co u ciebie?"></textarea>
      <input type="submit" value="wstaw" />
    </form>
  );
}

export default function NotFound() {
  return (
    <div className="md:h-[var(--home-height)] flex flex-col justify-center items-center h-screen bg-black px-5">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <q className="text-lg italic">
        Kẻ nào chưa từng mắc phải lỗi lầm cũng là kẻ chưa bao giờ thử làm việc
        gì cả.
      </q>{" "}
      <i>
        <b>Albert Einstein</b>
      </i>
    </div>
  );
}

import Head from "next/head";

export default function page404() {
  return (
    <>
      <Head>
        <title>./kma_score - Trang không tồn tại</title>
        <meta property="og:title" content="./kma_score - Trang không tồn tại" />
      </Head>
      <div className="flex flex-col justify-center items-center space-y-2.5 h-full">
        <style global jsx>{`
          #__next {
            height: 100vh !important;
          }
        `}</style>

        <h1>404</h1>
        <q>
          Kẻ nào chưa từng mắc phải lỗi lầm cũng là kẻ chưa bao giờ thử làm việc
          gì cả.
        </q>
        <i>
          <b>Albert Einstein</b>
        </i>
      </div>
    </>
  );
}

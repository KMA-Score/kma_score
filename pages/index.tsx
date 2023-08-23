import Head from "next/head";
import urlJoin from "url-join";

export default function Home() {
  return (
    <>
      <Head>
        <title>./kma_score</title>
        <meta
          property="og:description"
          content="Website tra cứu điểm dành cho sinh viên KMA"
        />
        <meta
          property="og:image"
          content={urlJoin(
            process.env.NEXT_PUBLIC_SITE_URL!,
            "api",
            "og-image",
          )}
        />
        <meta
          name="description"
          content="Website tra cứu điểm dành cho sinh viên KMA"
        />{" "}
      </Head>
      <div className="h-full">
        <style global jsx>{`
          #__next {
            height: 100vh !important;
          }
        `}</style>

        <main className="hero min-h-full">
          <div className="hero-content text-center px-0">
            <div className="space-y-5">
              <h2 className="font-bold">
                Website{" "}
                <span className="underline decoration-ctp--blue">
                  tra cứu điểm
                </span>{" "}
                dành cho{" "}
                <span className="underline decoration-ctp--red">
                  sinh viên KMA
                </span>
              </h2>
              <h6>
                Tổng hợp điểm nhanh chóng và chính xác, sử dụng đơn giản, mã
                nguồn mở.
              </h6>
              <div className="space-x-3 flex justify-center">
                <label
                  htmlFor="search-modal"
                  className="items-center btn btn-accent btn-outline transform-none normal-case text-lg"
                >
                  Tra cứu điểm
                </label>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

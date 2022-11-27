import Head from "next/head";
import Script from "next/script";

export default function Home() {
  return (
    <>
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

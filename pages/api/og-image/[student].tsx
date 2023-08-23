import { ImageResponse, ImageResponseOptions } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { getTimestamp } from "../../../utils/time";
import { encryptWithAesCbcBrowser } from "../../../utils/aesBrowser";
import urlJoin from "url-join";

export const config = {
  runtime: "edge",
};

const getFont = async (font: string) => {
  const res = await fetch(
    urlJoin(process.env.NEXT_PUBLIC_SITE_URL!, "fonts", `${font}.ttf`),
  );
  return await res.arrayBuffer();
};

const defaultTemplate = (options: ImageResponseOptions) => {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          backgroundColor: "#363a4f",
          width: "100vw",
          height: "100vh",
          color: "white",
          fontFamily: `"NotoSans-SemiBold", "NotoSans-Regular", "NotoSans-Bold"`,
          rowGap: "16px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "64px",
          }}
        >
          KMA Score
        </p>
      </div>
    ),
    options,
  );
};

export default async function ogImageStudent(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const fontNotoSemiBold = await getFont("NotoSans-SemiBold");
  const fontNotoRegular = await getFont("NotoSans-Regular");
  const fontNotoBold = await getFont("NotoSans-Bold");

  const options: ImageResponseOptions = {
    width: 640,
    height: 240,
    emoji: "twemoji",
    fonts: [
      {
        name: "NotoSans-SemiBold",
        data: fontNotoSemiBold,
        style: "normal",
        weight: 600,
      },
      {
        name: "NotoSans-Regular",
        data: fontNotoRegular,
        style: "normal",
        weight: 400,
      },
      {
        name: "NotoSans-Bold",
        data: fontNotoBold,
        style: "normal",
        weight: 700,
      },
    ],
  };

  // Check api key first
  if (!process.env.KMA_API_KEY || !process.env.KMA_API_SECRET) {
    return defaultTemplate(options);
  }

  const url = new URL(req.url!);
  const studentId = url.searchParams.get("student");

  if (!studentId) {
    return defaultTemplate(options);
  }

  // Fetch api
  try {
    const key = Buffer.from(process.env.KMA_API_SECRET!, "base64");
    const timestamp = String(getTimestamp());
    const hash = await encryptWithAesCbcBrowser(timestamp, key);

    const headers = new Headers();
    headers.set("X-KMA-API-KEY", process.env.KMA_API_KEY!);
    headers.set("X-KMA-API-SECRET-HASH", hash);

    const rsp = await fetch(
      urlJoin(process.env.NEXT_PUBLIC_API_BASE_URL!, "student", studentId),
      {
        headers,
      },
    );

    if (rsp.status !== 200) {
      return defaultTemplate(options);
    }

    const { data } = await rsp.json();

    if (!data) {
      return defaultTemplate(options);
    }

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px 20px",
            backgroundColor: "#363a4f",
            width: "100vw",
            height: "100vh",
            color: "white",
            fontFamily: `"NotoSans-SemiBold", "NotoSans-Regular", "NotoSans-Bold"`,
            rowGap: "16px",
          }}
        >
          <p style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>
            {data?.name}
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              columnGap: 8,
            }}
          >
            <p
              style={{
                margin: 0,
                padding: "8px 16px",
                border: "1px solid rgb(166, 218, 149)",
                borderRadius: "8px",
              }}
            >
              {data?.id}
            </p>

            <p
              style={{
                margin: 0,
                padding: "8px 16px",
                border: "1px solid rgb(237, 135, 150)",
                borderRadius: "8px",
              }}
            >
              {data?.class}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "rgba(138, 174, 244, 0.2)",
              padding: "12px 16px",
              borderRadius: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "40%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p
                  style={{
                    color: "rgb(166, 218, 149)",
                    margin: 0,
                    fontSize: 36,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 8,
                  }}
                >
                  {data?.passedSubjects}{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      height: "36px",
                      width: "36px",
                      stroke: "currentColor",
                    }}
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                      d="M464 128L240 384l-96-96M144 384l-96-96M368 128L232 284"
                    />
                  </svg>
                </p>

                <p style={{ color: "rgb(191, 197, 238)", margin: 0 }}>
                  Số môn đã hoàn thành
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                width: "30%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p
                  style={{
                    color: "rgb(245, 188, 230)",
                    margin: 0,
                    fontSize: 36,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 2,
                  }}
                >
                  {data?.failedSubjects}
                  {""}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      height: "36px",
                      width: "36px",
                      stroke: "currentColor",
                    }}
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M256 80c-8.66 0-16.58 7.36-16 16l8 216a8 8 0 008 8h0a8 8 0 008-8l8-216c.58-8.64-7.34-16-16-16z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                    />
                    <circle
                      cx="256"
                      cy="416"
                      r="16"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                    />
                  </svg>
                </p>

                <p style={{ color: "rgb(191, 197, 238)", margin: 0 }}>
                  Số môn còn nợ
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                width: "20%",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p
                  style={{
                    color: "rgb(138, 174, 244)",
                    margin: 0,
                    fontSize: 36,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 8,
                  }}
                >
                  {data?.avgScore}{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      height: "36px",
                      width: "36px",
                      stroke: "currentColor",
                    }}
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                      d="M48 320h64l64-256 64 384 64-224 32 96h64"
                    />
                    <circle
                      cx="432"
                      cy="320"
                      r="32"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="32"
                    />
                  </svg>
                </p>

                <p style={{ color: "rgb(191, 197, 238)", margin: 0 }}>GPA</p>
              </div>
            </div>
          </div>
        </div>
      ),
      options,
    );
  } catch (e) {
    console.error(e);

    throw e;
  }
}

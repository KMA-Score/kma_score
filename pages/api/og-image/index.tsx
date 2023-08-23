import { ImageResponse } from "next/server";
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

export default async function ogImageDefault() {
  const fontNotoBold = await getFont("NotoSans-Bold");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          backgroundColor: "#363a4f",
          width: "100vw",
          height: "100vh",
          color: "white",
          fontFamily: `"NotoSans-Bold"`,
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
    {
      width: 640,
      height: 240,
      emoji: "twemoji",
      fonts: [
        {
          name: "NotoSans-Bold",
          data: fontNotoBold,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}

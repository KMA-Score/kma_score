import { getServerSideSitemapLegacy } from "next-sitemap";
import { GetServerSideProps } from "next";
import StudentService from "../../services/Student.service";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let students = [];

  try {
    const data = await StudentService.getAll();
    students = data.data;
  } catch (error) {
    console.log(error);
  }

  const fields = students.map((student: any) => ({
    loc: `${process.env.NEXT_PUBLIC_SITE_URL}/student/${student.id}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemapLegacy(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}

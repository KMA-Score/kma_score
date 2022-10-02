import Box from "../../components/Box";
import { COLORS } from "../../utils/styling";
import { useEffect, useState } from "react";
import { getStatistics } from "../../services/ApiService";
import Loading from "../../components/Loading";
import { Helmet } from "react-helmet";

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getStatistics();
      setData(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);

  if (loading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>./kma_score</title>
        <meta property="og:title" content="./kma_score" />
        <meta
          property="og:description"
          content="Website tra cứu điểm dành cho sinh viên KMA"
        />
        <meta
          name="description"
          content="Website tra cứu điểm dành cho sinh viên KMA"
        />
      </Helmet>
      <div className="md:flex h-screen lg:h-[var(--home-height)] bg-black px-5 md:px-24 lg:px-36 pt-24 pb-5 items-center">
        <div className="flex-grow">
          <h3 className="font-bold leading-tight decoration-4 underline-offset-4">
            Website{" "}
            <span className="underline decoration-blue-500">tra cứu điểm</span>{" "}
            dành cho{" "}
            <span className="underline decoration-pink-500">sinh viên KMA</span>
          </h3>
          <p className="pt-5 text-gray-400">
            Tổng hợp điểm nhanh chóng và chính xác, sử dụng đơn giản, mã nguồn
            mở.
          </p>
        </div>
        <div className="lg:w-1/4 space-y-5 py-5 md:pl-5">
          <Box cssClass={COLORS.GREEN}>
            <h6>Tổng số sinh viên</h6>
            <h3>{data?.numberOfStudents}</h3>
          </Box>
          <Box cssClass={COLORS.RED}>
            <h6>Số sinh viên nợ môn</h6>
            <h3>{data?.numberOfDebtors}</h3>
          </Box>
          <Box cssClass={COLORS.BLUE}>
            <h6>Số môn học</h6>
            <h3>{data?.numberOfSubjects}</h3>
          </Box>
        </div>
      </div>
    </>
  );
}

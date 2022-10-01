import { useEffect, useState } from "react";
import { getStudentStatistics } from "../../services/ApiService";
import Chip from "../../components/Chip";
import { COLORS } from "../../utils/styling";
import Box from "../../components/Box";
import Table from "../../components/Table";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import NotFound from "../NotFound";
import Alert from "../../components/Alert";

export default function StudentPage() {
  const [studentStatistics, setStudentStatistics] = useState(null);
  const [tableHeader, setTableHeader] = useState([]);
  const [loading, setLoading] = useState(true);
  const { studentId } = useParams();

  const resetState = () => {
    if (!loading) {
      setStudentStatistics(null);
      setLoading(true);
    }
  };

  useEffect(() => {
    async function fetchData() {
      resetState();
      const studentStatistics = await getStudentStatistics(studentId);
      setStudentStatistics(studentStatistics);
    }
    fetchData();
  }, [studentId]);

  useEffect(() => {
    const TABLE_HEADER = [
      {
        label: "Tên môn học",
        valueRender: (value) => value.name,
      },
      {
        label: "Điểm thành phần 1",
      },
      {
        label: "Điểm thành phần 2",
      },
      {
        label: "Điểm thi",
      },
      {
        label: "Điểm tổng kết",
      },
      {
        label: "Điểm chữ",
      },
    ];
    setTableHeader(TABLE_HEADER);
  }, []);

  useEffect(() => {
    if (studentStatistics) {
      setLoading(false);
    }
  }, [studentStatistics]);

  if (loading) return <Loading />;

  if (!studentStatistics) return <NotFound />;

  return (
    <div className="md:flex overflow-auto bg-black px-5 md:px-24 lg:px-36 pt-16 md:pt-28 pb-5">
      <div className="space-y-2 w-full">
        <h2>{studentStatistics?.name}</h2>
        <section className="flex space-x-2 overflow-auto">
          <Chip>
            <ion-icon
              name="person-circle-outline"
              class="text-xl pr-2"
            ></ion-icon>
            {studentStatistics?.id}
          </Chip>
          <Chip>
            <ion-icon name="golf-outline" class="text-xl pr-2"></ion-icon>
            {studentStatistics?.class}
          </Chip>
        </section>
        <section className="flex flex-col lg:flex-row w-full space-y-2 lg:space-y-0 lg:space-x-5 justify-between w-full">
          <Box cssClass={COLORS.GREEN + " w-full"}>
            Số môn đã hoàn thành
            <h3>{studentStatistics?.passedSubjects}</h3>
          </Box>
          <Box cssClass={COLORS.RED + " w-full"}>
            Số môn còn nợ
            <h3>{studentStatistics?.failedSubjects}</h3>
          </Box>
          <Box cssClass={COLORS.BLUE + " w-full"}>
            GPA
            <h3>{studentStatistics?.avgScore}</h3>
          </Box>
        </section>
        <Alert type="warning">
          Do điểm các môn tiếng Anh cơ bản có thể quy đổi từ các chứng chỉ, điểm
          được hiển thị có thể không chính xác
        </Alert>
        <section className="overflow-x-auto">
          {studentStatistics && (
            <Table data={studentStatistics?.scores} columns={tableHeader} />
          )}
        </section>
      </div>
    </div>
  );
}

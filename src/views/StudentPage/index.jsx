import { useEffect, useState } from "react";
import { getStudentStatistics, getSubjects } from "../../services/ApiService";
import Chip from "../../components/Chip";
import { COLORS } from "../../utils/styling";
import Box from "../../components/Box";
import Table from "../../components/Table";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";

export default function StudentPage() {
  const [studentStatistics, setStudentStatistics] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [tableHeader, setTableHeader] = useState([]);
  const [loading, setLoading] = useState(true);
  const { studentId } = useParams();

  useEffect(() => {
    async function fetchData() {
      const studentStatistics = await getStudentStatistics(studentId);
      const subjects = await getSubjects();
      setStudentStatistics(studentStatistics);
      setSubjects(subjects);
    }
    fetchData();
  }, [studentId]);

  useEffect(() => {
    const TABLE_HEADER = [
      {
        label: "Tên môn học",
        valueRender: (value) => {
          if (subjects) {
            const index = subjects.findIndex((subject) => subject.id === value);
            if (index >= 0) return subjects[index].name;
          }
        },
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
  }, [subjects]);

  useEffect(() => {
    if ((studentStatistics, subjects)) {
      setLoading(false);
    }
  }, [studentStatistics, subjects]);

  if (loading) return <Loading />;

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
        <section>
          {studentStatistics && subjects && (
            <Table data={studentStatistics?.scores} columns={tableHeader} />
          )}
        </section>
      </div>
    </div>
  );
}

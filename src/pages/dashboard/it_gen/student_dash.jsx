import { Button } from "@material-tailwind/react";
import React from "react";
import { Card, Typography } from "@material-tailwind/react";
import httpClient from "@/configs/httpClient";
import { useEffect, useState, useMemo } from "react";

const TABLE_HEAD = [
  "Course No.",
  "Course Name",
  "Faculty",
  "Time Slot",
  "Day",
  "Enroll",
];

export function StudentDash() {
  const [ttData, setttData] = useState([]);
  const [user, setUser] = useState([]);
  const [enrollStatus, setEnrolStatus] = useState([]);

  const handleEnroll = async (data) => {
    try {
      const response = await httpClient.post("/enroll", {
        section: data.section,
        course_number: data.course.course_number,
        course_name: data.course.course_name,
        room: data.room,
        instructor_id: data.instructor.instructor_id,
        instructor_name: data.instructor.instructor_name,
        pid: data.meeting_time.pid,
        time: data.meeting_time.time,
        day: data.meeting_time.day,
      });
      window.location.href = "/dashboard/Timetable";
      console.log(response);
    } catch (error) {
      if(error.response.status == 404){
        alert("You have already enrolled for this timeslot");
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("/@me");
        setUser(resp.data);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("/public_tt");
        setttData(resp.data.timetable);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("/get_enroll_data");
        setEnrolStatus(resp.data);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  const filteredData = useMemo(
    () => ttData.filter((data) => data.section === user.dept),
    [ttData, user.dept]
  );

  const isEnrolled = (pid) => enrollStatus.some((enrollment) => enrollment.meeting_time.pid === pid);
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card color="transparent" shadow={true} className="flex justify-center items-center">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((subdata, index) => {
              const { sid, course, instructor, meeting_time } = subdata;
              const isLast = index === filteredData.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={sid}>
                  <td className={classes}>{course.course_number}</td>
                  <td className={classes}>{course.course_name}</td>
                  <td className={classes}>{instructor.instructor_name}</td>
                  <td className={classes}>{meeting_time.time}</td>
                  <td className={classes}>{meeting_time.day}</td>
                  <td className={classes}>
                  <Typography variant="small" color="blue-gray" className="font-medium">
                    <Button
                      color="blue"
                      onClick={() => handleEnroll(subdata)}
                      disabled={isEnrolled(meeting_time.pid)}
                    >
                      {isEnrolled(meeting_time.pid) ? "Enrolled" : "Enroll"}
                    </Button>
                  </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default StudentDash;

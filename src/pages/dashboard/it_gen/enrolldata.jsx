import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { useState,useEffect } from "react";
  import httpClient from "@/configs/httpClient";
  
  const TABLE_HEAD = ["Student Id", "Section", "Room", "Day","Time","Instructor Name","Course Name"];
  
  export function EnrollData() {
    const [roomData, setRoomData] = useState([]);
  
    useEffect(() => {
      (async () => {
        try {
          const resp = await httpClient.get("/get_all_enroll_data");
          setRoomData(resp.data);
        } catch (error) {
          console.log("Not authenticated");
        }
      })();
    }, []);
  
    console.log(roomData)
    return (
      <div className="flex flex-col rounded-2xl bg-white p-4 pb-8">
        <Card color="transparent" shadow={false} className="flex justify-center items-center">
          <Typography variant="h3" color="blue-gray">
            Department's Data
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            All department data can be viewed here. If you want to add or edit please contact Admin.
          </Typography>
        </Card>
  
        <Card className="h-full w-full overflow-scroll mt-12">
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
              {roomData.map(({ student_id, section,room,meeting_time,instructor,course}, index) => {
                const isLast = index === roomData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
  
                return (
                  <tr key={student_id}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {student_id}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {section}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {room}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {meeting_time.day}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {meeting_time.time}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {instructor.instructor_name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {course.course_name}
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
  
  export default EnrollData;
  
import {
    Card,
    Input,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import { useState,useEffect } from "react";
  import httpClient from "@/configs/httpClient";
  
  const TABLE_HEAD = ["Course Name", "Course Number", "Seating Capacity"];
  
  export function Course() {
    const [roomData, setRoomData] = useState([]);
  
    useEffect(() => {
      (async () => {
        try {
          const resp = await httpClient.get("/courses");
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
            Course Data
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            All course data can be viewed here. If you want to add or edit please contact Admin.
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
              {roomData.map(({ course_name, course_number, seating_capacity}, index) => {
                const isLast = index === roomData.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
  
                return (
                  <tr key={course_number}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {course_name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {course_number}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {seating_capacity}
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
  
  export default Course;
  
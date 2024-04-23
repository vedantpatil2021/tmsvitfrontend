import {
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState,useEffect } from "react";
import httpClient from "@/configs/httpClient";

const TABLE_HEAD = ["Faculty Id", "Faculty Name"];

export function Instructor() {
  const [instructorData, setInstructorData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("/instructors");
        setInstructorData(resp.data);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  console.log(instructorData)
  return (
    <div className="flex flex-col rounded-2xl bg-white p-4 pb-8">
      <Card color="transparent" shadow={false} className="flex justify-center items-center">
        <Typography variant="h4" color="blue-gray">
          Instructor's Data
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          All instructor's data can be viewed here. If you want to add or edit please contact Admin.
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
            {instructorData.map(({ id, name}, index) => {
              const isLast = index === instructorData.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {name}
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

export default Instructor;

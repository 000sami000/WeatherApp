import { ForcastData } from "@/api/types";
// import { Card, CardDescription, CardFooter, CardTitle } from "./ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
    Card,
    CardContent,
    // CardDescription,
    // CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import {format} from "date-fns"

interface HourlyUpdatesProps{
    data:ForcastData;   
}
interface ChartData {
    time: string;
    temp: number;
    feels_like: number;
  }
function HourlyUpdates({data}:HourlyUpdatesProps) {
  const chartData: ChartData[] = data.list
  .slice(0, 8) // Get next 24 hours (3-hour intervals)
  .map((item) => ({
    time: format(new Date(item.dt * 1000), "ha"),
    temp: Math.round(item.main.temp),
    feels_like: Math.round(item.main.feels_like),
  }));
  return (
    <Card className="w-[100%]">
    <CardHeader>
      <CardTitle>Today's Temperature</CardTitle>
   
    </CardHeader>
    <CardContent>
  <div className="h-[200px] w-[100%]">
 
  <ResponsiveContainer width={"100%"} height={"100%"}>
   <LineChart width={400} height={400} data={chartData}>
{/* <Line type={"monotone"} dataKey={'uv'} stroke="#8884d8"/> */}
<XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
              />
               <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
             
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                       
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Temperature
                            </span>
                            <span className="font-bold">
                              {payload[0].value}°
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Feels Like
                            </span>
                            <span className="font-bold">
                              {payload[1].value}°
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
               <Line
                type="monotone"
                dataKey="temp"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#64748b"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
   </LineChart>
  </ResponsiveContainer>

  </div>
      
    </CardContent>
 
  </Card>
  )
}

export default HourlyUpdates
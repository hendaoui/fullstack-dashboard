import {
  Breadcrumbs,
  Card,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { StatisticsCard } from "../../components/StatisticsCard";
import { UsersIcon } from "@heroicons/react/20/solid";
import { ChartBarIcon } from "@heroicons/react/20/solid";
import { useStore } from "../../store";
import Chart from "react-apexcharts";
import { chartsConfig } from "../../config/chartConfig";

const Dashboard = () => {
  const users = useStore((state) => state.users);
  const metrics = useStore((state) => state.metrics);
  const user = useStore((state) => state);
  const statisticsCardsData = [
    {
      color: "red",
      icon: UsersIcon,
      title: "Users",
      value: users.length,
      footer: {
        color: "text-green-500",
        value: "+3%",
        label: "than last month",
      },
    },
    {
      color: "red",
      icon: ChartBarIcon,
      title: "Metrics",
      value: metrics.length,
      footer: {
        color: "text-green-500",
        value: "+5%",
        label: "than yesterday",
      },
    },
  ];
  const widgetChart = {
    type: "bar",
    height: 420,
    series: [
      {
        name: "Views",
        data: [50, 20, 10, 22, 50, 10, 40],
      },
    ],
    options: {
      ...chartsConfig,
      colors: "#388e3c",
      plotOptions: {
        bar: {
          columnWidth: "16%",
          borderRadius: 5,
        },
      },
      xaxis: {
        ...chartsConfig.xaxis,
        categories: ["M", "T", "W", "T", "F", "S", "S"],
      },
    },
  };
  return (
    <>
      <div className="flex justify-between place-items-center mb-4">
        <Breadcrumbs className="bg-blue-gray-100">
          <a href="#">Dashboard</a>
        </Breadcrumbs>
      </div>
      <div className="mt-12">
        {user && user.role === "ADMIN" && (
          <div className="mb-12 grid gap-y-10 gap-x-2 md:grid-cols-2 xl:grid-cols-2">
            {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
              <StatisticsCard
                key={title}
                {...rest}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-6 h-6 text-white",
                })}
                footer={
                  <Typography className="font-normal text-blue-gray-600">
                    <strong className={footer.color}>{footer.value}</strong>
                    &nbsp;{footer.label}
                  </Typography>
                }
              />
            ))}
          </div>
        )}
        <div className="mb-12 grid">
          <Card className="border border-blue-gray-100 shadow-sm">
            <CardHeader
              variant="gradient"
              color={"white"}
              floated={false}
              shadow={false}
            >
              <Chart {...widgetChart} />
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

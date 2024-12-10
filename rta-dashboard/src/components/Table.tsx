/* eslint-disable @typescript-eslint/no-explicit-any */
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

const Table = ({ TABLE_HEAD, TABLE_ROWS, TABLE_ACTIONS }: any) => {
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search"
              crossOrigin="false"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="p-6 px-0 w-full min-w-max">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {/* {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )} */}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS.map((row: any, index: number) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index}>
                  {Object.values(row).map((value: any, index: number) => (
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                            key={index}
                          >
                            {value}
                          </Typography>
                        </div>
                      </div>
                    </td>
                  ))}
                  <td className={"flex justify-end " + classes}>
                    {TABLE_ACTIONS.map((action, index) => (
                      <Tooltip key={index} content={action?.label}>
                        <IconButton
                          variant="text"
                          onClick={() => action?.handler(row?.id)}
                        >
                          {action.type === "edit" && (
                            <PencilIcon className="h-4 w-4" />
                          )}
                          {action.type === "view" && (
                            <EyeIcon className="h-4 w-4" />
                          )}
                          {action.type === "delete" && (
                            <TrashIcon className="h-4 w-4" />
                          )}
                        </IconButton>
                      </Tooltip>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default Table;

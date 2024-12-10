/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import Table from "../../components/Table";
import {
  Button,
  Dialog,
  DialogBody,
  Option,
  DialogHeader,
  IconButton,
  Input,
  Select,
  Typography,
  Breadcrumbs,
} from "@material-tailwind/react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { addMetric, fetchMetrics } from "../service/metricsService";
import { toast } from "react-toastify";
import { useStore } from "../../store";

const Metrics = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);

  const user = useStore((state) => state);

  const handleAddModalOpen = () => setAddModalOpen(!addModalOpen);

  const metrics = useStore((state) => state.metrics);
  const setMetrics = useStore((state) => state.setMetrics);

  const navigate = useNavigate();

  const TABLE_HEAD = ["#", "Name", "Description", "Department", ""];

  const TABLE_ACTIONS = [
    {
      type: "view",
      label: "View",
      handler: (id: any) => navigate("/dashboard/metrics/view/" + id),
    },
  ];

  const _onSave = async (values) => {
    try {
      await addMetric({ ...values });

      const fetchedMetrics = await fetchMetrics();
      setMetrics(fetchedMetrics);

      toast.success("Metric added successfully!");
      handleAddModalOpen();
    } catch (error) {
      console.error("Add metric failed:", error);
      toast.error("Failed to add metric. Please try again.");
    }
  };

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const fetchedMetrics = await fetchMetrics();
        setMetrics(fetchedMetrics);
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
        toast.error("Failed to fetch metrics.");
      }
    };

    loadMetrics();
  }, []);

  return (
    <>
      <div className="flex justify-between place-items-center mb-4">
        <Breadcrumbs className="bg-blue-gray-100">
          <a href="#">Metrics</a>
        </Breadcrumbs>
        {user && user.role === "ADMIN" && (
          <Button
            onClick={handleAddModalOpen}
            className="flex items-center gap-3 rounded-md bg-indigo-600"
            size="sm"
          >
            <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add
          </Button>
        )}
      </div>
      <Table
        TABLE_HEAD={TABLE_HEAD}
        TABLE_ROWS={metrics}
        TABLE_ACTIONS={TABLE_ACTIONS}
      />

      <Dialog
        size="sm"
        open={addModalOpen}
        handler={handleAddModalOpen}
        className="p-4"
      >
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Add Metrics
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleAddModalOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          <Formik
            initialValues={{ name: "", department: "", description: "" }}
            validationSchema={Yup.object({
              name: Yup.string().required("Required"),
              department: Yup.string().required("Required"),
              description: Yup.string().required("Required"),
            })}
            onSubmit={(values) => {
              _onSave(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              setFieldValue,
              handleSubmit,
              isSubmitting,
              handleBlur,
            }) => (
              <form onSubmit={handleSubmit}>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                  >
                    Name
                  </Typography>
                  <Input
                    color="gray"
                    size="lg"
                    placeholder="e.g., John Doe"
                    name="name"
                    crossOrigin="false"
                    className="placeholder:opacity-100"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={handleChange}
                    value={values.name}
                    error={
                      errors.name && touched.name && errors.name ? true : false
                    }
                    success={!errors.name && touched.name}
                  />
                  <span className="text-xs">
                    {errors.name && touched.name && <div>{errors.name}</div>}
                  </span>
                </div>

                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                  >
                    Description
                  </Typography>
                  <Input
                    color="gray"
                    size="lg"
                    placeholder=""
                    name="description"
                    crossOrigin="false"
                    className="placeholder:opacity-100"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={handleChange}
                    value={values.description}
                    error={
                      errors.description &&
                      touched.description &&
                      errors.description
                        ? true
                        : false
                    }
                    success={!errors.description && touched.description}
                  />
                  <span className="text-xs">
                    {errors.description && touched.description && (
                      <div>{errors.description}</div>
                    )}
                  </span>
                </div>

                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                  >
                    Department
                  </Typography>

                  <Select
                    label="Select Version"
                    color="gray"
                    size="lg"
                    placeholder="e.g., John Doe"
                    name="name"
                    className="placeholder:opacity-100"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={(selectedOption) => {
                      const event = {
                        target: { name: "department", value: selectedOption },
                      };
                      handleChange(event);
                    }}
                    value={values.department}
                    error={
                      errors.department &&
                      touched.department &&
                      errors.department
                        ? true
                        : false
                    }
                    success={!errors.department && touched.department}
                  >
                    <Option value="PTA">PTA</Option>
                    <Option value="HR">HR</Option>
                  </Select>
                  <span className="text-xs">
                    {errors.department && touched.department && (
                      <div>{errors.department}</div>
                    )}
                  </span>
                </div>

                <Button
                  className="ml-auto rounded-md bg-indigo-600 flex mt-4"
                  type="submit"
                >
                  submit
                </Button>
              </form>
            )}
          </Formik>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default Metrics;

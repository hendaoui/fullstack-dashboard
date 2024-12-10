/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogBody,
  Select,
  Typography,
  Option,
  DialogHeader,
  IconButton,
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
  DialogFooter,
} from "@material-tailwind/react";
import Table from "../../components/Table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import * as Yup from "yup";
import { DayPicker } from "react-day-picker";
import { toast } from "react-toastify";
import { useStore } from "../../store";
import {
  addMetricEntry,
  deleteMetricEntry,
  fetchMetricEntries,
  MetricDataEntry,
  updateMetricEntry,
} from "../service/metricsService";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const MetricsDetails = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [entryDate] = useState<Date>(new Date());
  const [openDeleteDialog, setDeleteDialogOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const handleAddModalOpen = () => setAddModalOpen(!addModalOpen);
  const handleEditModalOpen = () => setEditModalOpen(!editModalOpen);
  const handleDeleteDialogOpen = () => setDeleteDialogOpen(!openDeleteDialog);

  const [metricName, setMetricName] = useState("");
  const [metricDescription, setMetricDescription] = useState("");
  const [departmentName, setDepartmentName] = useState("");

  const [editingEntry, setEditingEntry] = useState<MetricDataEntry | null>(
    null
  );

  const metrics = useStore((state) => state.metrics);
  const metricEntries = useStore((state) => state.metricEntries);
  const setMetricEntries = useStore((state) => state.setMetricEntries);

  const id = useParams().id ?? "";

  const TABLE_HEAD = [
    "#",
    "Value",
    "Entry Date",
    "Last update",
    "Created by",
    "",
  ];

  const TABLE_ACTIONS = [
    {
      type: "edit",
      label: "Edit",
      handler: (entry: string) => {
        const item: any = metricEntries.find((item) => item.id == entry);
        setEditingEntry(item);
        handleEditModalOpen();
      },
    },
    {
      type: "delete",
      label: "Delete",
      handler: (entry: string) => {
        const item: any = metricEntries.find((item) => item.id == entry);
        setEditingEntry(item);
        handleDeleteDialogOpen();
      },
    },
  ];

  const _onSave = async (values) => {
    try {
      const formattedEntryDate = format(values.entryDate, "yyyy-MM-dd");
      await addMetricEntry({ id, ...values, entryDate: formattedEntryDate });

      const fetchedMetricEntries = await fetchMetricEntries(id);
      setMetricEntries(fetchedMetricEntries);

      toast.success("Metric data entry added successfully!");
      handleAddModalOpen();
    } catch (error) {
      console.error("Add metric data entry failed:", error);
      toast.error("Failed to add metric data entry. Please try again.");
    }
  };

  const _onEditSave = async (values: { value: string; entryDate: Date }) => {
    if (!editingEntry) return;

    try {
      const formattedEntryDate = format(values.entryDate, "yyyy-MM-dd");
      await updateMetricEntry({
        ...editingEntry,
        value: values.value,
        entry_date: formattedEntryDate,
      });

      const fetchedMetricEntries = await fetchMetricEntries(id);
      setMetricEntries(fetchedMetricEntries);

      toast.success("Metric data entry updated successfully!");
      handleEditModalOpen();
    } catch (error) {
      console.error("Edit metric data entry failed:", error);
      toast.error("Failed to update metric data entry. Please try again.");
    }
  };

  const _onDelete = async () => {
    if (!editingEntry) {
      return;
    }
  
    try {
      await deleteMetricEntry(editingEntry);
  
      const fetchedMetricEntries = await fetchMetricEntries(id);
      setMetricEntries(fetchedMetricEntries);
  
      toast.success("Metric data entry deleted successfully!");
      handleDeleteDialogOpen();
    } catch (error) {
      console.error("Delete metric data entry failed:", error);
      toast.error("Failed to delete metric data entry. Please try again.");
    }
  };

  useEffect(() => {
    const loadMetricEntries = async () => {
      try {
        const fetchedMetrics = await fetchMetricEntries(id);
        setMetricEntries(fetchedMetrics);
      } catch (error) {
        console.error("Failed to fetch metrics data entries:", error);
        toast.error("Failed to fetch metric data entries.");
      }
    };

    loadMetricEntries();
  }, []);

  useEffect(() => {
    if (id) {
      const filteredEntry = metrics.find((entry) => entry.id == id);

      if (filteredEntry) {
        setMetricName(filteredEntry.name);
        setMetricDescription(filteredEntry.description);
        setDepartmentName(filteredEntry.department);
      }
    }
  }, [id, metricEntries]);

  return (
    <>
      <div className="flex justify-between place-items-center mb-4">
        <Breadcrumbs className="bg-blue-gray-100">
          <a href="#" className="opacity-60">
            Metrics
          </a>
          <a href="#" className="opacity-60">
            {departmentName}
          </a>
          <a href="#"> {metricName}</a>
        </Breadcrumbs>
        <Button
          className="flex items-center gap-3 rounded-md bg-indigo-600"
          size="sm"
          onClick={handleAddModalOpen}
        >
          <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add
        </Button>
      </div>
      <Typography className="text-base max-w-xs font-normal leading-8 !text-gray-500 py-4">
        {metricDescription}
      </Typography>
      <Table
        TABLE_HEAD={TABLE_HEAD}
        TABLE_ROWS={metricEntries.map(
          ({ metric_id, entry_date, last_update, created_by, ...rest }) => ({
            ...rest,
            entry_date: format(new Date(entry_date), "dd-MM-yyyy"),
            last_update: format(new Date(last_update), "dd-MM-yyyy"),
            crated_by: created_by,
          })
        )}
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
            Add Metrics Entry
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
            initialValues={{ value: "", entryDate: new Date() }}
            validationSchema={Yup.object({
              value: Yup.string().required("Required"),
              entryDate: Yup.date()
                .required("Required")
                .transform((originalValue) => new Date(originalValue))
                .typeError("Invalid date format"),
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
                    Value
                  </Typography>
                  <Input
                    color="gray"
                    size="lg"
                    name="value"
                    crossOrigin="false"
                    className="placeholder:opacity-100"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={handleChange}
                    value={values.value}
                    error={
                      errors.value && touched.value && errors.value
                        ? true
                        : false
                    }
                    success={!errors.value && touched.value}
                  />
                  <span className="text-xs">
                    {errors.value && touched.value && <div>{errors.value}</div>}
                  </span>
                </div>

                <Popover placement="bottom">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="my-2 text-left font-medium"
                  >
                    Entry Date
                  </Typography>
                  <PopoverHandler>
                    <Input
                      type="text"
                      color="gray"
                      readOnly
                      size="lg"
                      name="entryDate"
                      crossOrigin="false"
                      className="placeholder:opacity-100"
                      containerProps={{
                        className: "!min-w-full",
                      }}
                      labelProps={{
                        className: "hidden",
                      }}
                      //   onChange={handleChange}
                      onChange={() => null}
                      value={
                        values.entryDate
                          ? new Date(values.entryDate).toLocaleDateString()
                          : new Date().toLocaleDateString()
                      }
                      error={
                        errors.entryDate &&
                        touched.entryDate &&
                        errors.entryDate
                          ? true
                          : false
                      }
                      success={!errors.entryDate && touched.entryDate}
                    />
                  </PopoverHandler>
                  <PopoverContent>
                    <DayPicker
                      mode="single"
                      selected={entryDate}
                      onSelect={(date) => setFieldValue("entryDate", date)}
                      showOutsideDays
                      className="border-0 bg-white shadow-lg border-2 rounded-md p-2"
                      style={{ zIndex: 999999999, position: "relative" }}
                      classNames={{
                        caption:
                          "flex justify-center py-2 mb-4 relative items-center",
                        caption_label: "text-sm font-medium text-gray-900",
                        nav: "flex items-center",
                        nav_button:
                          "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                        nav_button_previous: "absolute left-1.5",
                        nav_button_next: "absolute right-1.5",
                        table: "w-full border-collapse",
                        head_row: "flex font-medium text-gray-900",
                        head_cell: "m-0.5 w-9 font-normal text-sm",
                        row: "flex w-full mt-2",
                        cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-9 w-9 p-0 font-normal",
                        day_range_end: "day-range-end",
                        day_selected:
                          "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                        day_today: "rounded-md bg-gray-200 text-gray-900",
                        day_outside:
                          "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                        day_disabled: "text-gray-500 opacity-50",
                        day_hidden: "invisible",
                      }}
                      components={{
                        IconLeft: ({ ...props }) => (
                          <ChevronLeftIcon
                            {...props}
                            className="h-4 w-4 stroke-2"
                          />
                        ),
                        IconRight: ({ ...props }) => (
                          <ChevronRightIcon
                            {...props}
                            className="h-4 w-4 stroke-2"
                          />
                        ),
                      }}
                    />
                  </PopoverContent>
                </Popover>

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

      <Dialog
        size="sm"
        open={editModalOpen}
        handler={handleEditModalOpen}
        className="p-4"
      >
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Edit Metrics Entry
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleEditModalOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          {editingEntry && (
            <Formik
              initialValues={{
                value: editingEntry.value,
                entryDate: new Date(editingEntry.entry_date),
              }}
              validationSchema={Yup.object({
                value: Yup.string().required("Required"),
                entryDate: Yup.date()
                  .required("Required")
                  .transform((originalValue) => new Date(originalValue))
                  .typeError("Invalid date format"),
              })}
              onSubmit={(values) => {
                _onEditSave(values);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                setFieldValue,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 text-left font-medium"
                    >
                      Value
                    </Typography>
                    <Input
                      color="gray"
                      size="lg"
                      name="value"
                      crossOrigin="false"
                      className="placeholder:opacity-100"
                      containerProps={{
                        className: "!min-w-full",
                      }}
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={handleChange}
                      value={values.value}
                      error={
                        errors.value && touched.value && errors.value
                          ? true
                          : false
                      }
                      success={!errors.value && touched.value}
                    />
                    <span className="text-xs">
                      {errors.value && touched.value && (
                        <div>{errors.value}</div>
                      )}
                    </span>
                  </div>

                  <Popover placement="bottom">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="my-2 text-left font-medium"
                    >
                      Entry Date
                    </Typography>
                    <PopoverHandler>
                      <Input
                        type="text"
                        color="gray"
                        readOnly
                        size="lg"
                        name="entryDate"
                        crossOrigin="false"
                        className="placeholder:opacity-100"
                        containerProps={{
                          className: "!min-w-full",
                        }}
                        labelProps={{
                          className: "hidden",
                        }}
                        onChange={() => null}
                        value={
                          values.entryDate
                            ? new Date(values.entryDate).toLocaleDateString()
                            : new Date().toLocaleDateString()
                        }
                        error={
                          errors.entryDate &&
                          touched.entryDate &&
                          errors.entryDate
                            ? true
                            : false
                        }
                        success={!errors.entryDate && touched.entryDate}
                      />
                    </PopoverHandler>
                    <PopoverContent>
                      <DayPicker
                        mode="single"
                        selected={entryDate}
                        onSelect={(date) => setFieldValue("entryDate", date)}
                        showOutsideDays
                        className="border-0 bg-white shadow-lg border-2 rounded-md p-2"
                        style={{ zIndex: 999999999, position: "relative" }}
                      />
                    </PopoverContent>
                  </Popover>

                  <Button
                    className="ml-auto rounded-md bg-indigo-600 flex mt-4"
                    type="submit"
                  >
                    submit
                  </Button>
                </form>
              )}
            </Formik>
          )}
        </DialogBody>
      </Dialog>

      <Dialog open={openDeleteDialog} handler={handleDeleteDialogOpen}>
        <DialogHeader>Would you like to delete this item?</DialogHeader>
        <DialogBody>{editingEntry?.value}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleDeleteDialogOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={_onDelete}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default MetricsDetails;

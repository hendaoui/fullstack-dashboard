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
  DialogFooter,
} from "@material-tailwind/react";
import Table from "../../components/Table";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useStore } from "../../store";
import {
  addUser,
  deleteUser,
  fetchUsers,
  updateUser,
  User,
} from "../service/usersService";

const UsersManagement = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [openDeleteDialog, setDeleteDialogOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const handleAddModalOpen = () => setAddModalOpen(!addModalOpen);
  const handleEditModalOpen = () => setEditModalOpen(!editModalOpen);
  const handleDeleteDialogOpen = () => setDeleteDialogOpen(!openDeleteDialog);

  const [editingEntry, setEditingEntry] = useState<User | null>(null);

  const users = useStore((state) => state.users);
  const setUsers = useStore((state) => state.setUsers);

  const user = useStore((state) => state);

  const TABLE_HEAD = ["#", "Email", "Role", "Department", ""];

  const TABLE_ACTIONS = [
    {
      type: "edit",
      label: "Edit",
      handler: (entry: string) => {
        const item: any = users.find((item) => item.id == entry);
        setEditingEntry(item);
        handleEditModalOpen();
      },
    },
    {
      type: "delete",
      label: "Delete",
      handler: (entry: string) => {
        const item: any = users.find((item) => item.id == entry);
        setEditingEntry(item);
        handleDeleteDialogOpen();
      },
    },
  ];

  const _onSave = async (values) => {
    try {
      await addUser({ ...values });

      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);

      toast.success("User added successfully!");
      handleAddModalOpen();
    } catch (error) {
      console.error("Add User failed:", error);
      toast.error("Failed to add User. Please try again.");
    }
  };

  const _onEditSave = async (values) => {
    if (!editingEntry) return;

    try {
      await updateUser({
        ...editingEntry,
        ...values,
      });

      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);

      toast.success("User updated successfully!");
      handleEditModalOpen();
    } catch (error) {
      console.error("Edit User failed:", error);
      toast.error("Failed to update User. Please try again.");
    }
  };

  const _onDelete = async () => {
    if (!editingEntry) {
      return;
    }

    if (editingEntry.email === user.email) {
      toast.error("You cannot delete the currently logged-in user.");
      return;
    }

    try {
      await deleteUser(editingEntry);

      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);

      toast.success("User deleted successfully!");
      handleDeleteDialogOpen();
    } catch (error) {
      console.error("Delete User failed:", error);
      toast.error("Failed to delete User. Please try again.");
    }
  };

  useEffect(() => {
    const loadMetricEntries = async () => {
      try {
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        toast.error("Failed to fetch users.");
      }
    };

    loadMetricEntries();
  }, []);

  return (
    <>
      <div className="flex justify-between place-items-center mb-4">
        <Breadcrumbs className="bg-blue-gray-100">
          <a href="#">Users Management</a>
        </Breadcrumbs>
        <Button
          className="flex items-center gap-3 rounded-md bg-indigo-600"
          size="sm"
          onClick={handleAddModalOpen}
        >
          <PlusIcon strokeWidth={2} className="h-4 w-4" /> Add
        </Button>
      </div>
      <Table
        TABLE_HEAD={TABLE_HEAD}
        TABLE_ROWS={users}
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
            Add User
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
            initialValues={{
              email: "",
              password: "",
              role: "USER",
              department: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email format")
                .required("Required"),
              password: Yup.string().required("Required"),
              role: Yup.string().required("Required"),
              department: Yup.string().required("Required"),
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
                    Email
                  </Typography>
                  <Input
                    color="gray"
                    size="lg"
                    name="email"
                    type="email"
                    crossOrigin="false"
                    className="placeholder:opacity-100"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={handleChange}
                    value={values.email}
                    error={
                      errors.email && touched.email && errors.email
                        ? true
                        : false
                    }
                    success={!errors.email && touched.email}
                  />
                  <span className="text-xs">
                    {errors.email && touched.email && <div>{errors.email}</div>}
                  </span>
                </div>

                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                  >
                    Password
                  </Typography>
                  <Input
                    color="gray"
                    size="lg"
                    name="password"
                    type="password"
                    crossOrigin="false"
                    className="placeholder:opacity-100"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={handleChange}
                    value={values.password}
                    error={
                      errors.password && touched.password && errors.password
                        ? true
                        : false
                    }
                    success={!errors.password && touched.password}
                  />
                  <span className="text-xs">
                    {errors.password && touched.password && (
                      <div>{errors.password}</div>
                    )}
                  </span>
                </div>

                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 text-left font-medium"
                  >
                    Role
                  </Typography>

                  <Select
                    label="Select Role"
                    color="gray"
                    size="lg"
                    placeholder="USER"
                    name="role"
                    className="placeholder:opacity-100"
                    containerProps={{
                      className: "!min-w-full",
                    }}
                    labelProps={{
                      className: "hidden",
                    }}
                    onChange={(selectedOption) => {
                      const event = {
                        target: { name: "role", value: selectedOption },
                      };
                      handleChange(event);
                    }}
                    value={values.role}
                    error={
                      errors.role && touched.role && errors.role ? true : false
                    }
                    success={!errors.role && touched.role}
                    disabled
                  >
                    <Option value="ADMIN">ADMIN</Option>
                    <Option value="USER">USER</Option>
                  </Select>
                  <span className="text-xs">
                    {errors.role && touched.role && <div>{errors.role}</div>}
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
                    placeholder=""
                    name="department"
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

      <Dialog
        size="sm"
        open={editModalOpen}
        handler={handleEditModalOpen}
        className="p-4"
      >
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Edit User
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
                email: editingEntry.email,
                password: "",
                role: editingEntry.role,
                department: editingEntry.department,
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email format")
                  .required("Required"),
                password: Yup.string(),
                role: Yup.string().required("Required"),
                // department: Yup.string().required("Required"),
                department: Yup.string().when("role", (role, schema) => {
                  if (editingEntry.role === "ADMIN") {
                    return schema.notRequired();
                  }
                  return schema.required("Department is required");
                }),
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
                      Email
                    </Typography>
                    <Input
                      color="gray"
                      size="lg"
                      name="email"
                      type="email"
                      crossOrigin="false"
                      className="placeholder:opacity-100"
                      containerProps={{
                        className: "!min-w-full",
                      }}
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={handleChange}
                      value={values.email}
                      error={
                        errors.email && touched.email && errors.email
                          ? true
                          : false
                      }
                      success={!errors.email && touched.email}
                    />
                    <span className="text-xs">
                      {errors.email && touched.email && (
                        <div>{errors.email}</div>
                      )}
                    </span>
                  </div>

                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 text-left font-medium"
                    >
                      New Password
                    </Typography>
                    <Input
                      color="gray"
                      placeholder="Optional"
                      size="lg"
                      name="password"
                      type="password"
                      crossOrigin="false"
                      className="placeholder:opacity-100"
                      containerProps={{
                        className: "!min-w-full",
                      }}
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={handleChange}
                      value={values.password}
                      error={
                        errors.password && touched.password && errors.password
                          ? true
                          : false
                      }
                      success={!errors.password && touched.password}
                    />
                    <span className="text-xs">
                      {errors.password && touched.password && (
                        <div>{errors.password}</div>
                      )}
                    </span>
                  </div>

                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="mb-2 text-left font-medium"
                    >
                      Role
                    </Typography>

                    <Select
                      label="Select Role"
                      color="gray"
                      size="lg"
                      placeholder="USER"
                      name="role"
                      className="placeholder:opacity-100"
                      containerProps={{
                        className: "!min-w-full",
                      }}
                      labelProps={{
                        className: "hidden",
                      }}
                      onChange={(selectedOption) => {
                        const event = {
                          target: { name: "role", value: selectedOption },
                        };
                        handleChange(event);
                      }}
                      value={values.role}
                      error={
                        errors.role && touched.role && errors.role
                          ? true
                          : false
                      }
                      success={!errors.role && touched.role}
                      disabled
                    >
                      <Option value="ADMIN">ADMIN</Option>
                      <Option value="USER">USER</Option>
                    </Select>
                    <span className="text-xs">
                      {errors.role && touched.role && <div>{errors.role}</div>}
                    </span>
                  </div>
                  {editingEntry && editingEntry.role === "USER" && (
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
                        placeholder=""
                        name="department"
                        className="placeholder:opacity-100"
                        containerProps={{
                          className: "!min-w-full",
                        }}
                        labelProps={{
                          className: "hidden",
                        }}
                        onChange={(selectedOption) => {
                          const event = {
                            target: {
                              name: "department",
                              value: selectedOption,
                            },
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
                  )}
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
        <DialogBody>{editingEntry?.email}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleDeleteDialogOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={_onDelete}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default UsersManagement;

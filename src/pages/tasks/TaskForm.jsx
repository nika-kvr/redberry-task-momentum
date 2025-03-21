import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../assets/TaskForm.css";
import "../../assets/Selectfield.css";
import SelectField from "../components/Selectfield.jsx";
import {
  GetDepartments,
  GetEmployees,
  GetPriorities,
  GetStatuses,
  PostTask,
} from "./Requests.jsx";
import dayjs from "dayjs";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  due_date: yup
    .date()
    .min(new Date(), "არ უნდა შეიძლებოდეს წარსული თარიღი")
    .required("სავალდებულო"),
  name: yup
    .string()
    .min(3, "მინიმუმ 2 სიმბოლო")
    .max(255, "მინიმუმ 2 სიმბოლო")
    .required("სავალდებულო"),
  description: yup
    .string()
    .test("word-count", "მინიმუმ 4 სიტყვა (თუ ჩაიწერა რაიმე)", (value) => {
      if (value && value.length > 0) {
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount >= 4;
      }
      return true;
    })
    .max(255, "მინიმუმ 2 სიმბოლო"),
  status_id: yup.string().required("სავალდებულო"),
  employee_id: yup.string().required("სავალდებულო"),
  priority_id: yup.string().required("სავალდებულო"),
});

const TaskForm = ({ toggleModal }) => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    const fetchData = async () => {
      const departments = await GetDepartments();
      const employees = await GetEmployees();
      const priorities = await GetPriorities();
      const statuses = await GetStatuses();

      setPriorities(priorities);
      setDepartments(departments);
      setEmployees(employees);
      setStatuses(statuses);
      if (localStorage.getItem("priority")) {
        const priority = JSON.parse(localStorage.getItem("priority"));
        setSelectedPrio(priority);
        setValue("priority_id", priority.id);
      } else {
        setSelectedPrio(priorities[1]);
        setValue("priority_id", priorities[1].id);
      }
      await trigger();
    };
    fetchData();

    const savedName = localStorage.getItem("name");
    const savedDescription = localStorage.getItem("description");
    const savedDue_date = localStorage.getItem("due_date");
    const savedStatus = JSON.parse(localStorage.getItem("status"));
    const savedEmployee = JSON.parse(localStorage.getItem("employee"));
    const savedPriority = localStorage.getItem("priority_id");

    savedName !== null && setValue("name", savedName);
    savedDescription !== null && setValue("description", savedDescription);
    savedDue_date !== null && setValue("due_date", savedDue_date);
    if (savedDue_date !== null) {
      setValue("due_date", savedDue_date);
      setSelectedDate(savedDue_date);
    }
    if (savedStatus !== null) {
      setValue("status_id", savedStatus.id);
      setSelectedStatus(savedStatus);
    }
    if (savedEmployee !== null) {
      setValue("employee_id", savedEmployee.id);
      setSelectedEmp(savedEmployee);
    }
  }, [setValue]);

  const navigate = useNavigate();

  const [selectedDep, setSelectedDep] = useState("");
  const [selectedEmp, setSelectedEmp] = useState({});
  const [selectedPrio, setSelectedPrio] = useState({});
  const [selectedStatus, setSelectedStatus] = useState({});

  const [departments, setDepartments] = useState([]);
  const [filteredEmps, setFilteredEmps] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [statuses, setStatuses] = useState([]);

  const [selectedDate, setSelectedDate] = useState(
    dayjs().add(1, "day").format("YYYY-MM-DD")
  );
  const watchAndSaveToLocalStorage = (field) => {
    useEffect(() => {
      const value = watch(field);
      if (value !== undefined) {
        localStorage.setItem(field, value);
      }
    }, [watch(field), field]);
  };

  watchAndSaveToLocalStorage("name");
  watchAndSaveToLocalStorage("due_date");
  watchAndSaveToLocalStorage("description");

  // validations
  const [nameMinError, setNameMinError] = useState(null);
  const [nameMaxError, setNameMaxError] = useState(null);
  const [descMinWordsError, setDescMinWordsError] = useState(null);
  const [descMaxError, setDescMaxError] = useState(null);
  const [dateError, setDateError] = useState(null);

  const isNameMin = (value) => {
    value && value.length >= 3 ? setNameMinError(false) : setNameMinError(true);
    return value && value >= 3;
  };

  const isNameMax = (value) => {
    value.length <= 255 ? setNameMaxError(false) : setNameMaxError(true);
    return value && value <= 255;
  };

  const isDescMinWords = (value) => {
    if (value.length > 0) {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount >= 4) {
        setDescMinWordsError(false);
        return true;
      } else {
        setDescMinWordsError(true);
        return false;
      }
    }
    setDescMinWordsError(false);
    return true;
  };
  const isDescMax = (value) => {
    if (value.length === 0) {
      setDescMaxError(false);
      return true;
    }
    if (value.length <= 255) {
      setDescMaxError(false);
      return true;
    }
    setDescMaxError(true);
    return false;
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    isNameMin(value);
    isNameMax(value);
  };
  const handleDescChange = (e) => {
    const value = e.target.value;
    isDescMinWords(value);
    isDescMax(value);
  };

  const handleDateChange = async (e) => {
    const { value } = e.target;
    const formattedDate = dayjs(value).format("YYYY-MM-DD");
    setSelectedDate(formattedDate);
    setValue("due_date", formattedDate);
    trigger();
  };

  const departmentChange = (option) => {
    const filteredEmployees = employees.filter((employee) => {
      return employee.department.id === option.id;
    });
    setSelectedDep(option);
    setFilteredEmps(filteredEmployees);
    setSelectedEmp({});
    setValue("employee_id", "");
    localStorage.removeItem("employee");
    localStorage.setItem("department", JSON.stringify(option));
    trigger();
  };

  const employeeChange = (option) => {
    setValue("employee_id", option.id);
    setSelectedEmp(option);
    localStorage.setItem("employee", JSON.stringify(option));
    trigger();
  };
  const prioritiesChange = (option) => {
    setValue("priority_id", option.id);
    setSelectedPrio(option);
    localStorage.setItem("priority", JSON.stringify(option));
    trigger();
  };
  const statusesChange = (option) => {
    setValue("status_id", option.id);
    setSelectedStatus(option);
    localStorage.setItem("status", JSON.stringify(option));
    trigger();
  };

  const onSubmit = async (data) => {
    try {
      const res = await PostTask(data);
      if (res.status === 201) {
        const keysToRemove = [
          "name",
          "department",
          "description",
          "due_date",
          "employee",
          "priority",
          "status",
        ];
        keysToRemove.forEach((key) => localStorage.removeItem(key));
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="taskForm-main-div">
      <h1>შექმენი ახალი დავალება</h1>
      <div className="taskForm-div">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-name-div form-name-div-task">
            <div className="inside-form-div task-form">
              <h3>სათაური*</h3>
              <input
                {...register("name", { onChange: handleNameChange })}
                type="text"
                className="form-input satauri"
                style={{
                  borderColor: nameMinError || nameMaxError ? "red" : "#CED4DA",
                }}
              />
              <span
                style={{
                  color: nameMinError
                    ? "red"
                    : nameMinError === null
                    ? "gray"
                    : "green",
                }}
              >
                მინიმუმ 3 სიმბოლო
              </span>
              <span
                style={{
                  color: nameMaxError
                    ? "red"
                    : nameMaxError === null
                    ? "gray"
                    : "green",
                }}
              >
                მაქსიმუმ 255 სიმბოლო
              </span>
            </div>
            <div className="inside-form-div task-form">
              <h3>დეპარტამენტი*</h3>
              <div>
                <SelectField
                  selected={selectedDep}
                  onChange={departmentChange}
                  options={departments}
                />
              </div>
            </div>
          </div>
          <div className="form-name-div form-name-div-task">
            <div className="inside-form-div">
              <h3>აღწერა</h3>
              <textarea
                {...register("description", { onChange: handleDescChange })}
                className="text-area"
              />
              <span
                style={{
                  color: descMinWordsError
                    ? "red"
                    : descMinWordsError === null
                    ? "gray"
                    : "green",
                }}
              >
                მინიმუმ 4 სიტყვა (თუ ჩაიწერა რაიმე)
              </span>
              <span
                style={{
                  color: descMaxError
                    ? "red"
                    : descMaxError === null
                    ? "gray"
                    : "green",
                }}
              >
                მაქსიმუმ 255 სიტყვა (თუ ჩაიწერა რაიმე)
              </span>
            </div>
            <div className="inside-form-div">
              <h3 style={{ color: !selectedDep.name && "#ADB5BD" }}>
                პასუხისმგებელი თანამშრომელი*
              </h3>
              <input
                {...register("employee_id")}
                hidden
                value={selectedEmp?.id || ""}
              />
              <div>
                <SelectField
                  toggleModal={toggleModal}
                  emp={true}
                  selected={selectedEmp}
                  onChange={employeeChange}
                  options={filteredEmps}
                />
              </div>
            </div>
          </div>
          <div
            style={{ gap: "31px" }}
            className="form-name-div form-name-div-task"
          >
            <div className="inside-form-div">
              <h3>პრიორიტეტი*</h3>
              <div>
                <input
                  {...register("priority_id")}
                  hidden
                  value={selectedPrio?.id || ""}
                />
                <SelectField
                  width={"small"}
                  selected={selectedPrio}
                  onChange={prioritiesChange}
                  options={priorities}
                />
              </div>
            </div>
            <div className="inside-form-div">
              <h3>სტატუსი*</h3>
              <div>
                <input
                  {...register("status_id")}
                  hidden
                  value={selectedStatus?.id || ""}
                />
                <SelectField
                  width={"small"}
                  selected={selectedStatus}
                  onChange={statusesChange}
                  options={statuses}
                />
              </div>
            </div>
            <div className="inside-form-div calendar-div">
              <h3>დედლაინი</h3>
              <div>
                <input
                  {...register("due_date")}
                  onChange={handleDateChange}
                  value={selectedDate}
                  className="form-input "
                  type="date"
                />
              </div>
            </div>
          </div>
          <div className="task-btn-div">
            <button
              style={{
                backgroundColor: !isValid ? "#B588F4" : "#8338EC",
                borderColor: !isValid ? "#B588F4" : "#8338EC",
                cursor: !isValid ? "auto" : "pointer",
              }}
              type="submit"
              className="purple-btn"
            >
              დავალების შექმნა
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;

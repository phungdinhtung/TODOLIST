import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { v4 as uuidv4 } from "uuid";

import { Task } from "../../../interfaces/task";

import TaskForm from "../components/TaskForm";
import ToDoList from "../components/ToDoList";

import { setAlert, setLoading } from "../../../redux/commons";

import {
  setTasksInLocalStorage,
  getTasks,
} from "../../../services/taskLocalStorage";
import { useDispatch } from "react-redux";
import { AlertTypes } from "../../../interfaces/commons";

const initTask: Task = {
  title: "",
  startDate: new Date(),
  description: "",
  piority: { value: "normal", label: "Normal" },
};
const TaskContainer = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState<string>("");
  const [taskList, setTaskList] = useState<Task[]>([]);

  const addTask = (newTask: Task) => {
    dispatch(setLoading(true));
    const id = uuidv4();
    let newTasks = [
      ...taskList,
      { ...newTask, id: id, isOpenToggle: false, isChecked: false },
    ];
    setTasksInLocalStorage(newTasks);
    setTaskList([...newTasks]);

    dispatch(setLoading(false));
    dispatch(
      setAlert({
        type: AlertTypes.Success,
        message: "Add success",
      })
    );
  };

  useEffect(() => {
    let tasksLocalStorage = formatDate(getTasks());
    if (!!tasksLocalStorage) {
      setTaskList([...tasksLocalStorage]);
    }
  }, []);

  const formatDate = (tasks: Task[]) => {
    for (let task of tasks) {
      task.startDate = new Date(task.startDate);
    }
    return tasks;
  };

  return (
    <div className="task-container my-4">
      <Row className="row-format h-100">
        <Col md={6} xs={12} className="task-form-container">
          <TaskForm task={initTask} onSave={addTask} />
        </Col>
        <Col md={6} xs={12} className="to-do-container">
          <ToDoList
            search={search}
            setSearch={setSearch}
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </Col>
      </Row>
    </div>
  );
};

export default TaskContainer;

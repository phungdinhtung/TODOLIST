import React, { FC, useEffect, useCallback } from "react";
import { Input, Label } from "reactstrap";
import { Collapse } from "reactstrap";

import { Task } from "../../../interfaces/task";
import TaskForm from "./TaskForm";
import {
  getTasks,
  setTasksInLocalStorage,
} from "../../../services/taskLocalStorage";

import { setAlert, setLoading, setModal } from "../../../redux/commons";
import { useDispatch } from "react-redux";
import { AlertTypes } from "../../../interfaces/commons";

interface Props {
  search: string;
  setSearch: (search: string) => void;
  taskList: Task[];
  setTaskList: (tasks: Task[]) => void;
}

const ToDoList: FC<Props> = ({ search, setSearch, taskList, setTaskList }) => {
  const dispatch = useDispatch();

  const onChangeTaskToggle = (task: Task) => {
    let index = taskList.findIndex((t) => t.id === task.id);
    if (index > -1) {
      setTaskList([
        ...taskList.slice(0, index),
        { ...taskList[index], isOpenToggle: !taskList[index].isOpenToggle },
        ...taskList.slice(index + 1),
      ]);
    }
  };

  const updateTask = (task: Task) => {
    dispatch(setLoading(true));

    let index = taskList.findIndex((t) => t.id === task.id);
    if (index > -1) {
      const newTasks = [
        ...taskList.slice(0, index),
        { ...task },
        ...taskList.slice(index + 1),
      ];
      setTaskList([...newTasks]);
      setTasksInLocalStorage(newTasks);
    }

    dispatch(setLoading(false));
    dispatch(
      setAlert({
        type: AlertTypes.Success,
        message: "Update success",
      })
    );
  };

  const deleteTask = (task: Task) => {
    dispatch(
      setModal({
        isOpen: true,
        type: AlertTypes.Warning,
        message: "Do you want to remove this item?",
        onConfirm: () => {
          let index = taskList.findIndex((t) => t.id === task.id);
          if (index > -1) {
            const newTasks = [
              ...taskList.slice(0, index),
              ...taskList.slice(index + 1),
            ];
            setTaskList([...newTasks]);
            setTasksInLocalStorage(newTasks);

            dispatch(
              setAlert({
                type: AlertTypes.Success,
                message: "Delete success",
              })
            );
          }
        },
      })
    );
  };

  const deleteTasks = () => {
    dispatch(
      setModal({
        isOpen: true,
        type: AlertTypes.Warning,
        message: "Do you want to remove items?",
        onConfirm: () => {
          const newTasks = taskList.filter((task) => !task.isChecked);
          setTaskList([...newTasks]);
          setTasksInLocalStorage(newTasks);

          dispatch(
            setAlert({
              type: AlertTypes.Success,
              message: "Delete success",
            })
          );
        },
      })
    );
  };

  const onChangeTaskCheck = (task: Task, checked: boolean) => {
    let index = taskList.findIndex((t) => t.id === task.id);
    if (index > -1) {
      setTaskList([
        ...taskList.slice(0, index),
        { ...taskList[index], isChecked: checked },
        ...taskList.slice(index + 1),
      ]);
    }
  };

  const filterTasks = useCallback(() => {
    let tasksLocalStorage = formatDate(getTasks());
    let newTaskList = tasksLocalStorage.filter((task) =>
      task.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    );
    setTaskList([...newTaskList]);
  }, [search]);

  const formatDate = (tasks: Task[]) => {
    for (let task of tasks) {
      task.startDate = new Date(task.startDate);
    }
    return tasks;
  };

  useEffect(() => {
    filterTasks();
  }, [search]);

  const showBulkAction = () => {
    let index = taskList.findIndex((task) => task.isChecked);
    return index > -1;
  };

  return (
    <div>
      <Label className="label-task">To Do List</Label>
      <Input
        value={search}
        placeholder="Search..."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            // filterTask()
          }
        }}
      />
      <div className="list-task">
        {!!taskList &&
          taskList.map((task) => (
            <div key={task.id} className="task-item-container pt-3">
              <div className="task-item">
                <div>
                  <Input
                    type="checkbox"
                    checked={task.isChecked}
                    onChange={(e) => {
                      onChangeTaskCheck(task, e.target.checked);
                    }}
                  />
                  <span className="task-title">{task.title}</span>
                </div>
                <div className="btn-action">
                  <div
                    className="btn-detail"
                    onClick={() => {
                      onChangeTaskToggle(task);
                    }}
                  >
                    Detail
                  </div>
                  <div
                    className="btn-remove"
                    onClick={() => {
                      deleteTask(task);
                    }}
                  >
                    Remove
                  </div>
                </div>
              </div>
              <Collapse isOpen={task.isOpenToggle} className="task-edit">
                <TaskForm task={task} onSave={updateTask} />
              </Collapse>
            </div>
          ))}
      </div>
      {showBulkAction() && (
        <div className="bulk-action-container">
          <span>Bulk Action:</span>
          <div className="btn-action">
            <div className="btn-detail" onClick={() => {}}>
              Done
            </div>
            <div className="btn-remove" onClick={deleteTasks}>
              Remove
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToDoList;

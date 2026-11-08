'use client';

import { useEffect, useState } from "react";
import { Toggle } from "@/components/tailgrids/core/toggle";

import {
  NativeSelect,
  NativeSelectOption
} from "@/components/tailgrids/core/native-select";

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow
} from "@/components/tailgrids/core/table";
import { Pagination } from "@/components/tailgrids/core/pagination";
import { Spinner } from "@/components/tailgrids/core/spinner";
import {
  Dialog,
  DialogBody,
  DialogClose,
  
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/tailgrids/core/dialog";
import { Input } from "@/components/tailgrids/core/input";
import { Label } from "@/components/tailgrids/core/label";
import { Backdrop, OverlayWrapper } from "@/components/tailgrids/core/overlay";
import { TextArea } from "@/components/tailgrids/core/text-area";
import { TextField } from "@/components/tailgrids/core/text-field";
import { Badge } from "@/components/tailgrids/core/badge";
import { Button } from "@/components/tailgrids/core/button";
import { Check, ClockThree, Plus, Trash1 } from "@tailgrids/icons";

import { fetchTodos } from "@/data/todos";
import type { TodoType } from "@/data/todos";


export default function page() {
  const [isLoading, setIsLoading] = useState(true);
const [showDialog, setShowDialog] = useState<boolean>(false);
  const [todosRaw, setTodosRaw] = useState<TodoType[]>([]);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [onlyWaiting, setOnlyWaiting] = useState<boolean>(false);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const [totalPages, setTotalPages] = useState<number>(3);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // onload
  useEffect(() => {
    
    fetchTodos()
      .then((data) => setTodosRaw(data as TodoType[]))
      .catch(() => setTodosRaw([]))
      .finally(() => setIsLoading(false));
  }, []);


  //todoRaw onlyWaiting =>[]=> todos
  useEffect(() => {
    onlyWaiting
      ? setTodos(todosRaw.filter((todo) => todo.completed === false))
      : setTodos(todosRaw);

  }, [todosRaw, onlyWaiting]);

  // todos, itemsPerPage => [] => totalPages
  useEffect(() => {
    setTotalPages(Math.ceil(todos.length / itemsPerPage));
  }, [todos, itemsPerPage]);


  // totalPages => currentPage
  useEffect(() => {
    if (totalPages > 0) {
      if (currentPage < 0) setCurrentPage(1);
      else if (currentPage > totalPages) setCurrentPage(totalPages);
    }
  }, [totalPages]);


  // delete
  const deleteTodo = (id: number) => {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  };


  
  // make done
  const makeDone = (id: number) => {
    // console.log(`make todo done ... (${id})`);

    // if
    if (!todosRaw.find((todo) => todo.id === id)) return;

    // pointer 'selected'
    const selected = todosRaw.find((todo) => {
      return todo.id === id;
    });

    // edit
    selected!.completed = true;
    console.log(selected);

    // update state (setter)
    setTodosRaw([...todosRaw]);
  };


  
  //add new todo
  const addTodo = () => {
    const idDom = document.getElementById('id') as HTMLInputElement;
    const titleDom = document.getElementById('title') as HTMLInputElement;

    // validate
    const titleStr = titleDom.value.trim();
    if (titleStr === '') return;

    const newTodo: TodoType = {
      userId: 1,
      id: Number(idDom.value),
      title: titleStr,
      completed: false,
    };

    setTodosRaw([...todosRaw, newTodo]);
  };

  // cancel new todo
  const cancelAddTodo = () => {
    console.log("cancel add todo");
  };

 


  return (
    <>
    // todos container

    <div className="mt-4 px-2 max-w-3xl mx-auto ">
      {/* controller */}
      <div className="flex justify-between">
        {/* toggle */}
        <div className="flex items-center">
          <Toggle
            label="Show only"
            checked={onlyWaiting}
            onChange={(e) => setOnlyWaiting(e.target.checked)}
          />
          &nbsp;
          <Button
            size="sm"
            className="h-8 p-2 bg-yellow-400 pointer-events-none"
          >
            Waiting
            <ClockThree />
          </Button>
        </div>


        {/* dropdown */}
        <div className="w-1/3">

          <NativeSelect
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          >
            <NativeSelectOption value={5}>5 items per page</NativeSelectOption>
            <NativeSelectOption value={10}>10 items per page</NativeSelectOption>
            <NativeSelectOption value={50}>50 items per page</NativeSelectOption>
          </NativeSelect>
        </div>
      </div>



      {/* table */}

      <div className="mt-2">
        <TableRoot>
          <TableHeader>
            <TableRow className='bg-black text-white'>
              <TableHead className='w-24 font-bold text-right' >ID</TableHead>
              <TableHead className='font-bold text-center' >Title</TableHead>
              <TableHead className='font-bold flex justify-end items-center gap-2' >
                Completed
                <Button
                  variant={'primary'}
                  className='h-8 p-2'
                  onClick={() => setShowDialog(true)}
                >
                  <Plus />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>

          {/* show spinner while loading */}
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Spinner className="mx-auto" />
                </TableCell>
              </TableRow>
            )}


            {!isLoading && todos.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-red-500">
                  No data, may be connection refused (reload again)
                </TableCell>
              </TableRow>
            )}


            {/* render data */}

            {todos
              .filter((todo, index) => {
                const lower = (currentPage - 1) * itemsPerPage 
                const upper = currentPage * itemsPerPage -1;

                return index >= lower && index <= upper;
              })
              .
              
              
              
              
              map((todo) => {

              return (
              <TableRow key={todo.id}>
              <TableCell className='text-right'>
                <Badge size={'lg'} className='rounded-lg bg-gray-500 text-white font-bold'
                >{todo.id}
                </Badge>
              </TableCell>
              <TableCell >{todo.title}</TableCell>
              <TableCell className='flex justify-end gap-1'>
                
                
                
                {todo.completed ? 

                <Button size="sm" className="h-8 p-2 bg-green-700 text-white pointer-events-none">
                  Done
                  <Check />
                </Button>

:

                  <Button
                    size="sm"
                    className="h-8 p-2 bg-yellow-500 text-white hover:bg-yellow-700 hover:text-yellow-200"
                    onClick={() => makeDone(todo.id)}
                  >
                  Waiting
                  <ClockThree />
                </Button>}


               






                <Button
                  variant="danger"
                  size="sm"
                  className="h-8 w-8 bg-red-600 p-0 text-white"
                  onClick={() => deleteTodo(todo.id)}
                >
                  <Trash1 />
                </Button>
              </TableCell>
            </TableRow>
              )
      })}
            
            
            
            
            {/* completed = false */}
            {/* <TableRow >
              <TableCell className='text-right'>
                <Badge size={'lg'} className='rounded-lg bg-gray-500 text-white font-bold'
                >12
                </Badge>
              </TableCell>
              <TableCell >csi208-w12</TableCell>
              <TableCell className='flex justify-end gap-1'>
                <Button size="sm" className="h-8 p-2 bg-yellow-500 text-white pointer-events-none">
                  Waiting
                  <ClockThree />
                </Button>
                <Button size="sm" className="h-8 w-8 bg-red-600 p-0 text-white">
                  <Trash1 />
                </Button>
              </TableCell>
            </TableRow> */}




            {/* completed = true */}
            {/* <TableRow >
              <TableCell className='text-right'>
                <Badge size={'lg'} className='rounded-lg bg-gray-500 text-white font-bold'
                >77
                </Badge>
              </TableCell>
              <TableCell >csi205-wo7</TableCell>
              <TableCell className='flex justify-end gap-1'>
                <Button size="sm" className="h-8 p-2 bg-green-700 text-white pointer-events-none">
                  Done
                  <Check />
                </Button>
                <Button size="sm" className="h-8 w-8 bg-red-600 p-0 text-white">
                  <Trash1 />
                </Button>
              </TableCell>
            </TableRow> */}






          </TableBody>
        </TableRoot>
      </div>
      {/* pagination */}
      { todos.length > 0 && (
        <div className="mt-1 w-1/3 mx-auto flex justify-center items-center gap-1">
          <Button
            size="sm"
            appearance="outline"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            First
          </Button>

        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            sideLayout="icon"
          />
        </div>

        <Button
          size="sm"
          appearance="outline"
          onClick={() => setCurrentPage(totalPages)}
          disabled ={currentPage === totalPages}
        >
          Last
        </Button>
      </div>)}
    </div>


     <Backdrop isOpen={showDialog} onOpenChange={setShowDialog}>
        <Dialog>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Plus className="bg-blue-100 rounded-md" size={2} /> New todo
            </DialogTitle>
            
          </DialogHeader>

          <DialogBody>
            <form className="flex flex-col gap-4">
              <TextField className="flex flex-col gap-1.5">
                <Label className="font-bold">ID (Auto)</Label>
                <Input
                
                  className="w-full pointer-events-none bg-gray-100 text-gray-400"
                  value={todosRaw.reduce((p, t) => (t.id > p ? t.id : p), 0) + 1}
                  id="id"
                />
              </TextField>

              <TextField className="flex flex-col gap-1.5">
                <Label className="font-bold">Title</Label>
                <Input
                  autoFocus
                  placeholder="ใส่งานที่ต้องการเพิ่ม"
                  className="w-full"
                  id="title"
                />
              </TextField>

              
            </form>
          </DialogBody>

          <DialogFooter>
            <DialogClose
              appearance="outline"
              onClick={() => cancelAddTodo()}
            >
              Cancel
            </DialogClose>
            <DialogClose onClick={() => addTodo()}>Add todo</DialogClose>
          </DialogFooter>
        </Dialog>
      </Backdrop>
      
      </>
  )
  
}

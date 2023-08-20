import React from 'react';

const AddTask = ({ comp_st, edit }) => {
  const handleAddTaskClick = () => {
    edit[1](false,{
      id: '',
      name: '',
      details: '',
      scheduled_for: '',
      tags: '',
      completed: '',
      removed: ''
    });
    comp_st[1](true);
    document.querySelector('footer').classList.add('focus_out');
  }

  return (
    <button id="add_task" onClick={() => handleAddTaskClick()}>
      <abbr title="Add-Task"><i className="fa-solid fa-plus"></i></abbr>
    </button>
  );
}

export default AddTask;
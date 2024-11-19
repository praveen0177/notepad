document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector(".menu");
    const fileSection = document.querySelector(".file");
    const editor = document.querySelector(".editor");
    const noteList = document.getElementById("note-list");
    const noteTitle = document.getElementById("note-title");
    const noteContent = document.getElementById("note-content");
  
    let notes = JSON.parse(localStorage.getItem("notepad")) || [];
    let currentNote = null;
  
    function showMenu() {
      menu.classList.remove("hidden");
      fileSection.classList.add("hidden");
      editor.classList.add("hidden");
    }
  
    function showFiles() {
      menu.classList.add("hidden");
      fileSection.classList.remove("hidden");
      editor.classList.add("hidden");
      renderNoteList();
    }
  
    function showEditor(note = { id: Date.now(), title: "", content: "" }) {
      currentNote = note;
      menu.classList.add("hidden");
      fileSection.classList.add("hidden");
      editor.classList.remove("hidden");
      noteTitle.value = note.title;
      noteContent.value = note.content;
    }
  
    function renderNoteList() {
      noteList.innerHTML = "";
      notes.forEach((note) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <span>${note.title || "Untitled Note"}</span>
          <button data-id="${note.id}" class="btn btn-danger">Delete</button>
        `;
        li.querySelector(".btn-danger").addEventListener("click", () => {
          deleteNote(note.id);
        });
        li.addEventListener("click", () => showEditor(note));
        noteList.appendChild(li);
      });
    }
  
    function saveNote() {
      currentNote.title = noteTitle.value;
      currentNote.content = noteContent.value;
  
      const index = notes.findIndex((note) => note.id === currentNote.id);
      if (index === -1) {
        notes.push(currentNote);
      } else {
        notes[index] = currentNote;
      }
  
      localStorage.setItem("notepad", JSON.stringify(notes));
      showMenu();
    }
  
    function deleteNote(id) {
      notes = notes.filter((note) => note.id !== id);
      localStorage.setItem("notepad", JSON.stringify(notes));
      renderNoteList();
    }
  
    document.getElementById("create-note").addEventListener("click", () => showEditor());
    document.getElementById("view-notes").addEventListener("click", showFiles);
    document.getElementById("back-menu").addEventListener("click", showMenu);
    document.getElementById("save-note").addEventListener("click", saveNote);
    document.getElementById("cancel-edit").addEventListener("click", showMenu);
  
    showMenu();
  });
  
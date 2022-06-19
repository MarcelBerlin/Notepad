let titles = [];
let notes = [];

let archivetitles = [];
let archivenotes = [];

load();


/* Website neu laden */

function render() {
    let mynotes = document.getElementById('mynotes');
    mynotes.innerHTML = '';

    for (let i = 0; i < notes.length; i++) {
        const title = titles[i];
        const note = notes[i];
        mynotes.innerHTML += /*html*/ `
        <div class="post">
            <b>${title}</b>
            ${note}<br><br>
            <div><img class="trash-bg" onclick="deleteNote(${i})" src="img/trash-small.png"> <img class="archive-bg" onclick="archivateNote(${i})" src="img/archive-small.png"></div>
            </div>       
        `;

    }

    document.getElementById('title').value = '';
    document.getElementById('note').value = '';


}

//##################################################



/* Neue Notiz hinzufügen */

function addNote() {

    if (notes.length <= 11) {
        let title = document.getElementById('title').value;
        let note = document.getElementById('note').value;
        titles.push(title);
        notes.push(note);

        let mynotes = document.getElementById('block');
        mynotes.innerHTML = '';


        save();
        render();

    } else {
        alert('Bitte zuerst eine Notiz löschen!')
    }

}

//##################################################



/* Eingabefeldkontrolle */

function inputControl() {

    let title = document.getElementById('title').value;
    let note = document.getElementById('note').value;

    if (title == '' || note == '') {
        alert('Bitte beide Felder ausfüllen!!')
    } else {
        addNote()
    }

}

//##################################################



/* Notiz löschen */

function deleteNote(i) {
    titles.splice(i, 1);
    notes.splice(i, 1);

    render();
    save();

}

function deleteArchiveNote(i) {
    archivetitles.splice(i, 1);
    archivenotes.splice(i, 1);

    save();
    renderArchive();

}




//##################################################



/* Notiz im localStorage speichern */

function save() {
    titlesAsText = JSON.stringify(titles);
    notesAsText = JSON.stringify(notes);

    archivetitleAsText = JSON.stringify(archivetitles);
    archivenotesAsText = JSON.stringify(archivenotes);

    localStorage.setItem('titles', titlesAsText);
    localStorage.setItem('notes', notesAsText);

    localStorage.setItem('archivetitles', archivetitleAsText);
    localStorage.setItem('archivenotes', archivenotesAsText);

}

//##################################################



/* Notiz aus dem localStorage laden */

function load() {
    let titlesAsText = localStorage.getItem('titles');
    let notesAsText = localStorage.getItem('notes');

    let archivetitleAsText = localStorage.getItem('archivetitles');
    let archivenotesAsText = localStorage.getItem('archivenotes');

    if (titlesAsText && notesAsText) {
        titles = JSON.parse(titlesAsText);
        notes = JSON.parse(notesAsText);
    }

    if (archivetitleAsText && archivenotesAsText) {
        archivetitles = JSON.parse(archivetitleAsText);
        archivenotes = JSON.parse(archivenotesAsText);

    }

}

//##################################################

/* Archiv rendern */

function renderArchive() {
    let myarchive = document.getElementById('myarchive');
    myarchive.innerHTML = '';

    for (let i = 0; i < archivenotes.length; i++) {
        const archivetitle = archivetitles[i];
        const archivenote = archivenotes[i];

        myarchive.innerHTML += /*html*/ `
        <div class="archive-post">
            <b>${archivetitle}</b><br>
            ${archivenote}<br><br>
            <div>
            <img class="trash-img archivebuttons" onclick="deleteArchiveNote(${i})" src="img/trash-small.png"> 
            <img class="restore-img archivebuttons" onclick="restoreNote(${i})" src="img/history.png">
            </div>
            </div>       
                
        </div>
        
        `;

    }


}


/* ARCHIVIEREN */

function archivateNote(i) {
    archivetitles.push(titles[i]);
    archivenotes.push(notes[i]);
    titles.splice(i, 1);
    notes.splice(i, 1);

    render();
    save();

}

function restoreNote(i) {
    titles.push(archivetitles[i]);
    notes.push(archivenotes[i]);
    archivetitles.splice(i, 1);
    archivenotes.splice(i, 1);

    render();
    save();
    renderArchive();

}


/* Archiv öffnen */

function openArchive() {
    document.getElementById('archive').classList.remove('d-none');

    renderArchive();

}

//##################################################



/* Archiv schließen */

function closeArchive() {
    document.getElementById('archive').classList.add('d-none');

    renderArchive();
}

//##################################################

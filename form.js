document.addEventListener('DOMContentLoaded', () => {
    // --- Event Listeners ---
    document.getElementById('add-experience').addEventListener('click', addExperienceField);
    document.getElementById('add-education').addEventListener('click', addEducationField);
    document.getElementById('cv-form').addEventListener('submit', handleFormSubmit);
    document.getElementById('photo').addEventListener('change', previewPhoto);
    document.querySelector('.photo-preview-container').addEventListener('click', () => {
        document.getElementById('photo').click();
    });


    document.getElementById('clear-data').addEventListener('click', clearData);

    loadDataFromStorage();
});

function clearData() {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
        localStorage.removeItem('cvData');
        document.getElementById('cv-form').reset();

        // Reset dynamic lists
        document.getElementById('experience-list').innerHTML = '';
        addExperienceField();

        document.getElementById('education-list').innerHTML = '';
        addEducationField();

        // Reset photo preview
        document.getElementById('photo-preview').src = 'https://i.imgur.com/8bX5tjO.png';

        alert('All data has been cleared.');
    }
}

function addExperienceField() {
    const list = document.getElementById('experience-list');
    const entry = document.createElement('div');
    entry.classList.add('dynamic-entry');
    entry.innerHTML = `
        <div class="grid-col-2">
            <input type="text" class="exp-position" placeholder="Position" required>
            <input type="text" class="exp-company" placeholder="Company" required>
        </div>
        <input type="text" class="exp-duration" placeholder="e.g., Oct 2024 - Present" style="margin-top: 10px;">
        <textarea class="exp-description" placeholder="Describe your role and accomplishments..." style="margin-top: 10px;"></textarea>
        <button type="button" class="btn-remove"><i class="fas fa-trash-alt"></i></button>
    `;
    list.appendChild(entry);
    entry.querySelector('.btn-remove').addEventListener('click', () => entry.remove());
}

function addEducationField() {
    const list = document.getElementById('education-list');
    const entry = document.createElement('div');
    entry.classList.add('dynamic-entry');
    entry.innerHTML = `
        <div class="grid-col-2">
            <input type="text" class="edu-degree" placeholder="Degree (e.g., Bachelor of Science)" required>
            <input type="text" class="edu-institution" placeholder="Institution" required>
        </div>
        <input type="text" class="edu-duration" placeholder="e.g., 2020 - 2024" style="margin-top: 10px;">
        <button type="button" class="btn-remove"><i class="fas fa-trash-alt"></i></button>
    `;
    list.appendChild(entry);
    entry.querySelector('.btn-remove').addEventListener('click', () => entry.remove());
}

function previewPhoto(event) {
    const reader = new FileReader();
    reader.onload = function () {
        const preview = document.getElementById('photo-preview');
        preview.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const photoFile = document.getElementById('photo').files[0];
    let photoData = document.getElementById('photo-preview').src;

    if (photoFile) {
        photoData = await toBase64(photoFile);
    }

    const experience = Array.from(document.querySelectorAll('#experience-list .dynamic-entry')).map(entry => ({
        position: entry.querySelector('.exp-position').value,
        company: entry.querySelector('.exp-company').value,
        duration: entry.querySelector('.exp-duration').value,
        description: entry.querySelector('.exp-description').value,
    }));

    const education = Array.from(document.querySelectorAll('#education-list .dynamic-entry')).map(entry => ({
        degree: entry.querySelector('.edu-degree').value,
        institution: entry.querySelector('.edu-institution').value,
        duration: entry.querySelector('.edu-duration').value,
    }));

    const cvData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        summary: document.getElementById('summary').value,
        skills: document.getElementById('skills').value,
        languages: document.getElementById('languages').value,
        photo: photoData,
        experience,
        education,
    };

    localStorage.setItem('cvData', JSON.stringify(cvData));
    window.location.href = 'cv.html';
}

function loadDataFromStorage() {
    const cvData = JSON.parse(localStorage.getItem('cvData'));
    if (!cvData) {
        addExperienceField();
        addEducationField();
        return;
    }

    document.getElementById('name').value = cvData.name || '';
    document.getElementById('email').value = cvData.email || '';
    document.getElementById('phone').value = cvData.phone || '';
    document.getElementById('location').value = cvData.location || '';
    document.getElementById('summary').value = cvData.summary || '';
    document.getElementById('skills').value = cvData.skills || '';
    document.getElementById('languages').value = cvData.languages || '';
    if (cvData.photo) {
        document.getElementById('photo-preview').src = cvData.photo;
    }

    const expList = document.getElementById('experience-list');
    expList.innerHTML = '';
    if (cvData.experience && cvData.experience.length > 0) {
        cvData.experience.forEach(exp => addExperienceFieldWithData(exp));
    } else {
        addExperienceField();
    }

    const eduList = document.getElementById('education-list');
    eduList.innerHTML = '';
    if (cvData.education && cvData.education.length > 0) {
        cvData.education.forEach(edu => addEducationFieldWithData(edu));
    } else {
        addEducationField();
    }
}

function addExperienceFieldWithData(exp) {
    const list = document.getElementById('experience-list');
    const entry = document.createElement('div');
    entry.classList.add('dynamic-entry');
    entry.innerHTML = `
        <div class="grid-col-2">
            <input type="text" class="exp-position" placeholder="Position" value="${exp.position || ''}" required>
            <input type="text" class="exp-company" placeholder="Company" value="${exp.company || ''}" required>
        </div>
        <input type="text" class="exp-duration" placeholder="e.g., Oct 2024 - Present" value="${exp.duration || ''}" style="margin-top: 10px;">
        <textarea class="exp-description" placeholder="Describe your role and accomplishments..." style="margin-top: 10px;">${exp.description || ''}</textarea>
        <button type="button" class="btn-remove"><i class="fas fa-trash-alt"></i></button>
    `;
    list.appendChild(entry);
    entry.querySelector('.btn-remove').addEventListener('click', () => entry.remove());
}

function addEducationFieldWithData(edu) {
    const list = document.getElementById('education-list');
    const entry = document.createElement('div');
    entry.classList.add('dynamic-entry');
    entry.innerHTML = `
        <div class="grid-col-2">
            <input type="text" class="edu-degree" placeholder="Degree (e.g., Bachelor of Science)" value="${edu.degree || ''}" required>
            <input type="text" class="edu-institution" placeholder="Institution" value="${edu.institution || ''}" required>
        </div>
        <input type="text" class="edu-duration" placeholder="e.g., 2020 - 2024" value="${edu.duration || ''}" style="margin-top: 10px;">
        <button type="button" class="btn-remove"><i class="fas fa-trash-alt"></i></button>
    `;
    list.appendChild(entry);
    entry.querySelector('.btn-remove').addEventListener('click', () => entry.remove());
}


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

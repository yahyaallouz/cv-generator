document.addEventListener('DOMContentLoaded', () => {
    // --- Load Data into Template ---
    const cvData = JSON.parse(localStorage.getItem('cvData'));

    if (cvData) {
        // Personal Info
        document.getElementById('preview-name').innerText = cvData.name;
        document.getElementById('preview-email').innerText = cvData.email;
        document.getElementById('preview-phone').innerText = cvData.phone;
        document.getElementById('preview-location').innerText = cvData.location;
        document.getElementById('preview-summary').innerText = cvData.summary;

        // Experience
        const expList = document.getElementById('preview-experience');
        expList.innerHTML = ''; // Clear existing
        cvData.experience.forEach(exp => {
            const entry = document.createElement('div');
            entry.classList.add('exp-entry');
            entry.innerHTML = `
                <h3>${exp.position}</h3>
                <div class="sub-header">${exp.company} (${exp.duration})</div>
                <p>${exp.description}</p>
            `;
            expList.appendChild(entry);
        });

        // Education
        const eduList = document.getElementById('preview-education');
        eduList.innerHTML = ''; // Clear existing
        cvData.education.forEach(edu => {
            const entry = document.createElement('div');
            entry.classList.add('edu-entry');
            entry.innerHTML = `
                <h3>${edu.degree}</h3>
                <div class="sub-header">${edu.institution} (${edu.duration})</div>
            `;
            eduList.appendChild(entry);
        });

        // Skills & Languages (as tags)
        populateTags('preview-skills', cvData.skills);
        populateTags('preview-languages', cvData.languages);

    } else {
        // No data, send back to form
        alert('No CV data found. Please fill out the form.');
        window.location.href = 'index.html';
    }

    // --- Button Event Listeners ---
    document.getElementById('edit-cv').addEventListener('click', () => {
        window.location.href = 'index.html'; // Go back to edit
    });

    document.getElementById('download-pdf').addEventListener('click', generatePDF);
});

function populateTags(elementId, commaSeparatedString) {
    const list = document.getElementById(elementId);
    list.innerHTML = '';
    const items = commaSeparatedString.split(',').filter(item => item.trim() !== '');
    items.forEach(item => {
        const tag = document.createElement('span');
        tag.innerText = item.trim();
        list.appendChild(tag);
    });
}

async function generatePDF() {
    const element = document.getElementById('cv-template');
    const cvData = JSON.parse(localStorage.getItem('cvData'));
    const fileName = cvData ? `${cvData.name.replace(/\s+/g, '_')}_CV.pdf` : 'resume.pdf';

    const { jsPDF } = window.jspdf;

    const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const doc = new jsPDF({
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
    });

    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = doc.internal.pageSize.getHeight();

    const imgProps = doc.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    if (imgHeight <= pdfHeight) {
        doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeight);
    } else {
        let heightLeft = imgHeight;
        let position = 0;

        doc.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position -= 297;
            doc.addPage();
            doc.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
        }
    }

    doc.save(fileName);
}
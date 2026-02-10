document.addEventListener('DOMContentLoaded', () => {
    // --- Load Data into Template ---
    const cvData = JSON.parse(localStorage.getItem('cvData'));

    if (cvData) {
        // Personal Info
        document.getElementById('preview-name').innerText = cvData.name;
        document.getElementById('preview-summary').innerText = cvData.summary;

        // Contact Info with Icons and Links
        const emailContainer = document.getElementById('preview-email-container');
        if (cvData.email) {
            emailContainer.innerHTML = `<i class="fas fa-envelope"></i> <a href="mailto:${cvData.email}">${cvData.email}</a>`;
        }

        const phoneContainer = document.getElementById('preview-phone-container');
        if (cvData.phone) {
            phoneContainer.innerHTML = `<i class="fas fa-phone-alt"></i> <a href="tel:${cvData.phone}">${cvData.phone}</a>`;
        }

        const locationContainer = document.getElementById('preview-location-container');
        if (cvData.location) {
            locationContainer.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${cvData.location}`;
        }

        // Profile Photo
        if (cvData.photo) {
            document.getElementById('profile-pic-preview').src = cvData.photo;
        }

        // Experience
        const expList = document.getElementById('preview-experience');
        expList.innerHTML = ''; // Clear existing
        cvData.experience.forEach(exp => {
            if (!exp.position) return; // Don't add empty entries
            const entry = document.createElement('div');
            entry.classList.add('exp-entry');
            entry.innerHTML = `
                <h3>${exp.position}</h3>
                <div class="sub-header">${exp.company} | ${exp.duration}</div>
                <p>${exp.description}</p>
            `;
            expList.appendChild(entry);
        });

        // Education
        const eduList = document.getElementById('preview-education');
        eduList.innerHTML = ''; // Clear existing
        cvData.education.forEach(edu => {
            if (!edu.degree) return; // Don't add empty entries
            const entry = document.createElement('div');
            entry.classList.add('edu-entry');
            entry.innerHTML = `
                <h3>${edu.degree}</h3>
                <div class="sub-header">${edu.institution} | ${edu.duration}</div>
            `;
            eduList.appendChild(entry);
        });

        // Skills & Languages
        populateTags('preview-skills', cvData.skills);
        populateTags('preview-languages', cvData.languages);

    } else {
        // No data, send back to form
        alert('No CV data found. Please fill out the form first.');
        window.location.href = 'index.html';
    }

    // --- Button Event Listeners ---
    document.getElementById('edit-cv').addEventListener('click', () => {
        window.location.href = 'index.html'; // Go back to edit
    });

    document.getElementById('download-pdf').addEventListener('click', generatePDF);
});

function populateTags(elementId, commaSeparatedString) {
    if (!commaSeparatedString) return;
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

    // Use html2canvas to capture the element as an image
    // This ensures exact layout preservation ("What You See Is What You Get")
    const canvas = await html2canvas(element, {
        scale: 2, // High resolution for quality
        useCORS: true,
        logging: false
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const doc = new jsPDF({
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
    });

    const pdfWidth = doc.internal.pageSize.getWidth(); // 210mm
    const pdfHeight = doc.internal.pageSize.getHeight(); // 297mm

    // Calculate dimensions to fit A4 width
    const imgProps = doc.getImageProperties(imgData);
    const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

    // Add image to PDF
    // If it fits on one page, just add it.
    if (imgHeight <= pdfHeight) {
        doc.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeight);
    } else {
        // If it overflows, splits across pages (simple slice)
        // Note: This prioritizes layout width fit over smart page breaks,
        // which solves the "Zoomed" issue.
        let heightLeft = imgHeight;
        let position = 0;

        doc.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position -= 297; // Move rendering position up by one page height
            doc.addPage();
            doc.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
        }
    }

    doc.save(fileName);
}

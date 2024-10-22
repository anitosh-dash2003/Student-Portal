const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Import fs to handle file system operations
const app = express();
const port = 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderName = req.body.folder; // Get folder name from the request body
        const dir = path.join(__dirname, 'uploads', folderName); // Create the full path

        // Create the folder if it doesn't exist
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir); // Use the folder path for file uploads
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Use the original filename
    }
});

const upload = multer({ storage: storage });

// File upload route for resume
app.post('/uploadResume', upload.single('resume'), (req, res) => {
    if (req.file) {
        res.json({ message: 'Resume uploaded successfully', file: req.file });
    } else {
        res.status(400).json({ message: 'File upload failed' });
    }
});

// File upload route for notes
app.post('/uploadNotes', upload.single('notes'), (req, res) => {
    if (req.file) {
        res.json({ message: 'Notes uploaded successfully', file: req.file });
    } else {
        res.status(400).json({ message: 'File upload failed' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.8.335/pdf.worker.min.js";

let pdfDoc = null,
    pageNum = 1,
    pageIsRendering = false,
    pageNumIsPending = null;

const scale = 2,
    canvas = document.querySelector('#pdf-render'),
    ctx = canvas.getContext('2d');

// The following function makes the screen size responsive but the text selection of the pdf is distorted therefore not included
// fitToContainer(canvas);

// Render the page
const renderPage = num => {
    pageIsRendering = true;

    // Get page
    pdfDoc.getPage(num).then(page => {
        // Set scale
        const viewport = page.getViewport({ scale });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderCtx = {
            canvasContext: ctx,
            viewport
        };

        page.render(renderCtx).promise.then(() => {
            pageIsRendering = false;

            if (pageNumIsPending !== null) {
                renderPage(pageNumIsPending);
                pageNumIsPending = null;
            }
        }).then(function() {
            // Returns a promise, on resolving it will return text contents of the page
            return page.getTextContent();
        }).then(function(textContent) {

            // Assign CSS to the textLayer element
            var textLayer = document.querySelector(".textLayer");

            textLayer.style.left = canvas.offsetLeft + 'px';
            textLayer.style.top = canvas.offsetTop + 'px';
            textLayer.style.height = canvas.offsetHeight + 'px';
            textLayer.style.width = canvas.offsetWidth + 'px';

            // Pass the data to the method for rendering of text over the pdf canvas.
            pdfjsLib.renderTextLayer({
                textContent: textContent,
                container: textLayer,
                viewport: viewport,
                textDivs: []
            });
        });

        // Output current page
        document.querySelector('#page-num').textContent = num;
    });
};

// Check for pages rendering
const queueRenderPage = num => {
    if (pageIsRendering) {
        pageNumIsPending = num;
    } else {
        renderPage(num);
    }
};

// Show Prev Page
const showPrevPage = () => {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    queueRenderPage(pageNum);
};

// Show Next Page
const showNextPage = () => {
    if (pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum);

}

// Load the canvas when pdf is selected
function loadCanvas() {
    // Get Document
    pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
            pdfDoc = pdfDoc_;

            document.querySelector('#page-count').textContent = pdfDoc.numPages;

            renderPage(pageNum);
        })
        .catch(err => {
            // Display error
            const div = document.createElement('div');
            div.className = 'error';
            div.appendChild(document.createTextNode(err.message));
            document.querySelector('body').insertBefore(div, canvas);
            // Remove top bar
            document.querySelector('.pagination').style.display = 'none';
        });
}

// Previous/Next Button Events
document.querySelector('#prev-page').addEventListener('click', showPrevPage);
document.querySelector('#next-page').addEventListener('click', showNextPage);

// Set file path for the selected pdf
function setURL(index) {
    path = '../static/pdfs/'
    url = path.concat(index);
    pageNum = 1; // set to first page
    loadCanvas(); // load the canvas
}

// When the user clicks on the dropdown button,                                                                                                                                                                           toggle between hiding and showing the dropdown content */
function clickDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Load the first file into the canvas on window load
$("document").ready(function() {
    if (initial_file != null) {
        setURL(initial_file)
    }
});

// Fit canvas to screen size
function fitToContainer(canvas) {
    // Make it visually fill the positioned parent
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    // ...then set the internal size to match
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
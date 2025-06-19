let heighestZ = 1;

class Paper {
    holdingPaper = false;

    prevMouseX = 0;
    prevMouseY = 0;

    mouseX = 0;
    mouseY = 0;

    velocityX = 0;
    velocityY = 0;

    currentPaperX = 0;
    currentPaperY = 0;

    constructor() {}

    init(paperElement) {
        const startDrag = (x, y) => {
            this.holdingPaper = true;
            paperElement.style.zIndex = heighestZ++;
            this.prevMouseX = x;
            this.prevMouseY = y;
        };

        const onDrag = (x, y) => {
            if (!this.holdingPaper) return;

            this.mouseX = x;
            this.mouseY = y;

            this.velocityX = this.mouseX - this.prevMouseX;
            this.velocityY = this.mouseY - this.prevMouseY;

            this.currentPaperX += this.velocityX;
            this.currentPaperY += this.velocityY;

            this.prevMouseX = this.mouseX;
            this.prevMouseY = this.mouseY;

            paperElement.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;
        };

        const stopDrag = () => {
            this.holdingPaper = false;
        };

        // Mouse Events
        paperElement.addEventListener('mousedown', (e) => {
            if (e.button === 0) startDrag(e.clientX, e.clientY);
        });

        document.addEventListener('mousemove', (e) => {
            onDrag(e.clientX, e.clientY);
        });

        window.addEventListener('mouseup', stopDrag);

        // Touch Events
        paperElement.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            e.preventDefault(); // prevent scroll
            startDrag(touch.clientX, touch.clientY);
        }, { passive: false });

        document.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            e.preventDefault(); // prevent scroll
            onDrag(touch.clientX, touch.clientY);
        }, { passive: false });

        window.addEventListener('touchend', stopDrag);
    }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paperElement => {
    const paperInstance = new Paper();
    paperInstance.init(paperElement);
});
